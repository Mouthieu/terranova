from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'created_at', 'last_login', 'first_name', 'last_name', 'phone_number', 'address')
        read_only_fields = ('created_at', 'last_login')

class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'first_name', 'last_name', 'phone_number', 'address')

    def create(self, validated_data):
        user = User.objects.create_user(
            username     = validated_data['username'],
            email        = validated_data.get('email', ''),
            password     = validated_data['password'],
            first_name   = validated_data.get('first_name', ''),
            last_name    = validated_data.get('last_name', ''),
            phone_number = validated_data.get('phone_number', ''),
            address      = validated_data.get('address', ''),
        )
        return user 