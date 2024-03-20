import pathlib
from rest_framework import serializers
from django.db.models import Q
from .task import infer_data_type_task
from .models import Dataset, DatasetColumn
import pandas as pd
import os

class DatasetColumnSerializer(serializers.ModelSerializer):
    index = serializers.IntegerField(read_only=True)
    name = serializers.CharField(read_only=True)
    type = serializers.CharField(source='get_type_display')

    class Meta:
        model = DatasetColumn
        fields = ['id', 'index', 'name', 'type']

    def update(self, instance, validated_data):
        validated_data['type'] = {value: key for key, value in DatasetColumn.TYPE_CHOICES}.get(validated_data['get_type_display'], DatasetColumn.TYPE_INT)
        return super().update(instance, validated_data)

class DatasetTableSerializer(serializers.ModelSerializer):
    columns = DatasetColumnSerializer(read_only=True, many=True)
    datas = serializers.SerializerMethodField(read_only=True, method_name='get_data')

    def read_file(self, fileName: str) -> pd.DataFrame :
        extension = pathlib.Path(fileName).suffix[1:]
        if extension == "csv" :
            df = pd.read_csv(fileName, dtype="string")
        elif extension == "xls" or extension == "xlsx" :
            df = pd.read_excel(fileName, dtype="string")
        return df.fillna('')
    
    def get_data(self, dataset: Dataset):
        return self.read_file(dataset.raw_file.path).head(50).values.tolist()

    class Meta:
        model = Dataset
        fields = ['columns', 'datas']

class DatasetSerializer(serializers.ModelSerializer):
    file_name = serializers.SerializerMethodField(read_only=True, method_name='get_file_name')
    table = serializers.SerializerMethodField(read_only=True, method_name='get_table')
    raw_file = serializers.FileField(write_only=True)

    def read_file(self, fileName: str) -> pd.DataFrame :
        extension = pathlib.Path(fileName).suffix[1:]
        if extension == "csv" :
            df = pd.read_csv(fileName, dtype="string")
        elif extension == "xls" or extension == "xlsx" :
            df = pd.read_excel(fileName, dtype="string")
        return df.fillna('')

    def create(self, validated_data):
        raw_file = validated_data['raw_file']
        extension = pathlib.Path(raw_file.name).suffix[1:]
        if extension != "csv" and extension != "xls" and extension != "xlsx" :
            return
        
        dataset = super().create(validated_data)

        df = self.read_file(dataset.raw_file.path)
        
        types = infer_data_type_task(df)
        for idx, (name, type) in enumerate(types) :
            DatasetColumn.objects.create(index=idx, name=name, type=type, dataset_id=dataset.id)
        return dataset
    
    def get_file_name(self, dataset: Dataset):
        return os.path.basename(dataset.raw_file.path)
    
    def get_table(self, dataset):
        return DatasetTableSerializer(dataset).data

    class Meta:
        model = Dataset
        fields = ['id', 'file_name', 'table', 'raw_file']

class DatasetDownloadSerializer(serializers.ModelSerializer):
    file_name = serializers.SerializerMethodField(read_only=True, method_name='get_file_name')
    
    def get_file_name(self, dataset: Dataset):
        return os.path.basename(dataset.raw_file.path)
    
    class Meta:
        model = Dataset
        fields = ['id', 'file_name', 'raw_file']

class DatasetSummaryTableSerializer(serializers.ModelSerializer):
    rows = serializers.SerializerMethodField(read_only=True, method_name='get_rows')
    columns = serializers.SerializerMethodField(read_only=True, method_name='get_columns')
    datas = serializers.SerializerMethodField(read_only=True, method_name='get_summaries')

    def read_file(self, fileName: str) -> pd.DataFrame :
        extension = pathlib.Path(fileName).suffix[1:]
        if extension == "csv" :
            df = pd.read_csv(fileName)
        elif extension == "xls" or extension == "xlsx" :
            df = pd.read_excel(fileName)
        return df.fillna('')
    
    def get_rows(self, dataset: Dataset):
        return ['count', 'mean', 'std', 'min', '25%', '50%', '75%', 'max']
    
    def get_columns(self, dataset: Dataset):
        return DatasetColumnSerializer(DatasetColumn.objects
                                       .filter(dataset_id=dataset.id)
                                       .filter(Q(type=DatasetColumn.TYPE_INT) | Q(type=DatasetColumn.TYPE_FLOAT)).all(), read_only=True, many=True).data
    
    def get_summaries(self, dataset: Dataset):
        return self.read_file(dataset.raw_file.path).describe().values.tolist()

    class Meta:
        model = Dataset
        fields = ['rows', 'columns', 'datas']

class DatasetSummarySerializer(serializers.ModelSerializer):
    file_name = serializers.SerializerMethodField(read_only=True, method_name='get_file_name')
    table = serializers.SerializerMethodField(read_only=True, method_name='get_table')
    
    def get_file_name(self, dataset: Dataset):
        return os.path.basename(dataset.raw_file.path)
    
    def get_table(self, dataset):
        return DatasetSummaryTableSerializer(dataset).data
    
    class Meta:
        model = Dataset
        fields = ['id', 'file_name', 'table']