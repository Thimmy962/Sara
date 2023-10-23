# Generated by Django 4.2.6 on 2023-10-19 10:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0004_orderitem_order_alter_cart_items_alter_item_major_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cart',
            name='items',
        ),
        migrations.AlterField(
            model_name='orderitem',
            name='order',
            field=models.ManyToManyField(blank=True, null=True, to='products.cart'),
        ),
    ]