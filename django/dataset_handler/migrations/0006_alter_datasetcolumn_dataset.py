# Generated by Django 5.0.3 on 2024-03-14 00:10

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dataset_handler', '0005_rename_column_index_datasetcolumn_index'),
    ]

    operations = [
        migrations.AlterField(
            model_name='datasetcolumn',
            name='dataset',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='columns', to='dataset_handler.dataset'),
        ),
    ]