# Generated by Django 2.0.6 on 2018-07-01 04:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('administrador', '0008_auto_20180630_2215'),
    ]

    operations = [
        migrations.AlterField(
            model_name='administrador',
            name='password',
            field=models.CharField(max_length=75),
        ),
    ]