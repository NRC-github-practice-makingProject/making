from datetime import timedelta, datetime
from flask import Flask, request, render_template, jsonify, session, make_response
from pymongo import MongoClient
import bcrypt
from werkzeug.utils import redirect
import collections


app = Flask(__name__)
app.secret_key = '$@%@!|~!@41`4team'
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(minutes=30)

client = MongoClient('mongodb://4team:team4pass@3.36.13.234', 27017)
# client = MongoClient('localhost', 27017)
db = client.dbGilbert

# 지역이름 매칭 작업
@app.route('/sw')
def sw():
    return render_template('/region/sw.html')
@app.route('/ic')
def ic():
    return render_template('/region/ic.html')
@app.route('/gg')
def gg():
    return render_template('/region/gg.html')
@app.route('/gw')
def gw():
    return render_template('/region/gw.html')
@app.route('/cn')
def cn():
    return render_template('/region/cn.html')
@app.route('/cs')
def cs():
    return render_template('/region/cs.html')
@app.route('/sj')
def sj():
    return render_template('/region/sj.html')
@app.route('/dj')
def dj():
    return render_template('/region/dj.html')
@app.route('/dg')
def dg():
    return render_template('/region/dg.html')
@app.route('/gn')
def gn():
    return render_template('/region/gn.html')
@app.route('/gs')
def gs():
    return render_template('/region/gs.html')
@app.route('/ws')
def ws():
    return render_template('/region/ws.html')
@app.route('/bs')
def bs():
    return render_template('/region/bs.html')
@app.route('/gj')
def gj():
    return render_template('/region/gj.html')
@app.route('/jn')
def jn():
    return render_template('/region/jn.html')
@app.route('/js')
def js():
    return render_template('/region/js.html')
@app.route('/jj')
def jj():
    return render_template('/region/jj.html')
# search.html사용 셋팅
 
#  랜덤기능 구현
@app.route("/api/rrandomDisplay", methods=['POST'])
def rrandomDisplay():
    input_db = db.rest.find({}, {'_id': False})
 
    return jsonify({'rrandomDisplay': list(input_db)}), 200

@app.route("/api/arandomDisplay", methods=['POST'])
def arandomDisplay():
    input_db = db.attr.find({}, {'_id': False})
 
    return jsonify({'arandomDisplay': list(input_db)}), 200

#  랜덤기능 구현


@app.route('/search')
def search():
    return render_template('search.html')

@app.route('/randomtest')
def randomtest():
    return render_template('randomtest.html')
# 전역 검색 api 제작


@app.route("/api/search", methods=['POST'])
def jeju_searching():
    input = request.form['input_give']

    rest_search = db.rest.find(
        {"title": {"$regex": f".*{input}.*"}}, {"_id": False})
    attr_search = db.attr.find(
        {"title": {"$regex": f".*{input}.*"}}, {"_id": False})

    return jsonify({'jeju_search': list(rest_search)+list(attr_search)}), 200


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/api/login_check', methods=['GET'])
def login_check():
    if 'user_id' in session:
        return jsonify({'status': 'login', 'user_id': session['user_id'], 'name': session['name']})
    else:
        return redirect('/login')


@app.route("/api/rest", methods=['POST'])
def rest_listing():
    rest_list = []
    count = int(request.form['count_give'])
    rest = list(db.rest.find({}, {'_id': False}).sort('like', -1))
    for count_ in rest[count:count+8]:
        rest_list.append((count_))
    return jsonify({'rest': rest_list})


