from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from .models import User
from .serializers import UserSerializer, UserCreateSerializer
from core.models import CollectionPoint
from core.serializers import CollectionPointSerializer

# Create your views here.

@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    user = authenticate(username=username, password=password)
    
    if user:
        serializer = UserSerializer(user)
        return Response({
            'message': 'Connexion réussie',
            'user': serializer.data
        })
    else:
        return Response({
            'message': 'Identifiants invalides'
        }, status=status.HTTP_401_UNAUTHORIZED)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def get_serializer_class(self):
        if self.action == 'create':
            return UserCreateSerializer
        return UserSerializer

    @action(detail=False, methods=['get'])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

@api_view(['GET'])
def get_composters(request):
    composters = CollectionPoint.objects.filter(owner=request.user)
    serializer = CollectionPointSerializer(composters, many=True)
    return Response(serializer.data)