from django.shortcuts import render
from .serializers import *
from rest_framework.decorators import api_view  
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import status
class DataView(APIView):
    def post(self, request):
        # request.data로 데이터 수신
        serializer = UserInfoSerializer(data = request.data)
        token = TokenObtainPairSerializer.get_token(serializer)
        refresh_token = str(token)
        print(refresh_token)
        if serializer.is_valid():
            print("is_vaild..")
            print(serializer.save())
            access_token = str(token.access_token)
            print(access_token)
            res = Response(
                {
                    "user": serializer.data,
                    "message": "register successs",
                    "token": {
                        "access": access_token,
                        "refresh": refresh_token,
                    },
                },
                status=status.HTTP_200_OK,
            )

            res.set_cookie("access", access_token, httponly=True)
            res.set_cookie("refresh", refresh_token, httponly=True)

            return res
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # user_id = request.data.get('user_id')
        # password = request.data.get('password')
        # re_password = request.data.get('re_password')
        # user_name = request.data.get('user_name')
        # birth = request.data.get('birth')
        # email = request.data.get('email')
        # phone_number = request.data.get('phone_number')
        # api_key = request.data.get('api_key')
        # sec_key = request.data.get('sec_key')
        # date = request.data.get('date')

        return Response({"status": "ok"})

# @api_view(['POST'])        # @api_view는 데이터가 오고 갈 때만 쓰인다.
# def UserInfo(request):     # GET 요청은 페이지를 연결(render 사용)
#     print(request.data)
#     serializer = UserInfoSerializer(data = request.data)
#     if serializer.is_valid():
#         print("is_vaild..")
#         print(serializer.save())
#     else:
#         print("error")
#     print(serializer.data)
#     return Response(serializer.data)

# def login(request):
#     return render(request, 'register.html')