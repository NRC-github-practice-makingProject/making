user_id = ''
$(document).ready(function () {
    Logincheck();
});

function Logincheck() {
    $.ajax({
        type: "GET",
        url: "/api/login_check",
        data: {},		
        success: function(response){		
            if (response['status'] == 'login'){
            user_id = response['user_id']
            temp_html = `${user_id}님 안녕하세요!`
            $('#ID0').append(temp_html)
            $('#LOGIN0').text('로그아웃')
            $('#LOGIN0').prop('href','/logout')
            } else {
            $('#LOGIN0').text('로그인')
            $('#LOGIN0').prop('href','/login')
            }
        }, 
})
}
