import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
import pickle

df = pd.read_csv("campusmart_dataset.csv")

product_encoder = LabelEncoder()
condition_encoder = LabelEncoder()

df["product"] = product_encoder.fit_transform(df["product"])
df["condition"] = condition_encoder.fit_transform(df["condition"])

X = df[["product","years_used","condition"]]
y = df["price"]

model = RandomForestRegressor(n_estimators=200)

model.fit(X,y)

pickle.dump(model, open("price_model.pkl","wb"))
pickle.dump(product_encoder, open("product_encoder.pkl","wb"))
pickle.dump(condition_encoder, open("condition_encoder.pkl","wb"))

print("Model and encoders saved!")