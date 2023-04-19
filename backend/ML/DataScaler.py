import pandas as pd
from sklearn.preprocessing import StandardScaler
import decimal
from tqdm import tqdm
def Data_StandardScaler(data):
    scaler = StandardScaler()
    try:
        scaler.fit(data)
        scalering_data = scaler.transform(data)
        scalering_data = pd.DataFrame(data = scalering_data, columns=data.columns)
        scalering_data

    except ValueError:
        data = data.set_index("datetime")
        scaler.fit(data)
        scalering_data = scaler.transform(data)
        scalering_data = pd.DataFrame(data = scalering_data, columns=data.columns)
        scalering_data = scalering_data.set_index(data.index)

    return scalering_data

def Data_divided_before(data):

    if "datetime" in data.columns:
        data = data.set_index("datetime")

    for i in data.columns:
        for j in tqdm(range(1, len(data))):
            data.iloc[j][i] = decimal.Decimal(str(data.iloc[j][i])) / decimal.Decimal(str(data.iloc[j-1]['close']))
    return data