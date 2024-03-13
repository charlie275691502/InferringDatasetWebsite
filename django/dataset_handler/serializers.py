from rest_framework import serializers
from .models import Dataset, DatasetColumnType

class DatasetColumnTypeSerializer(serializers.ModelSerializer):
    type = serializers.CharField(source='get_type_display')

    class Meta:
        model = DatasetColumnType
        fields = ['column_index', 'type']

class DatasetSerializer(serializers.ModelSerializer):
    column_types = DatasetColumnTypeSerializer(read_only=True, many=True)

    def create(self, validated_data):
        DatasetColumnType.objects.create(column_index=0, type=DatasetColumnType.TYPE_INT, dataset_id=1)
        return super().create(validated_data)

    class Meta:
        model = Dataset
        fields = ['id', 'csv', 'column_types']