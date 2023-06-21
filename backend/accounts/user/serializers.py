from .models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        user = User.objects.create_user(
            email = validated_data['email'],
            password = validated_data['password'],
            user_name= validated_data['user_name'],
            birth= validated_data['birth'],
            phone_number= validated_data['phone_number'],
            api_key= validated_data['api_key'],
            sec_key= validated_data['sec_key'],
        )
        return user