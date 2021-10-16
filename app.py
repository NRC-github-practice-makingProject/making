from flask import Flask, request, render_template, jsonify
from pymongo import MongoClient
import datetime
import jwt


app = Flask(__name__)


client = MongoClient('mongodb://4team:team4pass@localhost', 27017)


@app.route('/')
def home():
    return render_template('map.html')


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
