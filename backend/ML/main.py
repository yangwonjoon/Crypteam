from monitor import start_bot
if __name__ == '__main__':
    parameter = [
            {"rsi" : {"period" : 14}}, {"ma" : {"period" : 7}}, {"ma" : {"period" : 25}}, {"ema" :{"period" : 7}}, {"ema" :{"period" : 25}}, {"stochastic" : {"n" : 14,"m" : 5,"t" : 5}},
            {"bb" : {"length" : 21,"std" : 2}},
            {"kdj" : {}},
            {"macd" : {"fast_period": 12, "slow_period" : 26}}
    ]
    start_bot("ETH_USDT_15m", parameter, 60, 96 * 180, "ML_Result")
