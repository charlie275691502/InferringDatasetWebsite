from django.contrib import admin
from . import models

# Register your models here.
admin.site.register(models.Dataset)
admin.site.register(models.DatasetColumn)