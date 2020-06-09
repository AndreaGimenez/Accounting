from django.db import models
from django.conf import settings
from django.utils import timezone

# Create your models here.

class Transaction(models.Model):
    amount = models.FloatField(default=0)
    date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(self.amount)
