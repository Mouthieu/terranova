from rest_framework import serializers
from .models import User
from core.serializers import CollectionPointSerializer

class UserSerializer(serializers.ModelSerializer):
    owned_composters = CollectionPointSerializer(many=True, read_only=True)
    subscribed_composters = CollectionPointSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email',
            'created_at',
            'last_login',
            'first_name',
            'last_name',
            'phone_number',
            'address',
            'owned_composters',
            'subscribed_composters',
            'quiz_score'
        )
        read_only_fields = ('created_at', 'last_login')

class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'first_name', 'last_name', 'phone_number', 'address', 'quiz_score', 'owned_composters', 'subscribed_composters')

    def create(self, validated_data):
        user = User.objects.create_user(
            username     = validated_data['username'],
            email        = validated_data.get('email', ''),
            password     = validated_data['password'],
            first_name   = validated_data.get('first_name', ''),
            last_name    = validated_data.get('last_name', ''),
            phone_number = validated_data.get('phone_number', ''),
            address      = validated_data.get('address', ''),
            quiz_score   = validated_data.get('quiz_score', 0),
            owned_composters = validated_data.get('owned_composters', []),
            subscribed_composters = validated_data.get('subscribed_composters', []),
        )
        return user 