import time
import ccxt
import numpy as np
from Indicator import DataManage
from DataScaler import Data_StandardScaler
from sklearn.preprocessing import StandardScaler
from DB_Manage import DB_Bot
import pandas as pd
from keras.models import load_model

def download_data(frame):
  binance = ccxt.binance()
  btc_ohlcv = binance.fetch_ohlcv("BTC/USDT",limit = 500,timeframe=frame)
  df = pd.DataFrame(btc_ohlcv, columns=['datetime', 'open', 'high', 'low', 'close', 'volume'])
  df['datetime'] = pd.to_datetime(df['datetime'], unit='ms')
  df.set_index('datetime', inplace=True)
  return df

def buy(Account,price):
  Account["average_price"] = ( ( Account["amount"] * Account["average_price"] ) + ( price * 0.01 ) ) / ( Account["amount"] + 0.01 )
  Account["amount"] += 0.01
  return Account

def sell(Account,price):
  Account["result"] += (price - Account["average_price"]) * Account["amount"]
  Account["amount"] = 0
  Account["average_price"] = 0
  return Account

def bot(symbol,name, timeframe, model, trade_history):
  Account = {
    "result" : 0,
    "amount" : 0,
    "average_price" : 0
  }
  previous_time = '2018-01-01 00:00:00'
  previous_state = -1
  parameter = [
            {"rsi" : {"period" : 14}},
            {"ma" : {"period" : 7}},
            {"ma" : {"period" : 25}},
            {"ema" :{"period" : 7}},
            {"ema" :{"period" : 25}},
            {"stochastic" : {"n" : 14,"m" : 5,"t" : 5}},
            {"bb" : {"length" : 21,"std" : 2}},
            {"kdj" : {}},
            {"macd" : {"fast_period": 12, "slow_period" : 26}}
  ]

  print("-----모의매매 준비중-----")

  print(">> 데이터를 준비하는 중...")
  data = DB_Bot(symbol).GetData()
  data = data.drop(["datetime"],axis = 1).dropna()
  print(">> 보조지표 생성중...")
  DataManageBot = DataManage(data, parameter = parameter)
  data = DataManageBot.get_data()
  print(">> 데이터를 정규화하는 중...")
  scaler = StandardScaler()
  scaler.fit(data)
  
  print("-----모의매매 시작!-----")
  while(True):
    data = download_data(timeframe)
    DataManageBot = DataManage(data, parameter = parameter)
    data = DataManageBot.get_data()


    x = data.iloc[-2:]
    x = scaler.transform(x)
    pred = model.predict(x)

    now_time = data.index[-1]
    now_state = pred[-1]

    # 이전과 시간이 다르므로 조건 만족시 구매 
    if now_time != previous_time and int(pred[-2][0]) == 1:
      Account = buy(Account,data.iloc[-1]['open'])
      previous_time = now_time
      previous_state = now_state

    elif now_time != previous_time and int(pred[-2][0]) == 0 and Account["amount"] >= 0.01:
      Account = sell(Account,data.iloc[-1]['open'])

    elif now_time != previous_time:
      previous_time = now_time
      previous_state = now_state

    print("==============================================")
    print("현재 time:",now_time)
    print("현재 가격:",data.iloc[-1]['close'])
    print("현재 수량:",Account["amount"])
    print("현재 평단가:",Account["average_price"])
    print("현재 수익률:",round((data.iloc[-1]['close'] - Account["average_price"])/data.iloc[-1]['close'] * 100,2),"%")
    print("현재 추세 예측(1이면 다음 시가에 사야하고 0이면 팔아야함):",int(pred[-2][0]))
    print("수익:",Account["result"])
    
    line = []
    line.append(now_time)
    line.append(now_state)
    line.append(Account["result"])
    line.append(round((data.iloc[-1]['close'] - Account["average_price"])/data.iloc[-1]['close'] * 100,2))
    trade_history.append(line)
    time.sleep(5)


def Trading(symbol):
    '''
        symbol = "ETC_USDT_1m"
    '''
    model = load_model("DNN_Model.h5")
    trade_history = []


    temp = symbol.split('_')
    timeframe = temp[2]
    name = temp[0] + "/" + temp[1]

    bot(symbol,name, timeframe, model, trade_history)