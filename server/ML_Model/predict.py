import pickle
import os
import sys
import numpy as np

current_dir = os.path.dirname(os.path.abspath(__file__))

model = pickle.load(open(os.path.join(current_dir,"price_model.pkl"),"rb"))
product_encoder = pickle.load(open(os.path.join(current_dir,"product_encoder.pkl"),"rb"))
condition_encoder = pickle.load(open(os.path.join(current_dir,"condition_encoder.pkl"),"rb"))

product = sys.argv[1]
years = float(sys.argv[2])
condition = sys.argv[3]

product_num = product_encoder.transform([product])[0]
condition_num = condition_encoder.transform([condition])[0]

data = np.array([[product_num, years, condition_num]])

prediction = model.predict(data)

print(round(float(prediction[0]),2))