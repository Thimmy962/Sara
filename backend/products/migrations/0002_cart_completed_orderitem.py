# Generated by Django 4.2.6 on 2023-10-17 06:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart',
            name='completed',
            field=models.BooleanField(default=False),
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField(default=1)),
                ('item', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='products.item')),
            ],
        ),
    ]
