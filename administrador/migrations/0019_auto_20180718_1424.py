# Generated by Django 2.0.7 on 2018-07-18 20:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('administrador', '0018_libro_biblioteca'),
    ]

    operations = [
        migrations.AlterField(
            model_name='biblioteca',
            name='latitud',
            field=models.CharField(max_length=125, null=True),
        ),
        migrations.AlterField(
            model_name='biblioteca',
            name='longitud',
            field=models.CharField(max_length=125, null=True),
        ),
    ]