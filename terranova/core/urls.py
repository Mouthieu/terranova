from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CollectionPointViewSet
from . import views

router = DefaultRouter()
router.register(r'collection-points', CollectionPointViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('subscribe/<int:collection_point_id>/', views.subscribe),
    path('unsubscribe/<int:collection_point_id>/', views.unsubscribe),
    path('add-collection-point/', views.add_collection_point),
]