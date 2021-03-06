# Generated by Django 2.0.7 on 2018-07-12 17:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('administrador', '0016_auto_20180708_1258'),
        ('usuario', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Prestamos',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_prestamo', models.CharField(max_length=10)),
                ('fecha_devolucion', models.CharField(max_length=10)),
                ('token', models.CharField(max_length=20)),
                ('estado', models.CharField(max_length=1)),
            ],
        ),
        migrations.AlterField(
            model_name='usuario',
            name='zona',
            field=models.IntegerField(),
        ),
        migrations.AddField(
            model_name='prestamos',
            name='Usuario',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='usuario.Usuario'),
        ),
        migrations.AddField(
            model_name='prestamos',
            name='libro',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='administrador.Libro'),
        ),
    ]
