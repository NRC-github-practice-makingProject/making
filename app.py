from flask import Flask, request, render_template, jsonify
from pymongo import MongoClient
import bcrypt
from werkzeug.utils import redirect


app = Flask(__name__)


client = MongoClient('mongodb://4team:team4pass@3.36.13.234', 27017)
# client = MongoClient('localhost', 27017)
db = client.dbGilbert


@app.route('/')
def home():
    return render_template('index.html')


@app.route("/api/rest", methods=['GET'])
def rest_listing():
    rest = list(db.rest.find({}, {'_id': False}))
    return jsonify({'rest': rest})


@app.route("/api/attr", methods=['GET'])
def attr_listing():
    attr = list(db.attr.find({}, {'_id': False}))
    return jsonify({'rest': attr})


@app.route("/service")
def service():
    return render_template('service.html')


@app.route("/FAQ")
def FAQ():
    return render_template('FAQ.html')


@app.route("/aboutus")
def aboutus():
    return render_template('aboutus.html')


@app.route("/attr")
def attr():
    return render_template('attr.html')


@app.route('/rest')
def rest():
    return render_template('rest.html')


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        return render_template('register.html')
    else:
        id = request.form.get('id_give')
        email = request.form.get('email_give')
        password = request.form.get('password_give')
        re_password = request.form.get('re_password_give')
        id_check = db.users.find_one({'id': id})
        email_check = db.users.find_one({'email': email})
        status = 0

        if not (id and email and password and re_password):
            return jsonify({'result': 'fail', 'msg': '빈칸을 입력해주세요.'})
        elif id_check is not None or email_check is not None:
            return jsonify({'result': 'fail', 'msg': '가입된 정보가 있습니다.'})
        elif password != re_password:
            return jsonify({'result': 'fail', 'msg': '비밀번호가 다릅니다.'})
        else:
            userinfo = {
                'id': id,
                'email': email,
                'password': bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8'),
                'status': status
            }
            db.users.insert_one(userinfo)
            print('성공')
            return jsonify({'result': 'success', 'msg': '회원가입을 축하드립니다.'})


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    else:
        user_id = request.form['user_id_give']
        user_pw = request.form['user_pw_give']
        db_id = db.users.find_one({'id': user_id}, {'_id': False})
        if db_id is None:
            return jsonify({'result': 'fail', 'msg': '가입하신 정보가 없습니다.'})
        db_pw = db_id['password']
        check = bcrypt.checkpw(user_pw.encode('utf-8'), db_pw.encode('utf-8'))

        if db_id and check:
            db.users.update_one({'id': user_id}, {'$set': {'status': 1}})
            status = 1
            return jsonify({'result': 'success', 'msg': '로그인 성공.', 'status': status, 'user_id': user_id})
        else:
            return jsonify({'result': 'fail', 'msg': '입력하신 정보가 일치하지않습니다.'})


def login_check(st, id):
    db_id_check = db.users.find_one({'id': id}, {'_id': False})
    print(type(db_id_check['status']))
    print(type(db_id_check['id']))
    if db_id_check['status'] == st and db_id_check['id'] == id:
        return True
    else:
        return False


@ app.route('/logout', methods=['POST'])
def logout():
    st = int(request.form['st_give'])
    id = request.form['id_give']
    print(type(st), type(id))
    check = login_check(st, id)
    if check == True:
        db.users.update_one({'id': id}, {'$set': {'status': 0}})
        return jsonify({'result': 'success', 'msg': '성공'})
    else:
        return jsonify({'result': 'fail', 'msg': '로그인되어있지않음.'})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
