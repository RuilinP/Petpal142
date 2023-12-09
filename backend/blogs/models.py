from django.db import models
from accounts.models import Shelter

class Blog(models.Model):
    author = models.ForeignKey(Shelter, on_delete=models.CASCADE)
    title = models.TextField()
    body = models.TextField()
    image = models.ImageField(upload_to='blog-images/')
