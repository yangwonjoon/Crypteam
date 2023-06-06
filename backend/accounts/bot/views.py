from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import status
import sys,os
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))))
from ML.DataScaler import Data_StandardScaler
from ML.DB_Manage import DB_Bot
from ML.Indicator import DataManage
from ML.Network import ensembleModel
from ML.DataLabeling import DataLabeling
from ML.createImage import LabelingImg
from ML.backtest import backtest
from ML.monitor import start_bot
from ML.AutoTrading import Trading
from ML.Simulated_Investment import Simulated_Start
import pandas as pd
class BacktestingView(APIView):
    def post(self, request):
        coin_name = request.data.get('coin_name')
        parameter = request.data.get('parameter')
        term = int(request.data.get('term'))
        test_size = int(request.data.get('test_size'))
    
        return Response(start_bot(coin_name, parameter, term, test_size))
    
class AutoTradingView(APIView):

    def get(self,request):
        data = pd.read_csv("/Users/yuhyeonseog/졸작 연구/git/Crypteam-4/backend/accounts/trading_data.csv", index_col = 0)
        print("GET")
        return Response({
        "time" : data.iloc[-1]["time"],
        "price" : data.iloc[-1]['price'],
        "amount" : data.iloc[-1]['amount'], 
        "average_price" :data.iloc[-1]['average_price'],
        "ROE" : data.iloc[-1]['ROE'],
        "pred" : data.iloc[-1]['pred'],
        "yeild" : data.iloc[-1]['yeild']
        })

    def post(self, request):
        api_key = request.data.get('api_key')
        secret = request.data.get('secret')
        symbol = request.data.get('symbol')
        leverage = int(request.data.get('leverage'))
        return Response(Trading(api_key, secret, symbol, leverage))
    
class SimulateTradingView(APIView):
    def post(self, request):
        symbol = request.data.get('symbol')
    
        return Response(Simulated_Start(symbol))