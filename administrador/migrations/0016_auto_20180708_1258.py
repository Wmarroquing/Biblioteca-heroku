# Generated by Django 2.0.6 on 2018-07-08 18:58

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('administrador', '0015_auto_20180708_1255'),
    ]

    operations = [
        migrations.AlterField(
            model_name='autor',
            name='fecha_ingreso',
            field=models.DateField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='libro',
            name='fecha_ingreso',
            field=models.DateField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='tema',
            name='fecha_ingreso',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]