from rest_framework import serializers
from .models import Dataset, DatasetColumnType

class PlayerSerializer(serializers.ModelSerializer):
    type = serializers.CharField(source='get_type_display')

    class Meta:
        model = DatasetColumnType
        fields = ['column_index', 'type']

class DatasetSerializer(serializers.ModelSerializer):
    column_types = PlayerSerializer(read_only=True, many=True)

    class Meta:
        model = Dataset
        fields = ['id', 'csv_path', 'column_types']