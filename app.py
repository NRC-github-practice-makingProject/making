from flask import Flask, request, render_template, jsonify
from pymongo import MongoClient
import datetime


app = Flask(__name__)


# client = MongoClient('mongodb://4team:team4pass@localhost', 27017)
client = MongoClient('localhost', 27017)
db = client.dbGilbert


@app.route('/')
def home():
    return render_template('rest.html')


@app.route("/api/rest", methods=['GET'])
def listing():
    rest = list(db.rest.find({}, {'_id': False}))
    return jsonify({'rest': rest})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
