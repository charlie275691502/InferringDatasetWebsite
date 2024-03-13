import pandas as pd
from dateutil.parser import parse
from .models import DatasetColumn

def majority_infer(
        df: pd.DataFrame,
        empty_strings = set(["", "?", "none", "no", "-", "undefined", "not available"]),
        typo_rate_threshold = 0.05,
        category_rate_threshold = 0.5) -> list[(str, str)]:

    def get_init_types() -> dict :
        return {
            'int': 0,
            'float': 0,
            'bool': 0,
            'datetime': 0,
            'object': 0
        }

    def is_empty(cell: str) -> bool:
        try:
            return cell.strip().lower() in empty_strings
        except (ValueError, AttributeError):
            return False
    
    def is_int(cell: str) -> bool:
        try:
            return cell.isdigit()
        except (ValueError, AttributeError):
            return False
    
    def is_float(cell: str) -> bool:
        try:
            float(cell)
            return True
        except (ValueError, AttributeError):
            return False
    
    def is_datetime(cell: str) -> bool:
        try: 
            parse(cell)
            return True
        except (ValueError, AttributeError):
            return False
    
    def is_bool(cell: str) -> bool:
        return cell == "True" or cell == "true" or cell == "False" or cell == "false"
    
    def get_column_type(series: pd.Series) -> str:
        column = [cell for cell in series if is_empty(cell) == False]
        types = get_init_types()
        for cell in column :
            if is_int(cell) :
                types["int"] += 1
            elif is_float(cell) :
                types["float"] += 1
            elif is_bool(cell) :
                types["bool"] += 1
            elif is_datetime(cell) :
                types["datetime"] += 1
            else :
                types["object"] += 1
        
        major_types = [key for (key, value) in types.items() if value/len(column) > typo_rate_threshold]
        if "object" in major_types or (len(major_types) >= 2 and not (len(major_types) == 2 and "int" in major_types and "float" in major_types)):
            if len(list(set(column))) / len(column) < category_rate_threshold :
                return DatasetColumn.TYPE_CATEGORY
            else :
                return DatasetColumn.TYPE_TEXT
        elif "float" in major_types :
            return DatasetColumn.TYPE_FLOAT
        elif "int" in major_types :
            return DatasetColumn.TYPE_INT
        elif "bool" in major_types :
            return DatasetColumn.TYPE_BOOL
        elif "datetime" in major_types :
            return DatasetColumn.TYPE_DATETIME
        return DatasetColumn.TYPE_TEXT

    return [(col, get_column_type(df[col])) for col in df.columns]

def get_names_and_types(df: pd.DataFrame) -> list[(str, str)]:
    return majority_infer(df)