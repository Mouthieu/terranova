from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    username     = models.CharField(max_length=255, unique=True)
    first_name   = models.CharField(max_length=255, blank=True)
    last_name    = models.CharField(max_length=255, blank=True)
    email        = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, blank=True)
    address      = models.TextField(blank=True)
    created_at   = models.DateTimeField(auto_now_add=True)
    updated_at   = models.DateTimeField(auto_now=True)

    def __str__(self):
        return {
            'username': self.username,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'phone_number': self.phone_number,
            'address': self.address,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
