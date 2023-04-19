import matplotlib.pyplot as plt
import pandas as pd
# path : ex) ML_Result/
def LabelingImg(labeling_data, path):
    step = 1000
    for i in range(0, len(labeling_data), step):
        name = str(labeling_data.iloc[i]["datetime"])+ " ~ " + str(labeling_data.iloc[i + step - 1]["datetime"])
        fig = plt.figure(figsize=(16,9))
        fig = plt.title(name)
        fig = plt.plot(labeling_data.iloc[i:i + step]["datetime"], labeling_data.iloc[i:i + step]["close"])
        for j in range(i, i + step):
            if labeling_data.iloc[j]["result_label"] == 0:
                fig = plt.scatter(labeling_data.iloc[j]["datetime"], labeling_data.iloc[j]["close"], color = "r")
            if labeling_data.iloc[j]["result_label"] == 1:
                fig = plt.scatter(labeling_data.iloc[j]["datetime"], labeling_data.iloc[j]["close"], color = "b")
        
        plt.savefig(path + name + ".png")