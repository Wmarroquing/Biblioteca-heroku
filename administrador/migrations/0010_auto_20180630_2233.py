# Generated by Django 2.0.6 on 2018-07-01 04:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('administrador', '0009_auto_20180630_2222'),
    ]

    operations = [
        migrations.AddField(
            model_name='administrador',
            name='municipio',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='administrador.Municipio'),
        ),
        migrations.AlterField(
            model_name='administrador',
            name='password',
            field=models.CharField(max_length=75, null=True),
        ),
    ]