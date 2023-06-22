import time
import ccxt
import numpy as np
from ML.Indicator import DataManage
from ML.DataScaler import Data_StandardScaler
from sklearn.preprocessing import StandardScaler
from ML.DB_Manage import DB_Bot
import pandas as pd
from keras.models import load_model
from ML.DATA_INDICATORS import *
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

def bot(binance, symbol,name, timeframe, model, trade_history):
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

  print("-----자동매매 준비중-----")

  print(">> 데이터를 준비하는 중...")
  data = DB_Bot(symbol,"2023-01-01 00:00:00").GetData()
  temp1 = str(data.iloc[-1]["datetime"])
  # print(">> 보조지표 생성중...")
  # # DataManageBot = DataManage(data, parameter = parameter)
  # # data = DataManageBot.get_data()
  # data = add_rsi(data)
  # data = add_ma(data,period=7)
  # data = add_ema(data,period=7)
  # data = add_ma(data,period=25)
  # data = add_ema(data,period=25)
  # data = add_ma(data,period=99)
  # data = add_ema(data,period=99)
  # data = add_stochastic(data)
  # data = add_bb(data,length=21)
  # data = add_disparity(data,period=25)
  # data = add_macd(data)
  # data = add_kdj(data)
  # data = data.dropna()
  # print(">> 데이터를 정규화하는 중...")
  # # scaler = StandardScaler()
  # # scaler.fit(data)
  
  print("-----자동매매 시작!-----")
  while(True):
    data = download_data(timeframe)
    data = add_rsi(data)
    data = add_ma(data,period=7)
    data = add_ema(data,period=7)
    data = add_ma(data,period=25)
    data = add_ema(data,period=25)
    data = add_ma(data,period=99)
    data = add_ema(data,period=99)
    data = add_stochastic(data)
    data = add_bb(data,length=21)
    data = add_disparity(data,period=25)
    data = add_macd(data)
    data = add_kdj(data)
    data = data.dropna()


    x = data.iloc[-2:]
    # x = scaler.transform(x)
    pred = model.predict(x)
    action = 0
    if pred[-2][0] < 0.2:
      practioned = 0
    elif pred[-2][0] > 0.8:
      action = 1
    else:
      action = -1
    now_time = data.index[-1]
    now_state = pred[-1]

    # 이전과 시간이 다르므로 조건 만족시 구매 
    if now_time != previous_time and action == 1:
      order = binance.create_market_buy_order(
      symbol=name,
      amount=0.01)
      Account = buy(Account,data.iloc[-1]['open'])
      previous_time = now_time
      previous_state = now_state

    elif now_time != previous_time and action == 0 and Account["amount"] >= 0.01:
      order = binance.create_market_sell_order(
      symbol=name,
      amount=Account["amount"])
      print("sell")
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
    print("현재 추세 예측(1이면 다음 시가에 사야하고 0이면 팔아야함):",action)
    print("수익:",Account["result"])
    
    line = []
    line.append(now_time)
    line.append(now_state)
    line.append(Account["result"])
    line.append(round((data.iloc[-1]['close'] - Account["average_price"])/data.iloc[-1]['close'] * 100,2))
    trade_history.append(line)
    time.sleep(0.5)
    temp = [[now_time, data.iloc[-1]['close'], Account["amount"], Account['average_price'], round((data.iloc[-1]['close'] - Account["average_price"])/data.iloc[-1]['close'] * 100,2), action, Account["result"], temp1 ,data.iloc[-1]["open"], data.iloc[-1]["high"], data.iloc[-1]["low"], data.iloc[-1]["close"]]]
    pd.DataFrame(temp, columns=["time", "price", "amount", "average_price", "ROE", "pred", "yeild","time2","open","high","low","close"]).to_csv("trading_data.csv")
def Trading(api_key, secret, symbol, leverage):
    '''
        api_key = "yqrURCKivzwjsTyzxs16JIotlcVVUbHKq71uQQcqIYACzeMwU65BY3HDgqnB2ijL"
        secret  = "gyfUDaf559JJA8qmqQE8ZK3pOUd7vad26ZUEYOalpUVy5ScBBWnJOFNZSkyeUMjF"
        symbol = "ETC_USDT_1m"
        leverage = 10
    '''
    model = load_model("/Users/yuhyeonseog/졸작 연구/git/Crypteam-4/backend/accounts/dnn_BTC_USTD_1m.h5")
    trade_history = []

    binance = ccxt.binance(config={
        'apiKey': api_key, 
        'secret': secret,
        'enableRateLimit': True,
        'options': {
            'defaultType': 'future'
        }
    })
    temp = symbol.split('_')
    timeframe = temp[2]
    name = temp[0] + "/" + temp[1]
    # 레버리지 변경
    markets = binance.load_markets()
    market = binance.market(name)
    resp = binance.fapiPrivate_post_leverage({
        'symbol': market['id'],
        'leverage': leverage
    })
    return bot(binance, symbol,name, timeframe, model, trade_history)