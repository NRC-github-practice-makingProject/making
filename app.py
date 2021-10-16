from flask import Flask
from pymongo
app = Flask(__name__)


client = MongoClient('mongodb://4team:team4pass@localhost', 27017)


@app.route('/')
def home():
    return 'This is Home!'


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
