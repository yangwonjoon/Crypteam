from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
import json
# Create your views here.
import pymysql
import pandas as pd
class NewsAPIView(APIView):
    def get(self, request):
        # print("test")
        # b = BitCoin.objects.all()
        # serializer1 = BitCoinSerializer(b, many = True)
        # e = Ethereum.objects.all()
        # serializer2 = EthereumSerializer(e, many = True)
        # ec = EthereumClassic.objects.all()
        # serializer3 = EthereumClassicSerializer(ec, many = True)
        # x = XRP.objects.all()
        # serializer4 = XRPSerializer(x, many = True)
        # c = CardanoADA.objects.all()
        # serializer5 = CardanoADASerializer(c, many = True)

        # news_data = {
        #     "bitcoinNews": serializer1.data,
        #     "ethereumNews": serializer2.data,
        #     "ethereumclasicsNews": serializer3.data,
        #     "xrpNews": serializer4.data,
        #     "cardanoadaNews": serializer5.data
        # }
        # print(serializer1.data)
        con = pymysql.connect(host='127.0.0.1', user='root', password='825582qaz',
                        db='NewsData', charset='utf8') # 한글처리 (charset = 'utf8')
        cur = con.cursor()
        name = ["bitcoin", "cardanoada", "ethereum", "cardanoada"]
        df = pd.DataFrame()
        for i in name:
            sql =  "SELECT * FROM NewsData.NewsData_"+i+";"
            cur.execute(sql) # sql문  실행
            db_name_list = cur.fetchall()
            df = pd.concat([df, pd.DataFrame(db_name_list)])
        df = df.reset_index(drop=True)
        df.columns = ["id", "coin_name", "title", "url", "time"]
        json_ob = df.to_json(orient='records', force_ascii=False)
        return JsonResponse(json_ob, safe=False)



# @api_view(['GET'])
# def NewsList(request):
#     news = NewsData.objects.all()

#     serializer = NewsSerialrizer(news, many = True)

#     return Response(serializer.data)