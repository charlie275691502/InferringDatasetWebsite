# Generated by Django 5.0.3 on 2024-03-13 02:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dataset_handler', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dataset',
            name='csv',
            field=models.FileField(upload_to=''),
        ),
    ]
