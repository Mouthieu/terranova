from django.db import models
from django.conf import settings
# from .collection_point import CollectionPoint

# Create your models here.
class CollectionPoint(models.Model):
    address = models.TextField()
    latitude = models.FloatField()
    longitude = models.FloatField()
    public = models.BooleanField(default=False)
    capacity = models.IntegerField(default=0)
    horaires = models.CharField(max_length=100, blank=True, null=True)
    photo = models.ImageField(upload_to='collection_points/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return {
            'address': self.address,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'public': self.public,
            'capacity': self.capacity,
            'horaires': self.horaires,
            'photo': self.photo
        }

class Subscription(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='subscriptions')
    collection_point = models.ForeignKey(CollectionPoint, on_delete=models.CASCADE, related_name='subscriptions')
    subscribet_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'collection_point')

    def __str__(self):
        return {
            'user': self.user,
            'collection_point': self.collection_point,
            'subscribet_at': self.subscribet_at
        }