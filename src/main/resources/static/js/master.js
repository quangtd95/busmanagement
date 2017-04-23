$(window).on("load resize ", function () {
    var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
    $('.tbl-header').css({'padding-right': scrollWidth});
}).resize();

$(document).ready(function () {
    if (getUrlParameter("true") != null) {
        swal(
            'Welcome!',
            'Đăng nhập thành công',
            'success'
        ).then(function () {
            location.href = location.href.replace("?true", "");
        });
    }
    $("#home-search-form").submit(function (event) {
        event.preventDefault();
        myUrl = window.location.pathname;
        myUrl +='?source=';
        myUrl +=$('#searchSource').val(),
            myUrl +='&destination=';
        myUrl +=$('#searchDestination').val(),
            myUrl +='&busService=';
        myUrl +=$('#searchBusService').val(),
        console.log(myUrl);
       window.location.replace(myUrl);
    });
});


function call_ajax_to_search() {
    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
    $.ajax({
        url: '/search',
        type: 'GET',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        data: jQuery.param(
            {
                source: $('#searchSource').val(),
                destination: $('#searchDestination').val(),
                busService: $('#searchBusService').val()
            }),
        beforeSend: function (xhr) {
            xhr.setRequestHeader(header, token);
        },
        success: function (data) {
            console.log(data);
        },
        error: function (data) {
            swal('Oops...',
                'Có lỗi xảy ra hoặc code viết chưa xong :))!',
                'error');
            console.log(data);
        }
    });

}

function showWelcomeLoginSuccess() {
    swal(
        'Welcome!',
        'Đăng nhập thành công',
        'success'
    ).then(function () {
        location.href = location.href.replace("?true", "");
    });
}
function logout() {
    swal({
        title: 'Đăng xuất?',
        text: "Bạn sẽ không còn quyền admin!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đăng xuất ngay!'
    }).then(function () {
        window.location.replace("/logout");
    })
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

