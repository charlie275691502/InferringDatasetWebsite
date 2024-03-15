from django.db import models

# Create your models here.
class Dataset(models.Model):
    raw_file = models.FileField(upload_to='')

class DatasetColumn(models.Model):
    TYPE_INT = "I"
    TYPE_FLOAT = "F"
    TYPE_BOOL = "B"
    TYPE_DATETIME = "D"
    TYPE_CATEGORY = "C"
    TYPE_TEXT = "T"
    TYPE_CHOICES = [
        (TYPE_INT, "Integer"),
        (TYPE_FLOAT, "Float"),
        (TYPE_BOOL, "Boolean"),
        (TYPE_DATETIME, "Datetime"),
        (TYPE_CATEGORY, "Category"),
        (TYPE_TEXT, "Text"),
    ]
    index = models.IntegerField()
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=1, choices=TYPE_CHOICES, default=TYPE_TEXT)
    dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE, related_name='columns')