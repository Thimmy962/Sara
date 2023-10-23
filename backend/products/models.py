import uuid
from django.db import models

# Create your models here.
class Major(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name.title()

    def serialize(self):
        return {
            "id":self.id,
            "name": self.name.title()
        }
    
class Minor(models.Model):
    name = models.CharField(max_length=20)
    category = models.ForeignKey(Major, on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.name.title() + " for " + self.category.name.title()
    
    def serialize(self):
        return {
            "id":self.id,
            "name": self.name.title(),
            "category": self.category.name.title()
        }
    
class Item(models.Model):
    id = models.UUIDField(default=uuid.uuid4, editable=False, auto_created=True, unique=True, primary_key=True)
    name = models.CharField(max_length=20)
    minor = models.ForeignKey(Minor, on_delete=models.DO_NOTHING)
    major = models.ForeignKey(Major, on_delete=models.DO_NOTHING)
    price = models.IntegerField()

    def __str__(self):
        return self.name.title()

    def serialize(self):
        return {
            "id": str(self.id),
            "name": self.name.title(),
            "minor": self.minor.name.title(),
            "major": self.major.name.title(),
            "price": self.price
        }


class Cart(models.Model):
    id = models.UUIDField(default=uuid.uuid4, editable=False, auto_created=True, unique=True, primary_key=True)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return str(self.id)
    def total(self):
        return sum([item.total() for item in self.orderitem_set.all()])

    def serialize(self):
        return {
            "id": str(self.id),
            "orderitem": [item.total() for item in self.orderitem_set.all()],
            "total": self.total()
        }

class OrderItem(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    order = models.ForeignKey(Cart, on_delete=models.CASCADE, blank=True, null=True)

    def total(self):
        return self.quantity * self.item.price
    
    def serialize(self):
        return {
            "name": self.item.name.title(),
            "price": self.item.price,
            "quantity": self.quantity,
            "total": self.total()
        }