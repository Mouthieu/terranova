from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    id           = models.AutoField(primary_key=True)
    username     = models.CharField(max_length=255, unique=True)
    phone_number = models.CharField(max_length=15, blank=True, default="...")
    email        = models.EmailField(unique=True, default="...")
    address      = models.TextField(blank=True, default="...")
    quiz_score   = models.IntegerField(default=0)
    password     = models.CharField(max_length=255)
    first_name   = models.CharField(max_length=255, blank=True)
    last_name    = models.CharField(max_length=255, default="...")
    created_at   = models.DateTimeField(auto_now_add=True)
    updated_at   = models.DateTimeField(auto_now=True)

    def __str__(self):
        return {
            'id': self.id,
            'username': self.username,
            'phone_number': self.phone_number,
            'email': self.email,
            'address': self.address,
            'quiz_score': self.quiz_score,
            'password': self.password,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
