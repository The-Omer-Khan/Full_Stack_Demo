from django.db import models

# Create your models here.
class Teacher(models.Model):
    name=models.CharField(max_length=80)
    age= models.IntegerField()

class Admin (models.Model): 
    name=models.CharField(max_length=50)
    email=models.EmailField()
    password= models.CharField(max_length=20)


class New(models.Model):
    name = models.CharField(max_length=100)
    price = models.IntegerField()
    highlights = models.TextField()  
    image_url = models.URLField()