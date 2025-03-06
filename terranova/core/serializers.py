from rest_framework import serializers
from .models import CollectionPoint, Subscription

class CollectionPointSerializer(serializers.ModelSerializer):
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
            'photo',
            'created_at',
            'updated_at'
            ]

class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = '__all__'