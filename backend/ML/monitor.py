import pandas as pd
# from DataScaler import Data_StandardScaler
# from DB_Manage import DB_Bot
# from Indicator import DataManage
# from Network import ensembleModel
# from DataLabeling import DataLabeling
# from createImage import LabelingImg
# from backtest import backtest
import json
def start_bot(coin_name, parameter,term, test_size, ImgPath = "ML_Result"):
    
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

    이거는 신경 안써도됨
    ImgPath(str) ex)
    -> "ML_Result"
    """

    # get data
    print(">> DB에서 데이터를 불러오는중...")
    data = DB_Bot(coin_name).GetData()

    # add Indicator
    print(">> Data에 보조지표를 생성하는중...")
    DataManageBot = DataManage(data, parameter = parameter)
    data = DataManageBot.get_data()

    # Data Labeling -> add label col
    print(">> DataLabeling...")
    Labeler = DataLabeling(data, term, "close")
    Labeler.run()
    data = Labeler.data

    # Labeling Data 시각화
    # print(">> LabelingImg 생성중...")
    # Imaging_data = pd.concat([data.iloc[-test_size:].reset_index(), pd.DataFrame(model.result_label,columns=["result_label"])],axis=1)
    # LabelingImg(Imaging_data, ImgPath)

    # data split & data scaling
    print(">> Datascaling & data split...")
    X,Y = data.drop(['label','datetime'],axis = 1),data['label']
    X = Data_StandardScaler(X)

    x_train = X[:-test_size]
    y_train = Y[:-test_size]
    x_test = X[-test_size:]
    y_test = Y[-test_size:]

    # model train
    print(">> model train & evaluation...")
    model = ensembleModel(20,x_train.shape[1])
    model.models_fit(x_train,y_train)
    model_eval = model.predict_and_evaluation(x_test,y_test,threshold=0.2)

    # backtesting
    print(">> stratagy backtesting...")
    backtestBot = backtest(data, model.result_label, test_size, 0.002, 0.0008, 100000)
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
    for i in backtest_result:
        print(i,":",round(backtest_result[i],2))

    return json.dumps(backtest_result)