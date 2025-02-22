from django.shortcuts import render
from rest_framework import viewsets
from .models import CollectionPoint
from .serializers import CollectionPointSerializer

# Create your views here.
class CollectionPointViewSet(viewsets.ModelViewSet):
    queryset = CollectionPoint.objects.all()
    serializer_class = CollectionPointSerializer
