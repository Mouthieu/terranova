from django.db import models
from django.conf import settings
# from .collection_point import CollectionPoint

# Create your models here.
class CollectionPoint(models.Model):
    name = models.CharField(max_length=255)
    address = models.TextField()
    latitude = models.FloatField()
    longitude = models.FloatField()
    subscribable = models.BooleanField(default=False)

    def __str__(self):
        return {
            'name': self.name,
            'address': self.address,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'subscribable': self.subscribable
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