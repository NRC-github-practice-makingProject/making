function login() {
    let user_id = $('#user_id').val();
    let user_pw = $('#user_pw').val();

    const user = []

    $.ajax({
        type: "POST",
        url: "/login",
        data: {user_id_give:user_id,user_pw_give:user_pw},		
        success: function(response){	
            if (response['result']=='success'){
                id = response['user_id']
                st = response['status']
                localStorage.setItem('id',id)
                localStorage.setItem('st',st)

                window.location.href='/'
            } else {
                alert(response['msg'])
            }
            

        },
})
    
}
