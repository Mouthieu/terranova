from django.shortcuts import render
from rest_framework import viewsets
from .serializers import CollectionPointSerializer

from .models import CollectionPoint, Subscription

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model

# Create your views here.
class CollectionPointViewSet(viewsets.ModelViewSet):
    queryset = CollectionPoint.objects.all()
    serializer_class = CollectionPointSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated]) 
def subscribe(request, collection_point_id):
    user = request.user
    collection_point = CollectionPoint.objects.get(id=collection_point_id)

    # Vérifier si l'utilisateur est déjà abonné à ce point de collecte
    if Subscription.objects.filter(user=user, collection_point=collection_point).exists():
        return Response({'error': 'You are already subscribed to this collection point'}, status=status.HTTP_400_BAD_REQUEST)

    # Créer l'abonnement
    Subscription.objects.create(user=user, collection_point=collection_point)
    return Response({'message': 'You have successfully subscribed to this collection point'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([IsAuthenticated]) 
def unsubscribe(request, collection_point_id):
    user = request.user
    collection_point = CollectionPoint.objects.get(id=collection_point_id)

    # Vérifier si l'utilisateur est abonné à ce point de collecte
    subscription = Subscription.objects.filter(user=user, collection_point=collection_point)
    if not subscription:
        return Response({'error': 'You are not subscribed to this collection point'}, status=status.HTTP_400_BAD_REQUEST)

    # Supprimer l'abonnement
    subscription.delete()
    return Response({'message': 'You have successfully unsubscribed from this collection point'}, status=status.HTTP_200_OK)