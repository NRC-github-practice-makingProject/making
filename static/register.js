function register(){
    let id=$('#ID').val()
    let email=$('#EMAIL').val()
    let name=$('#NAME').val()
    let phone=$('#PHONE').val()
    let age=$('#AGE').val()
    let password=$('#PASSWORD').val()
    let re_password=$('#RE_PASSWORD').val()
    console.log(name,phone)
    $.ajax({
        type: "POST",
        url: "/register",
        data: {id_give:id,email_give:email,name_give:name,phone_give:phone,age_give:age,password_give:password,re_password_give:re_password},		
        success: function(response){		

            console.log(response)
            if (response['result'] =='fail' )
            {
                alert(response['msg'])
            } else {
                alert(response['msg'])
                history.back(-2)
            }
        },
    })

}


