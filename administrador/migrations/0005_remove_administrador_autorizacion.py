# Generated by Django 2.0.6 on 2018-06-29 23:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('administrador', '0004_auto_20180629_1728'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='administrador',
            name='autorizacion',
        ),
    ]