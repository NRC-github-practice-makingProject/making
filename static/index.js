user_id = ''
$(document).ready(function () {
    Logincheck();
    $('#accom_show').hide()
    $('#accom_refer').show()
    $("html, body").animate({ scrollTop: 0 }, "slow"); 
    $('#back').hide()

});
check = ''

function Logincheck() {
    $.ajax({
        type: "GET",
        url: "/api/login_check",
        data: {},		
        success: function(response){		
            if (response['status'] == 'login'){
            $('#ID0').empty()
            user_id = response['user_id']
            user_name = response['name']
            temp_html = `${user_name}님 안녕하세요!`
            $('#ID0').append(temp_html)
            $('#LOGIN0').text('로그아웃')
            $('#LOGIN0').prop('href','/logout')
            check = 'true'
            } else {
            $('#LOGIN0').text('로그인')
            $('#LOGIN0').prop('href','/login')
            check = 'false'
            }
        }, 
})
}


