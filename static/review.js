star = 3
title_ = ""

$(".mystars").starRating({
    initialRating:3 ,
    starSize: 30,
    emptyColor: '#bdc3c7',
    hoverColor: '#ffa502',
    useGradient: false,
    strokeWidth: 0,
    starShape: 'rounded',
    ratedColor: 'gold',
    disableAfterRate: false,
    callback: function(currentRating){
        star = currentRating
    }});


function review_write() {
        let text = $('#review0_content').val()
        var date = new Date();
        let date_s = date.getDate()
        let month = (date.getMonth() +1)
        let year = date.getFullYear()
        let date_ = year + '-' + month + '-' + date_s
        let text_ = text.replace(/\n+/g, "<br>")
        $.ajax({
            type: "POST",
            url: "/api/review_write",
            data: {title_give:title_,user_give:user_id,text_give:text_,star_give:star,date_give:date_},		
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



function review0_show(title) {
    check_ = Logincheck()
    title_ = title
    if (check == 'true') {
            document.getElementById('popup0').checked = true;
            $('#review0_in').empty()
            $.ajax({
                type: "POST",
                url: "/api/review_show",
                data: {title_give:title},		
                success: function(response){	
                    if (response['result'] == 'success'){
                            let review = response['review']
                            for(let i=0; i < review.length ; i++){
                                let review_id = review[i]['user_id']
                                let review_text = review[i]['text']
                                let review_star = review[i]['star']
                                let review_date = review[i]['date']
                                if (review_star == '1'){
                                    review_star = '⭐️'
                                }else if (review_star == '1.5' || review_star == '2'){
                                    review_star = '⭐️⭐️'
                                }else if (review_star == '2.5' || review_star == '3'){
                                    review_star = '⭐️⭐️⭐️'
                                }else if (review_star == '3.5' || review_star == '4'){
                                    review_star = '⭐️⭐️⭐️⭐️'
                                }else{
                                    review_star = '⭐️⭐️⭐️⭐️⭐️'
                                }

                                let temp_html = `<p class="from-them">${review_star}<br>
                                ${review_id} | ${review_date}<br>
                                ${review_text}</p>`
                                
                                $('#review0_in').append(temp_html)
                                setTimeout(() => {}, 3000)

                                $('#popup_auth').show()
                            }
                        } else {
                            alert('Loding Error')
                        }
                }
            })                                
    } else {
        alert('로그인이 필요한 서비스입니다.')
        window.location.href = '/login'
    }
}

