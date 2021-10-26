title_ = ''
todate = ''
fromdate = ''

$('.accom_date').pickadate({
    editable: true,
    monthsFull: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
    formatSubmit: 'yyyy-mm-dd',
    format: 'yyyy-mm-dd',
    min: new Date()
})

function accom0_write() {
    let text = $('#accom0_content').val()
    let text_ = text.replace(/\n+/g, "<br>")
        $.ajax({
            type: "POST",
            url: "/api/accom_write",
            data: {title_give:title_,user_give:user_id,text_give:text_,fromdate_give:fromdate,todate_give:todate},		
            success: function(response){	
                if (response['result'] == 'success'){
                    alert(response['msg'])
                    window.location.reload()
                }else {
                    alert(response['msg'])
                }
            },
        })
    $('#accom_refer').hide()
    document.getElementById('popup2').checked = true;
    $('#accom_show').show()
}

function accom0_show(title){
    title_ = title
    check_ = Logincheck()
    if (check == 'true') {
        document.getElementById('popup1').checked = true;
        $('#accom_refer').show()
    } else {
    alert('로그인이 필요한 서비스입니다.')
    window.location.href = '/login'
    }
}

function accom0_show_content() {
    document.getElementById('popup2').checked = true;
    document.getElementById('popup1').checked = false;
    $('#accom_show').show()
    $('#accom_refer').hide()
    $('#accom0_in').empty()
    todate = $('#accom_todate').val()
    fromdate = $('#accom_fromdate').val()
    $.ajax({
        type: "POST",
        url: "/api/accom_show",
        data: {title_give:title_,todate_give:todate,fromdate_give:fromdate},		
       success: function(response){	
            if (response['result'] == 'success'){
                console.log(response['accom'])
                    let accom = response['accom']
                    for(let i=0; i < accom.length ; i++){
                        let accom_name = accom[i]['name']
                        let accom_text = accom[i]['text']
                        let accom_age = accom[i]['age']
                        let accom_id = accom[i]['id']
                        let accom_phone = accom[i]['phone']
                        let accom_todate = accom[i]['todate']
                        let accom_fromdate = accom[i]['fromdate']
                        
                        let temp_html = `<p class="from-them">${accom_id}<br>
                        ${accom_name} | ${accom_age} | ${accom_phone}<br>
                        ${accom_todate} ~ ${accom_fromdate} 일정<br>
                        ${accom_text}</p>`
                        
                        $('#accom0_in').append(temp_html)
                        $('#accom_date').empty()
                        $('#accom_time').empty()
                    }
                } else {
                    alert('Loding Error')
                }
        }
    })                               
}