@app.route("/api/attr", methods=['POST'])
def attr_listing():
    attr_list = []
    count = int(request.form['count_give'])
    attr = list(db.attr.find({}, {'_id': False}).sort('like', -1))
    for count_ in attr[count:count+8]:
        attr_list.append((count_))
    return jsonify({'attr': attr_list})


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
        name = request.form.get('name_give')
        phone = request.form.get('phone_give')
        age = request.form.get('age_give')
        password = request.form.get('password_give')
        re_password = request.form.get('re_password_give')
        id_check = db.users.find_one({'id': id})
        email_check = db.users.find_one({'email': email})
        phone_check = db.users.find_one({'phone': phone})

        if not (id and email and name and age and phone and password and re_password):
            return jsonify({'result': 'fail', 'msg': '빈칸을 입력해주세요.'})
        elif id_check is not None or email_check is not None or phone_check is not None:
            return jsonify({'result': 'fail', 'msg': '가입된 정보가 있습니다.'})
        elif password != re_password:
            return jsonify({'result': 'fail', 'msg': '비밀번호가 다릅니다.'})
        else:
            userinfo = {
                'id': id,
                'email': email,
                'name': name,
                'age': age,
                'phone': phone,
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
        name = db_id['name']
        if db_id and check:
            session['user_id'] = user_id
            session['name'] = name
            return jsonify({'result': 'success', 'msg': '로그인 성공.'})
        else:
            return jsonify({'result': 'fail', 'msg': '입력하신 정보가 일치하지않습니다.'})


@app.route('/logout')
def logout():
    session.pop('user_id', None)
    return redirect('/')


@app.route('/api/attr_like', methods=['POST'])
def attr_like():
    title = request.form['title_give']
    target = db.attr.find_one({'title': title}, {'_id': False})
    like = target['like']
    print(like)
    print(type(like))
    new_like = like + 1
    db.attr.update_one({'title': title}, {'$set': {'like': new_like}})
    return jsonify({'msg': '좋아요👍'})


@app.route('/api/rest_like', methods=['POST'])
def rest_like():
    title = request.form['title_give']
    target = db.rest.find_one({'title': title}, {'_id': False})
    like = target['like']
    print(like)
    print(type(like))
    new_like = like + 1
    db.rest.update_one({'title': title}, {'$set': {'like': new_like}})
    return jsonify({'msg': '좋아요👍'})


@app.route('/api/review_write', methods=['POST'])
def review_write():
    title = request.form['title_give']
    user_id = request.form['user_give']
    text = request.form['text_give']
    star = request.form['star_give']
    date = request.form['date_give']
    count_get = list(db.review.find({'$and': [{'title': title}, {'count': {'$gte': 0}}]},
                                    {'_id': False}).sort('count', -1))
    if count_get == []:
        count = 0
    else:
        count = count_get[0]['count']
        count += 1

    if not (title and text):
        return jsonify({'result': 'fail', 'msg': '빈칸을 입력해주세요.'})
    else:
        doc = {
            'title': title,
            'user_id': user_id,
            'text': text,
            'star': star,
            'date': date,
            'count': count
        }
        db.review.insert_one(doc)
        return jsonify({'result': 'success', 'msg': '소중한 리뷰 감사드립니다!'})


@app.route('/api/review_show', methods=['POST'])
def review_show():
    review_title = request.form['title_give']
    review = list(db.review.find({'title': review_title}, {'_id': False}))
    return jsonify({'result': 'success', 'review': review})


@app.route('/api/accom_write', methods=['POST'])
def accom_write():
    title = request.form['title_give']
    user_id = request.form['user_give']
    text = request.form['text_give']
    fromdate = request.form['fromdate_give']
    todate = request.form['todate_give']
    dates = date_rage(todate, fromdate)
    count_get = list(db.accom.find({'$and': [{'title': title}, {'count': {'$gte': 0}}]}, {
        '_id': False}).sort('count', -1))
    if count_get == []:
        count = 0
    else:
        count = count_get[0]['count']
        count += 1
    recount = 0
    if not (title and text):
        return jsonify({'result': 'fail', 'msg': '빈칸을 입력해주세요.'})
    else:
        doc = {
            'title': title,
            'user_id': user_id,
            'text': text,
            'todate': todate,
            'fromdate': fromdate,
            'setdate': dates,
            'count': count,
            'recount': recount
        }
        db.accom.insert_one(doc)
        return jsonify({'result': 'success', 'msg': '동행모집 글 작성을 완료했습니다!'})


@app.route('/api/review_del', methods=['POST'])
def review_del():
    review_id = request.form['id_give']
    count = int(request.form['count_give'])
    title = request.form['title_give']
    count_db = db.review.find_one(
        {'$and': [{'title': title}, {'count': count}]})
    id = count_db['user_id']
    if id == review_id:
        db.review.delete_one(
            {'$and': [{'title': title}, {'count': count}, {'user_id': review_id}]})
        return jsonify({'result': 'success', 'msg': '삭제완료!'})
    else:
        return jsonify({'result': 'fail', 'msg': '작성자만 삭제가능합니다.'})


@app.route('/api/review_modi', methods=['POST'])
def review_modi():
    count = int(request.form['count_give'])
    id_ = request.form['id_give']
    title = request.form['title_give']
    count_db = db.review.find_one(
        {'$and': [{'title': title}, {'count': count}]}, {'_id': False})
    id_db = count_db['user_id']

    if id_ == id_db:
        return jsonify({'result': 'success', 'modi': count_db})
    else:
        return jsonify({'result': 'fail', 'msg': '작성자만 수정가능합니다.'})


@app.route('/api/review_modi_write', methods=['POST'])
def review_modi_write():
    title = request.form['title_give']
    text = request.form['text_give']
    star = request.form['star_give']
    count = int(request.form['count_give'])

    if not (title and text):
        return jsonify({'result': 'fail', 'msg': '빈칸을 입력해주세요.'})
    else:
        db.review.update_one({'$and': [{'title': title}, {'count': count}]}, {
            '$set': {'text': text}})
        db.review.update_one({'$and': [{'title': title}, {'count': count}]}, {
            '$set': {'star': star}})
        return jsonify({'result': 'success', 'msg': '수정이 완료되었습니다!'})


@app.route('/api/accom_show', methods=['POST'])
def accom_show():
    accom_title = request.form['title_give']
    accom_fromdate = request.form['fromdate_give']
    accom_todate = request.form['todate_give']
    dates = date_rage(accom_todate, accom_fromdate)
    content = []

    for n in dates:
        accoms = list(db.accom.find({'$and': [{'title': accom_title}, {
            'setdate': {'$regex': n}}]}, {'_id': False}))
        if accoms is None:
            pass
        else:
            for accom in accoms:
                target_user = accom['user_id']
                user = db.users.find_one({'id': target_user}, {'_id': False})
                content.append({
                    'count': accom['count'],
                    'name': user['name'],
                    'phone': user['phone'],
                    'age': user['age'],
                    'id': target_user,
                    'text': accom['text'],
                    'todate': accom['todate'],
                    'fromdate': accom['fromdate']
                })
    data2 = list(map(dict, collections.OrderedDict.fromkeys(
        tuple(sorted(d.items())) for d in content)))
    content = data2
    return jsonify({'result': 'success', 'accom': content})


@app.route('/api/accom_in_show', methods=['POST'])
def accom_in_show():
    accom_title = request.form['title_give']
    accom_count = int(request.form['count_give'])
    content = []
    accoms = list(db.accom.find(
        {'$and': [{'title': accom_title}, {'count': accom_count}]}, {'_id': False}))
    if accoms is None:
        pass
    else:
        for accom in accoms:
            target_user = accom['user_id']
            user = db.users.find_one({'id': target_user}, {'_id': False})
            content.append({
                'count': accom['count'],
                'name': user['name'],
                'phone': user['phone'],
                'age': user['age'],
                'id': target_user,
                'text': accom['text'],
                'todate': accom['todate'],
                'fromdate': accom['fromdate'],
                'recount': accom['recount']
            })

    return jsonify({'result': 'success', 'accom': content})


@app.route('/api/accom_in_write', methods=['POST'])
def accom_in_write():
    title = request.form['title_give']
    user_id = request.form['user_give']
    text = request.form['text_give']
    fromdate = request.form['fromdate_give']
    todate = request.form['todate_give']
    count = int(request.form['count_give'])
    accoms = db.accom.find_one(
        {'$and': [{'title': title}, {'count': count}, {'recount': 0}]}, {'_id': False})
    if accoms['user_id'] == user_id:
        recount = 0
    else:
        recount = 1

    if not (title and text):
        return jsonify({'result': 'fail', 'msg': '빈칸을 입력해주세요.'})
    else:
        doc = {
            'title': title,
            'user_id': user_id,
            'text': text,
            'todate': todate,
            'fromdate': fromdate,
            'count': count,
            'recount': recount
        }
        db.accom.insert_one(doc)
        return jsonify({'result': 'success', 'msg': '동행모집 글 작성을 완료했습니다!'})


@ app.route('/api/accom_del', methods=['POST'])
def accom_del():
    accom_id = request.form['id_give']
    count = int(request.form['count_give'])
    title = request.form['title_give']
    text = request.form['text_give']
    count_db = db.accom.find_one(
        {'$and': [{'title': title}, {'count': count}]})
    id = count_db['user_id']
    if id == accom_id:
        db.accom.delete_one(
            {'$and': [{'title': title}, {'count': count}, {'user_id': accom_id}, {'text': text}]})
        return jsonify({'result': 'success', 'msg': '삭제완료!'})
    else:
        return jsonify({'result': 'fail', 'msg': '작성자만 삭제가능합니다.'})


@ app.route('/api/accom_modi', methods=['POST'])
def accom_modi():
    count = int(request.form['count_give'])
    id_ = request.form['id_give']
    title = request.form['title_give']
    count_db = db.accom.find_one(
        {'$and': [{'title': title}, {'count': count}]}, {'_id': False})
    id_db = count_db['user_id']

    if id_ == id_db:
        return jsonify({'result': 'success', 'modi': count_db})
    else:
        return jsonify({'result': 'fail', 'msg': '작성자만 수정가능합니다.'})


@ app.route('/api/accom_modi_write', methods=['POST'])
def accom_modi_write():
    title = request.form['title_give']
    text = request.form['text_give']
    count = int(request.form['count_give'])

    if not (title and text):
        return jsonify({'result': 'fail', 'msg': '빈칸을 입력해주세요.'})
    else:
        db.accom.update_one({'$and': [{'title': title}, {'count': count}]}, {
            '$set': {'text': text}})
        return jsonify({'result': 'success', 'msg': '수정이 완료되었습니다!'})


def date_rage(start, end):
    start = datetime.strptime(start, "%Y-%m-%d")
    end = datetime.strptime(end, "%Y-%m-%d")
    dates = [(start + timedelta(days=i)).strftime("%Y-%m-%d")
             for i in range((end-start).days+1)]
    return dates


print()


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
