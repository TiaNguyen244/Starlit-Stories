from flask import Flask, jsonify
import pandas as pd
from get_recommendation import get_recommendation
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return jsonify({"message": "Hello, World!"})

@app.route('/rec/<isbn>')
def get_rec(isbn):
    return get_recommendation(isbn).to_dict()


if __name__ == '__main__':
    app.run(debug=True)