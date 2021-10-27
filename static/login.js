function login() {
    let user_id = $('#user_id').val();
    let user_pw = $('#user_pw').val();


    $.ajax({
        type: "POST",
        url: "/login",
        data: {user_id_give:user_id,user_pw_give:user_pw},		
        success: function(response){	
            if (response['result']=='success'){
                history.back();
                Logincheck();
            } else {
                alert(response['msg'])
            }
            

        },
})
    
}
