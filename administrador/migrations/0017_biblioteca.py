# Generated by Django 2.0.7 on 2018-07-17 15:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('administrador', '0016_auto_20180708_1258'),
    ]

    operations = [
        migrations.CreateModel(
            name='Biblioteca',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=75)),
                ('descripcion', models.CharField(max_length=75)),
                ('ubicacion', models.CharField(max_length=125)),
                ('latitud', models.CharField(max_length=250)),
                ('longitud', models.CharField(max_length=250)),
            ],
        ),
    ]
