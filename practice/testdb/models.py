from django.db import models

# Create your models here.
class Teacher(models.Model):
    name=models.CharField(max_length=80)
    age= models.IntegerField()



class Product(models.Model): 
    name=models.CharField(max_length=50)
    description=models.CharField(max_length=50)
    highlight=models.CharField(max_length=50)
    price = models.IntegerField()
    image = models.ImageField()
    rating = models.IntegerField()


class Admin (models.Model): 
    name=models.CharField(max_length=50)
    email=models.EmailField()
    password= models.CharField(max_length=20)

