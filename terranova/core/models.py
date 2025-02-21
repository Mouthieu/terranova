from django.db import models

# Create your models here.
class CollectionPoint(models.Model):
    name = models.CharField(max_length=255)
    adress = models.TextField()
    latitude = models.FloatField()
    longitude = models.FloatField()

    def __str__(self):
        return {
            'name': self.name,
            'adress': self.adress,
            'latitude': self.latitude,
            'longitude': self.longitude
        }