from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Dataset, DatasetColumnType
from .serializers import DatasetSerializer

# Create your views here.

class DatasetViewSet(ModelViewSet):
    queryset = Dataset.objects.prefetch_related('column_types').all()
    serializer_class = DatasetSerializer