# Generated by Django 2.0.6 on 2018-07-07 00:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('administrador', '0012_auto_20180701_1908'),
    ]

    operations = [
        migrations.AlterField(
            model_name='administrador',
            name='municipio',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='administrador.Municipio'),
        ),
    ]
