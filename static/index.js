user_id = ''
$(document).ready(function () {
    Logincheck();
    $('#accom_show').hide()
    $('#accom_refer').show()
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $('#back').hide()
    arandomSearches()
    rrandomSearches()
});
check = ''

function Logincheck() {
    $.ajax({
        type: "GET",
        url: "/api/login_check",
        data: {},
        success: function (response) {
            if (response['status'] == 'login') {
                $('#ID0').empty()
                user_id = response['user_id']
                user_name = response['name']
                temp_html = `${user_name}님 안녕하세요!`
                $('#ID0').append(temp_html)
                $('#LOGIN0').text('로그아웃')
                $('#LOGIN0').prop('href', '/logout')
                check = 'true'
            } else {
                $('#LOGIN0').text('로그인')
                $('#LOGIN0').prop('href', '/login')
                check = 'false'
            }
        },
    })
}

function test(){
    let location = $('#location').val()
    alert(location)
}

function index_search(){
    let input_main = $('#input_search').val()
    window.location.href='/search?q='+input_main
}

function enterkey() {
    if (window.event.keyCode == 13) {

    let input_main = $('#input_search').val()
    window.location.href='/search?q='+input_main
    }
}



function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function rrandomSearches() {
    let rattr_input = rand(0, 1100);
    let rrest_input = rand(0, 1336);
    console.log(rattr_input);
    console.log(rrest_input);
    $('#rsearch-box').empty()
    $.ajax({
        type: "POST",
        url: "/api/rrandomDisplay",
        data: { input_give: rrest_input },
        success: function (response) {
            console.log(response)
            let random_searchs = response['rrandomDisplay']
            for (let i = 0; i < 4; i++) {
                rrest_input = rrest_input + i
                let title = random_searchs[rrest_input]['title']
                let img = random_searchs[rrest_input]['img']
                let sub_title = random_searchs[rrest_input]['sub_title']
                let item_tags1 = random_searchs[rrest_input]['item_tags1']
                let item_tags2 = random_searchs[rrest_input]['item_tags2']
                let item_tags3 = random_searchs[rrest_input]['item_tags3']
                let sub_item_tag = random_searchs[rrest_input]['sub_item_tag']
                let sub_item_tag2 = random_searchs[rrest_input]['sub_item_tag2']
                let sub_item_tag3 = random_searchs[rrest_input]['sub_item_tag3']
                let sub_item_tag4 = random_searchs[rrest_input]['sub_item_tag4']
                let sub_item_tag5 = random_searchs[rrest_input]['sub_item_tag5']
                if (sub_item_tag == null) {
                    sub_item_tag = '　'
                    sub_item_tag2 = '　'
                    sub_item_tag3 = '　'
                    sub_item_tag4 = '　'
                    sub_item_tag5 = '　'
                } else if (sub_item_tag2 == null) {
                    sub_item_tag2 = ''
                    sub_item_tag3 = ''
                    sub_item_tag4 = ''
                    sub_item_tag5 = ''
                } else if (sub_item_tag3 == null) {
                    sub_item_tag3 = ''
                    sub_item_tag4 = ''
                    sub_item_tag5 = ''
                } else if (sub_item_tag4 == null) {
                    sub_item_tag4 = ''
                    sub_item_tag5 = ''
                }
                else if (sub_item_tag5 == null) {
                    sub_item_tag5 = ''
                }
                let temp_html = `
            <div class=item0>
        <div class="item0_box">
            <img src="${img}" class="item0_img">
            <p class="item0_title">
                ${title}
            </p>
            <p class="item0_sub_title">
                ${sub_title}
            </p>
            <p class="item0_tag">
                ${item_tags1} ${item_tags2} ${item_tags3} 
            </p>
            <p class="item0_sub_tag">
                ${sub_item_tag} ${sub_item_tag2} ${sub_item_tag3} ${sub_item_tag4} ${sub_item_tag5}
            </p>
            <span class="item0_star">별점 표기 예정입니다.⭐️⭐️⭐️⭐️⭐️</span>
        </div>
    </div>
    `
                $('#rsearch-box').append(temp_html)

            }
        }
    }
    )
}

function arandomSearches() {
    let rattr_input = rand(0, 1100);
    let rrest_input = rand(0, 1336);
    console.log(rattr_input);
    console.log(rrest_input);
    $('#asearch-box').empty()
    $.ajax({
        type: "POST",
        url: "/api/arandomDisplay",
        data: { input_give: rattr_input },
        success: function (response) {
            console.log(response)
            let random_searchs = response['arandomDisplay']
            for (let i = 0; i < 4; i++) {
                rattr_input = rattr_input + i
                let title = random_searchs[rattr_input]['title']
                let img = random_searchs[rattr_input]['img']
                let sub_title = random_searchs[rattr_input]['sub_title']
                let item_tags1 = random_searchs[rattr_input]['item_tags1']
                let item_tags2 = random_searchs[rattr_input]['item_tags2']
                let item_tags3 = random_searchs[rattr_input]['item_tags3']
                let sub_item_tag = random_searchs[rattr_input]['sub_item_tag']
                let sub_item_tag2 = random_searchs[rattr_input]['sub_item_tag2']
                let sub_item_tag3 = random_searchs[rattr_input]['sub_item_tag3']
                let sub_item_tag4 = random_searchs[rattr_input]['sub_item_tag4']
                let sub_item_tag5 = random_searchs[rattr_input]['sub_item_tag5']
                if (sub_item_tag == null) {
                    sub_item_tag = '　'
                    sub_item_tag2 = '　'
                    sub_item_tag3 = '　'
                    sub_item_tag4 = '　'
                    sub_item_tag5 = '　'
                } else if (sub_item_tag2 == null) {
                    sub_item_tag2 = ''
                    sub_item_tag3 = ''
                    sub_item_tag4 = ''
                    sub_item_tag5 = ''
                } else if (sub_item_tag3 == null) {
                    sub_item_tag3 = ''
                    sub_item_tag4 = ''
                    sub_item_tag5 = ''
                } else if (sub_item_tag4 == null) {
                    sub_item_tag4 = ''
                    sub_item_tag5 = ''
                }
                else if (sub_item_tag5 == null) {
                    sub_item_tag5 = ''
                }
                let temp_html = `
    <div class=item0>
    <div class="item0_box">
        <img src="${img}" class="item0_img">
        <p class="item0_title">
            ${title}
        </p>
        <p class="item0_sub_title">
            ${sub_title}
        </p>
        <p class="item0_tag">
            ${item_tags1} ${item_tags2} ${item_tags3} 
        </p>
        <p class="item0_sub_tag">
            ${sub_item_tag} ${sub_item_tag2} ${sub_item_tag3} ${sub_item_tag4} ${sub_item_tag5}
        </p>
        <span class="item0_star">별점 표기 예정입니다.⭐️⭐️⭐️⭐️⭐️</span>
    </div>
    </div>
    `
                $('#asearch-box').append(temp_html)
            }
        }
    }
    )
}

function index_search() {
    let input_main = $('#input_search').val()
    window.location.href = '/search?q=' + input_main
}

function enterkey() {
    if (window.event.keyCode == 13) {
        let input_main = $('#input_search').val()
        window.location.href = '/search?q=' + input_main
    }
}

