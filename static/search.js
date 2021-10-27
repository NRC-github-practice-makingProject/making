
        function getParameter(strParamName) {
            var arrResult = null;
            if (strParamName) {
                arrResult = location.search.match(new RegExp("[&?]" + strParamName + "=(.*?)(&|$)"));
                return arrResult && arrResult[1] ? arrResult[1] : null;
            }
        }

        var p_name = getParameter("q");
        // alert('input : ' +  p_name );
        var parasearch_input = decodeURIComponent(p_name);

        $('input[name=q]').attr('value', 1);
        $('input[name=q]').attr('value', parasearch_input);
        // var p_age = getParameter("age");
        // alert('Name : ' + p_name + ' / Age :' + p_age); 

        $(document).ready(function () {
            if (parasearch_input == null) {
                $('input[name=q]').attr('value', '');
            } else {
                $('input[name=q]').attr('value', parasearch_input);
            }
            showSearches_R()

            // $("#input_search").keypress()
        });

        function showSearches_R() {

            let input = parasearch_input
            $('#search-box').empty()
            $.ajax({
                type: "POST",
                url: "/api/search",
                data: { input_give: input },
                success: function (response) {
                    console.log(response)
                    let jeju_searchs = response['jeju_search']

                    for (let i = 0; i < jeju_searchs.length; i++) {
                        let title = jeju_searchs[i]['title']
                        let img = jeju_searchs[i]['img']
                        let sub_title = jeju_searchs[i]['sub_title']
                        let item_tags1 = jeju_searchs[i]['item_tags1']
                        let item_tags2 = jeju_searchs[i]['item_tags2']
                        let item_tags3 = jeju_searchs[i]['item_tags3']
                        let sub_item_tag = jeju_searchs[i]['sub_item_tag']
                        let sub_item_tag2 = jeju_searchs[i]['sub_item_tag2']
                        let sub_item_tag3 = jeju_searchs[i]['sub_item_tag3']
                        let sub_item_tag4 = jeju_searchs[i]['sub_item_tag4']
                        let sub_item_tag5 = jeju_searchs[i]['sub_item_tag5']

                        if (sub_item_tag == null) {
                            sub_item_tag = '　'
                            sub_item_tag2 = '　'
                            sub_item_tag3 = '　'
                            sub_item_tag4 = '　'
                            sub_item_tag5 = '　'
                        } else if (sub_item_tag2 == null) {
                            sub_item_tag2 = ''
                            sub_item_tag3 = ''
                            sub_item_tag4 = ''
                            sub_item_tag5 = ''
                        } else if (sub_item_tag3 == null) {
                            sub_item_tag3 = ''
                            sub_item_tag4 = ''
                            sub_item_tag5 = ''
                        } else if (sub_item_tag4 == null) {
                            sub_item_tag4 = ''
                            sub_item_tag5 = ''
                        }
                        else if (sub_item_tag5 == null) {
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
                        $('#search-box').append(temp_html)

                    }
                }

            })

        }


        function showSearches() {

            let input = $('#input_search').val()
            $('#search-box').empty()
            $.ajax({
                type: "POST",
                url: "/api/search",
                data: { input_give: input },
                success: function (response) {
                    console.log(response)
                    let jeju_searchs = response['jeju_search']

                    for (let i = 0; i < jeju_searchs.length; i++) {
                        let title = jeju_searchs[i]['title']
                        let img = jeju_searchs[i]['img']
                        let sub_title = jeju_searchs[i]['sub_title']
                        let item_tags1 = jeju_searchs[i]['item_tags1']
                        let item_tags2 = jeju_searchs[i]['item_tags2']
                        let item_tags3 = jeju_searchs[i]['item_tags3']
                        let sub_item_tag = jeju_searchs[i]['sub_item_tag']
                        let sub_item_tag2 = jeju_searchs[i]['sub_item_tag2']
                        let sub_item_tag3 = jeju_searchs[i]['sub_item_tag3']
                        let sub_item_tag4 = jeju_searchs[i]['sub_item_tag4']
                        let sub_item_tag5 = jeju_searchs[i]['sub_item_tag5']

                        if (sub_item_tag == null) {
                            sub_item_tag = '　'
                            sub_item_tag2 = '　'
                            sub_item_tag3 = '　'
                            sub_item_tag4 = '　'
                            sub_item_tag5 = '　'
                        } else if (sub_item_tag2 == null) {
                            sub_item_tag2 = ''
                            sub_item_tag3 = ''
                            sub_item_tag4 = ''
                            sub_item_tag5 = ''
                        } else if (sub_item_tag3 == null) {
                            sub_item_tag3 = ''
                            sub_item_tag4 = ''
                            sub_item_tag5 = ''
                        } else if (sub_item_tag4 == null) {
                            sub_item_tag4 = ''
                            sub_item_tag5 = ''
                        }
                        else if (sub_item_tag5 == null) {
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
                        $('#search-box').append(temp_html)

                    }
                }




            })

        }
