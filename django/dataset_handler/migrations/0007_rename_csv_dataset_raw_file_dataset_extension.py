# Generated by Django 5.0.3 on 2024-03-14 22:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dataset_handler', '0006_alter_datasetcolumn_dataset'),
    ]

    operations = [
        migrations.RenameField(
            model_name='dataset',
            old_name='csv',
            new_name='raw_file',
        ),
        migrations.AddField(
            model_name='dataset',
            name='extension',
            field=models.CharField(choices=[('nil', 'nil'), ('csv', 'csv'), ('xls', 'xls')], default='nil', max_length=3),
        ),
    ]
