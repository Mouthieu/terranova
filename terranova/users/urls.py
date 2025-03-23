from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, login, get_user_info

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', login, name='login'),
    path('get_user_info/<int:user_id>/', get_user_info, name='get_user_info'),
]