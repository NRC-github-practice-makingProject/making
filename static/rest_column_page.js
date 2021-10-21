$(document).ready(function () {
    rest_page();
});

function rest_page() {
    $.ajax({
        type: "GET",
        url: "/api/rest",
        data: {},
        success: function (response) {
            console.log(response['rest'])
            let rest = response['rest']

            for (let i = 0 ; i < rest.length ; i ++)
            {
                let title = rest[i]['title']
                let img = rest[i]['img']
                let sub_title = rest[i]['sub_title']
                let item_tags1 = rest[i]['item_tags1']
                let item_tags2 = rest[i]['item_tags2']
                let item_tags3 = rest[i]['item_tags3']
                let sub_item_tag = rest[i]['sub_item_tag']
                let sub_item_tag2 = rest[i]['sub_item_tag2']
                let sub_item_tag3 = rest[i]['sub_item_tag3']
                let sub_item_tag4 = rest[i]['sub_item_tag4']
                let sub_item_tag5 = rest[i]['sub_item_tag5']

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


                let temp_html = `
                <div class="card">
            <img class="card-img-top"
                 src="${img}"
                 alt="Card image cap">
            <p class="card-title">${title}</p>
            <p class="card-text">${sub_title}</p>
            <p class="card-text">${item_tags1} ${item_tags2} ${item_tags3}</p>
            <p class="card-text">${sub_item_tag} ${sub_item_tag2} ${sub_item_tag3} ${sub_item_tag4} ${sub_item_tag5}</p>
            <button> 좋아요 </button>
            <button> 동행 </button>
            <button> 리뷰 </button>
        </div>
        `

                $('#colum_container').append(temp_html)

            }
        }
    })
}
