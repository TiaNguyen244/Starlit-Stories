import pandas as pd
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import OneHotEncoder
import pickle
import json

df = pd.read_json("data.json")
df["price"] = df["price"].apply(lambda x: float(x[1:]))
df_dummies = pd.get_dummies(df, columns=["genre", "sub_genre"], drop_first=True)
X = df_dummies[["rating", "genre_Non-Fiction",'sub_genre_Art', 'sub_genre_Autobiography','sub_genre_Biography', "sub_genre_Children's", 'sub_genre_Cooking', 'sub_genre_Fantasy', 'sub_genre_Graphic Novel', 'sub_genre_Historical Fiction', 'sub_genre_History', 'sub_genre_How-To', 'sub_genre_Humanities', 'sub_genre_Illustrated', 'sub_genre_Mystery', 'sub_genre_Romance', 'sub_genre_Science & Technology', 'sub_genre_Science Fiction', 'sub_genre_Thriller', 'sub_genre_Travel', 'sub_genre_True Crime', 'sub_genre_Young Adult' ]]

with open('trained_model.pkl', 'rb') as f:
    knn = pickle.load(f)


def get_recommendation(isbn):
    selected_product_index = df[df['ISBN'] == isbn].index[0]
    selected_product_features = pd.DataFrame([X.iloc[selected_product_index]], columns=X.columns)
    print(selected_product_features)

    distances, indices = knn.kneighbors(selected_product_features)
    print(distances)
    print(indices)

    recommended_product_indices = indices.flatten()
    recommended_products = df.iloc[recommended_product_indices]

    print("Selected Product:")
    print(df.iloc[selected_product_index])
    print("\nRecommended Products:")
    print(recommended_products)
    return recommended_products