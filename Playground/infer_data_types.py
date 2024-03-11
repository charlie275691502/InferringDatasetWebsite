import pandas as pd
from dateutil.parser import parse

def majority_infer(df):
    empty_strings = set(["", "?", "none", "no", "-", "undefined", "not available"])
    typo_rate_threshold = 0.05
    category_rate_threshold = 0.5

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

    for col in df.columns:
        column = [cell for cell in df[col] if is_empty(cell) == False]

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
                print(f"{col}: category")
            else :
                print(f"{col}: object")
        elif "float" in major_types :
            print(f"{col}: float")
        elif "int" in major_types :
            print(f"{col}: int")
        elif "bool" in major_types :
            print(f"{col}: bool")
        elif "datetime" in major_types :
            print(f"{col}: datetime")

    return df

df = pd.read_csv('sample_data.csv')
df = majority_infer(df)
# print(df.dtypes)