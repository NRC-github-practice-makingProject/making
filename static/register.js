function register(){
    let id=$('#ID').val()
    let email=$('#EMAIL').val()
    let password=$('#PASSWORD').val()
    let re_password=$('#RE_PASSWORD').val()

    $.ajax({
        type: "POST",
        url: "/register",
        data: {id_give:id,email_give:email,password_give:password,re_password_give:re_password},		
        success: function(response){		

            console.log(response)
            if (response['result'] =='fail' )
            {
                alert(response['msg'])
            } else {
                alert(response['msg'])
                window.location.href='/login'
            }
        },
    })

}


