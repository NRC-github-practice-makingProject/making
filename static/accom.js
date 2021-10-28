location_ = ''
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
            data: {location_give:location_,user_give:user_id,text_give:text_,fromdate_give:fromdate,todate_give:todate},		
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

function accom0_show(){
    check_ = Logincheck()
    if (check == 'true') {
        if ($('#location_').val() == '' || $('#accom_todate').val() == '' || $('#accom_fromdate').val() == ''){
            alert('빈칸을 입력해주세요')
            return
        }else{
        $('#accom_refer').show()
        $('#accom0_send').removeAttr('onclick')
        $('#accom0_send').attr('onclick','accom0_write()')
        accom0_show_content()
        }
    } else {
    alert('로그인이 필요한 서비스입니다.')
    window.location.href = '/login'
    }
}

function back() {
    accom0_show_content()
    $('#back').hide()
}

recount = 1
function accom0_show_content() {
    document.getElementById('popup2').checked = true;
    $('#accom_show').show()
    $('#accom0_in').empty()
    $('#accom0_content').val('')
    location_ = $('#location_').val()
    
    todate = $('#accom_todate').val()
    fromdate = $('#accom_fromdate').val()
    $.ajax({
        type: "POST",
        url: "/api/accom_show",
        data: {location_give:location_,todate_give:todate,fromdate_give:fromdate},		
        success: function(response){	
            if (response['result'] == 'success'){
                    let accom = response['accom']
                    for(let i=0; i < accom.length ; i++){
                        let accom_name = accom[i]['name']
                        let accom_text = accom[i]['text']
                        let accom_age = accom[i]['age']
                        let accom_id = accom[i]['id']
                        let accom_phone = accom[i]['phone']
                        let accom_todate = accom[i]['todate']
                        let accom_fromdate = accom[i]['fromdate']
                        let accom_count = accom[i]['count']
                        recount = accom[i]['recount']
                        
                        let temp_html = `<p class="from-them">${accom_id}<br>
                        ${accom_name} | ${accom_age} | ${accom_phone}<br>
                        ${accom_fromdate} ~ ${accom_todate} 일정<br>
                        ${accom_text}<br>
                        <span onclick="accom_modi('${accom_count}','${location_}','${recount}','${accom_text}')">동행수정</span> | <span onclick="accom_del('${accom_count}','${location_}','${accom_text}')">삭제</span><br>
                        <span onclick="accom0_in_show_content('${accom_count}','${location_}')">📌참가 신청하기</span></p>`                                                         
                        
                        $('#accom0_in').append(temp_html)
                    }
                } else {
                    alert('Loding Error')
                }
        }
    })                               
}

in_count = 0
accom_recount = 1
function accom0_in_show_content(count,location_) {
    $('#accom0_in').empty()
    $('#accom0_content').val('')
    $('#back').show()
    in_count = count
    location_ = $('#location_').val()
    $.ajax({
        type: "POST",
        url: "/api/accom_in_show",
        data: {location_give:location_,count_give:count},		
        success: function(response){	
            if (response['result'] == 'success'){
                    let accom = response['accom']
                    
                    for(let i=0; i < accom.length ; i++){
                        let accom_name = accom[i]['name']
                        accom_text = accom[i]['text']
                        let accom_age = accom[i]['age']
                        let accom_id = accom[i]['id']
                        let accom_phone = accom[i]['phone']
                        let accom_todate = accom[i]['todate']
                        let accom_fromdate = accom[i]['fromdate']
                        accom_recount = accom[i]['recount']
                        if (accom_recount===0){
                            let temp_html = `<p class="from-them">${accom_id}<br>
                        ${accom_name} | ${accom_age} | ${accom_phone}<br>
                        ${accom_fromdate} ~ ${accom_todate} 일정<br>
                        ${accom_text}<br>
                        <span onclick="accom_modi('${in_count}','${location_}','${accom_recount}','${accom_text}')">동행수정</span> | <span onclick="accom_in_del('${in_count}','${location_}','${accom_recount}','${accom_text}')">삭제</span><br>`
                        
                        $('#accom0_in').append(temp_html)

                        }else{
                            let temp_html = `<p class="from-me">${accom_id}<br>
                            ${accom_name} | ${accom_age} | ${accom_phone}<br>
                            ${accom_todate} ~ ${accom_fromdate} 일정<br>
                            ${accom_text}<br>
                            <span2 onclick="accom_modi('${in_count}','${location_}','${accom_recount}','${accom_text}')">동행수정</span2> | <span2 onclick="accom_in_del('${in_count}','${location_}','${accom_recount}','${accom_text}')">삭제</span2><br>`
                            
                            $('#accom0_in').append(temp_html)
                        }
                        
                    }
                } else {
                    alert('Loding Error')
                }
        }
    })   
    $('#accom0_send').removeAttr('onclick')
    $('#accom0_send').attr('onclick','accom0_in_write()')                            
}


function accom0_in_write() {
    let text = $('#accom0_content').val()
    text_ = text.replace(/\n+/g, "<br>")
        $.ajax({
            type: "POST",
            url: "/api/accom_in_write",
            data: {location_give:location_,user_give:user_id,text_give:text_,fromdate_give:fromdate,todate_give:todate,count_give:in_count},	
            success: function(response){	
                if (response['result'] == 'success'){
                    alert(response['msg'])
                    $('#accom0_send').removeAttr('onclick')
                    $('#accom0_send').attr('onclick','accom0_write()')
                    window.location.reload()
                }else {
                    alert(response['msg'])
                }
            },
        })
}


modi_count
recount_
function accom_modi(count,location_,recount,text) {
    id_ = user_id
    modi_count = count
    recount_ = recount 
    $.ajax({
        type: "POST",
        url: "/api/accom_modi",
        data: {count_give:count,id_give:id_,location_give:location_,recount_give:recount_,text_give:text},		
        success: function(response){	
            if (response['result'] == 'success'){
                modi = response['modi']
                text_ = modi['text']
                $('#accom0_content').val(text_)
                $('#accom0_send').removeAttr('onclick')
                $('#accom0_send').attr('onclick','accom_modi_write()')

                }else {
                alert(response['msg'])
            }
        },
    })    
}

function accom_modi_write(){
    let modi_text = $('#accom0_content').val()
        let modi_text_ = modi_text.replace(/\n+/g, "<br>")
        $.ajax({
            type: "POST",
            url: "/api/accom_modi_write",
            data: {location_give:location_,text_give:text_,modi_text_give:modi_text_,count_give:modi_count,recount_give:recount_},		
            success: function(response){	
                if (response['result'] == 'success'){
                    alert(response['msg'])
                    $('#accom0_send').removeAttr('onclick')
                    $('#accom0_send').attr('onclick','accom_write()')
                    window.location.reload()
                }else {
                    alert(response['msg'])
                }
            },
        })
}


function accom_del(count,location_,text) {
    id = user_id
    $.ajax({
        type: "POST",
        url: "/api/accom_del",
        data: {count_give:count,id_give:id,location_give:location_,text_give:text},		
        success: function(response){	
            if (response['result'] == 'success'){
                alert(response['msg'])
                window.location.reload()
            }else {
                alert(response['msg'])
            }
        },
    })
}


function accom_in_del(count,location_,recount,text) {
    id = user_id
    $.ajax({
        type: "POST",
        url: "/api/accom_in_del",
        data: {count_give:count,id_give:id,location_give:location_,text_give:text,recount_give:recount},		
        success: function(response){	
            if (response['result'] == 'success'){
                alert(response['msg'])
                window.location.reload()
            }else {
                alert(response['msg'])
            }
        },
    })
}
