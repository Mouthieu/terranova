from django.shortcuts import render
from rest_framework import viewsets
from .serializers import CollectionPointSerializer, SubscriptionSerializer

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
# @permission_classes([IsAuthenticated]) 
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
# @permission_classes([IsAuthenticated]) 
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

User = get_user_model()

@api_view(['POST'])
def add_collection_point(request):
    try:
        data = request.data
        # Récupérer l'utilisateur à partir de l'ID
        owner_id = data.get('owner')
        owner = User.objects.get(id=owner_id) if owner_id else None

        collection_point = CollectionPoint.objects.create(
            address=data.get('address'),
            latitude=data.get('latitude'),
            longitude=data.get('longitude'),
            public=data.get('public', False),
            capacity=data.get('capacity', 0),
            horaires=data.get('horaires'),
            photo=data.get('photo'),
            owner=owner  # Utiliser l'objet User récupéré
        )
        serializer = CollectionPointSerializer(collection_point)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except User.DoesNotExist:
        return Response({
            'status': 'error',
            'message': 'Utilisateur non trouvé'
        }, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({
            'status': 'error',
            'message': str(e)
        }, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['DELETE'])
def delete_collection_point(request, collection_point_id):
    collection_point = CollectionPoint.objects.get(id=collection_point_id)
    collection_point.delete()
    return Response({'message': 'Collection point deleted successfully'}, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_collection_points_owner(request, owner_id):
    try:
        collection_points = CollectionPoint.objects.filter(owner=owner_id)
        serializer = CollectionPointSerializer(collection_points, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({
            'status': 'error',
            'message': str(e)
        }, status=status.HTTP_400_BAD_REQUEST)

class SubscriptionViewSet(viewsets.ModelViewSet):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer