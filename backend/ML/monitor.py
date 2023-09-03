import pandas as pd
import pandas_ta as pta
import numpy as np
from ML.DataScaler import Data_StandardScaler
from ML.DB_Manage import DB_Bot
from ML.Indicator import DataManage
from ML.Network import ensembleModel
from ML.DataLabeling import DataLabeling
from ML.createImage import LabelingImg
from ML.backtest import backtest
from ML.DATA_INDICATORS import *
import json
from keras.models import load_model
def dic_to_list(dic):
    parameter = []
    for i in dic.keys():
        temp = {i:{"period" : int(dic[i]) }}
        parameter.append(temp)
    
    return parameter
def start_bot(coin_name, parameter,term, test_size):
    parameter = dic_to_list(parameter)
    """
    함수실행은 웹페이지에서 백테스트 시작 버튼누르면 함수 실행
    -> 결과 출력
    form = {
        
    }

    BTC(코인이름 입력) + '_USDT' + 1m(시간봉 입력)
    coin_name : ex) BTC_USDT_1m
    -> BTC : Coin 축약어, USTD : 고정, 1m : timeframe(1m, 3m, 5m, 15m, ...1d)

    parameter ex)
    ```python

    보조지표 선택할 수 있게 체크박스 식으로 체크할수 있게 입력받아야한다.
    보조지표 입력받으면 해당 보조지표마다 파라미터(ex period)추가 입력받을 수 있게 입력창
    일단 밑에 5개만 테스트
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
    ```

    숫자  입력 받으면 됨
    term(int) ex)
    -> 120

    숫자 입력 받으면 됨
    test_size(int) ex)
    -> 1440 * 30 (30days)

    """

    # get data
    print(">> DB에서 데이터를 불러오는중...")
    data = DB_Bot(coin_name).GetData()

    # add Indicator
    print(">> Data에 보조지표를 생성하는중...")
    # parameter = [
    #     {"rsi" : {"period" : 14}},
    #     {"ma" : {"period" : 7}},
    #     {"ema" :{"period" : 7}},
    #     {"ma" : {"period" : 25}},
    #     {"ema" :{"period" : 25}},
    #     {"ma" : {"period" : 99}},
    #     {"ema" :{"period" : 99}},
    #     {"stochastic" : {"n" : 14,"m" : 5,"t" : 5}},
    #     {"bb" : {"length" : 21,"std" : 2}},
    #     # {"macd" : {"fast_period": 12, "slow_period" : 26}}
    # ]
    # data = add_disparity(data,25)
    # data = add_macd(data)
    # data = add_kdj(data)
    # DataManageBot = DataManage(data, parameter = parameter)
    # data = DataManageBot.get_data()
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
    # Data Labeling -> add label col
    print(">> DataLabeling...")
    # Labeler = DataLabeling(data, term, "close")
    # Labeler.run()
    # data = Labeler.data
    # data.to_csv("labeled_data_"+coin_name+".csv")
    # Labeling Data 시각화
    # print(">> LabelingImg 생성중...")
    # Imaging_data = pd.concat([data.iloc[-test_size:].reset_index(), pd.DataFrame(model.result_label,columns=["result_label"])],axis=1)
    # LabelingImg(Imaging_data, ImgPath)

    # data split & data scaling
    X,Y = data.drop(['datetime'],axis = 1).to_numpy(),data.close.to_numpy()
    print(">> Datascaling & data split...")
    # X,Y = data.drop(['label','datetime'],axis = 1),data['label']

    # X = Data_StandardScaler(X)
    temp = data.set_index("datetime")
    temp["id"] = data.index
    test_size = int(temp.loc[test_size + " 00:00:00"]["id"])
    x_train = X[:test_size]
    y_train = Y[:test_size]
    x_test = X[test_size:]
    y_test = Y[test_size:]

    # # model train
    print(">> model train & evaluation...")
    # model = ensembleModel(20,x_train.shape[1])
    
    # model.models_fit(x_train,y_train)
    DNN = load_model("/Users/yuhyeonseog/졸작 연구/git/Crypteam-4/backend/accounts/dnn_BTC_USTD_1m.h5")
    pred = DNN.predict(x_test)
    result_label = []
    print(pd.DataFrame(pred).describe())
    for i in range(len(pred)):
        if pred[i] > 0.8:
            result_label.append(1)
        elif pred[i] < 0.2:
            result_label.append(0)
        else:
            result_label.append(-1)
    # model_eval = model.predict_and_evaluation(x_test,y_test,threshold=0.2)
    
    # backtesting
    print(">> stratagy backtesting...")
    print(pd.DataFrame(result_label).value_counts())
    backtestBot = backtest(data, result_label, (len(X) - test_size), 0.002, 0.0008, 1000000)
    backtest_result = backtestBot.basicStrategy()

    # backtest 출력 예시

    """
        {'averageNumberSales': 307.4216216216216,
        'totalYield': -0.042004160617161335,
        'win_rate': 0.0,
        'MDD': -1.0,
        'max_buying': 594,
        'NumberTrading': 370}
    """
    # for i in backtest_result:
    #     print(i,":",round(backtest_result[i],2))

    # model.DNNModel.model.save("_Model.h5")
    # DNN.save("standard_model.h5")
    return json.dumps(backtest_result)