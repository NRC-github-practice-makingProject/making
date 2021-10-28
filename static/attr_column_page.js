$(document).ready(function () {
    attr_page();
    $('#popup_auth').hide()
});

var count = 0

function attr_page() {
    $.ajax({
        type: "POST",
        url: "/api/attr",
        data: {count_give:count},
        success: function (response) {
            let attr = response['attr']
            for (let i = 0 ; i < attr.length ; i ++)
            {
                let title = attr[i]['title']
                let img = attr[i]['img']
                let sub_title = attr[i]['sub_title']
                let item_tags1 = attr[i]['item_tags1']
                let item_tags2 = attr[i]['item_tags2']
                let item_tags3 = attr[i]['item_tags3']
                let sub_item_tag = attr[i]['sub_item_tag']
                let sub_item_tag2 = attr[i]['sub_item_tag2']
                let sub_item_tag3 = attr[i]['sub_item_tag3']
                let sub_item_tag4 = attr[i]['sub_item_tag4']
                let sub_item_tag5 = attr[i]['sub_item_tag5']
                let like = attr[i]['like']

                if (sub_item_tag == null ){
                    sub_item_tag = '　'
                    sub_item_tag2 = '　'
                    sub_item_tag3 = '　'
                    sub_item_tag4 = '　'
                    sub_item_tag5 = '　'   
                } else if (sub_item_tag2 == null ){
                    sub_item_tag2 = ''
                    sub_item_tag3 = ''
                    sub_item_tag4 = ''
                    sub_item_tag5 = ''
                } else if (sub_item_tag3 == null ){
                    sub_item_tag3 = ''
                    sub_item_tag4 = ''
                    sub_item_tag5 = ''
                } else if (sub_item_tag4 == null ){
                    sub_item_tag4 = ''
                    sub_item_tag5 = ''
                }
                else if (sub_item_tag5 == null ){
                    sub_item_tag5 = ''
                }
                if (like == 0) {
                    like = '　'
                }
                
                
                let temp_html = `
                <div class="card" id="card_${i}">
            <img class="card-img-top"
                 src="${img}"
                 alt="Card image cap">
            <p class="card-title">${title}</p>
            <p class="card-text">${sub_title}</p>
            <p class="card-text">${item_tags1} ${item_tags2} ${item_tags3}</p>
            <p class="card-text">${sub_item_tag} ${sub_item_tag2} ${sub_item_tag3} ${sub_item_tag4} ${sub_item_tag5}</p>
            <button class="card_like" onclick="attr_like('${title}')"> 좋아요 <br><span style="color:red;">${like} </span></br></button>
            <button class="card_review" onclick="review0_show('${title}')"> 리뷰 </button>
        </div>
        </div>
        `
                $('#colum_container').append(temp_html)

            }
        }
    })
    count += 8;
}

function attr_like(title){
    $.ajax({
        type: 'POST',
        url: '/api/attr_like',
        data: {title_give: title},
        success: function (response) {
            alert(response['msg'])
            window.location.reload()
        }
    });

}


$(window).on("scroll", function() {
	var scrollHeight = $(document).height();
	var scrollPosition = $(window).height() + $(window).scrollTop();		

	$("#scrollHeight").text(scrollHeight);
	$("#scrollPosition").text(scrollPosition);
	$("#bottom").text(scrollHeight - scrollPosition);

	if (scrollPosition > scrollHeight -1) {			
		attr_page()
	}
});