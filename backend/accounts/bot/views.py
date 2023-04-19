from django.shortcuts import render
from rest_framework.decorators import api_view  
from rest_framework.response import Response
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

class StartView(APIView):
    def post(self, request):
        coin_name = request.data.get('coin_name')
        parameter = request.data.get('parameter')
        term = request.data.get('term')
        test_size = request.data.get('test_size')
    
        return Response(start_bot(coin_name, parameter, term, test_size))
    