# Generated by Django 5.1.6 on 2025-02-22 00:39

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Subscription',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subscribet_at', models.DateTimeField(auto_now_add=True)),
                ('collection_point', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='subscriptions', to='core.collectionpoint')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='subscriptions', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('user', 'collection_point')},
            },
        ),
    ]
