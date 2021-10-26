from datetime import timedelta
from flask import Flask, request, render_template, jsonify, session, make_response
from pymongo import MongoClient
import bcrypt

from werkzeug.utils import redirect


app = Flask(__name__)
app.secret_key = '$@%@!|~!@41`4team'
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(minutes=30)

client = MongoClient('mongodb://4team:team4pass@3.36.13.234', 27017)
# client = MongoClient('localhost', 27017)
db = client.dbGilbert

# search.html사용 셋팅 
@app.route('/search')
def search():
    return render_template('search.html')


@app.route('/')
def home():
    return render_template('index.html')

# 전역 검색 api 제작
@app.route("/api/search", methods=['POST'])
def jeju_searching():
    input = request.form['input_give']

    rest_search = db.rest.find({"title": {"$regex": f".*{input}.*"}}, {"_id": False})
    attr_search = db.attr.find({"title": {"$regex": f".*{input}.*"}}, {"_id": False})
    
    return jsonify({'jeju_search': list(rest_search)+list(attr_search)}), 200
  

@app.route('/api/login_check', methods=['GET'])
def login_check():
    if 'user_id' in session:
        return jsonify({'status': 'login', 'user_id': session['user_id']})
    else:
        return redirect('/login')


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
    if 'user_id' in session:
        return render_template('attr.html')
    else:
        return redirect('/login')


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
            }
            db.users.insert_one(userinfo)
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
            session['user_id'] = user_id
            return jsonify({'result': 'success', 'msg': '로그인 성공.'})
        else:
            return jsonify({'result': 'fail', 'msg': '입력하신 정보가 일치하지않습니다.'})


@ app.route('/logout')
def logout():
    session.pop('user_id', None)
    return redirect('/')


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
