from rest_framework import serializers
from .models import UserInfo

# user_id, password, re_password, user_name, birth, email, phone_number, api_key, sec_key, date
class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = ['user_id', 'password', 're_password','user_name', 'birth', 'email', 'phone_number', 'api_key', 'sec_key', 'date']