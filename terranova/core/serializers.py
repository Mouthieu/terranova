from rest_framework import serializers
from .models import CollectionPoint, Subscription
from users.models import User

class BasicUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'phone_number', 'quiz_score']

class CollectionPointSerializer(serializers.ModelSerializer):
    subscribers = BasicUserSerializer(many=True, read_only=True)
    owner = BasicUserSerializer(read_only=True)

    class Meta:
        model = CollectionPoint
        fields = [
            'id',
            'address',
            'latitude',
            'longitude',
            'public',
            'capacity',
            'horaires',
            'owner',
            'subscribers',
            'photo',
            'created_at',
            'updated_at'
        ]

class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = '__all__'