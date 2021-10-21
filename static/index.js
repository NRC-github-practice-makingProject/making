$(document).ready(function () {
    Logincheck();
});

function Logincheck() {
    user = localStorage.getItem('id')
    st = localStorage.getItem('st')
    if (user == null || st != 1){
        $('#ID0').hide()
        $('#LOGOUT0').hide()
    } else {
        user_add = `${user} 님 안녕하세요!`
        $('#ID0').append(user_add)
        $('#LOGIN0').hide()
        $('#LOGOUT0').show()
    }
}
function logout() {
    var st = localStorage.getItem('st')
    let id = localStorage.getItem('id')

    $.ajax({
        type: "POST",
        url: "/logout",
        data: {st_give:st,id_give:id},		
        success: function(response){		
            localStorage.clear()
            window.location.reload()
        },
})
}
