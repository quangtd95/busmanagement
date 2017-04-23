$(window).on("load resize ", function() {
    var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
    $('.tbl-header').css({'padding-right':scrollWidth});
}).resize();

$(document).ready(function () {
    if (getUrlParameter("true") != null) {
        showWelcomeLoginSuccess();
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
            window.location.replace(myUrl);
    });

    $('#delete-button').click(function() {
        var delete_ids = findDeleteIds();

        console.log(delete_ids);

        if (delete_ids.length == 0) alert("You haven't choosen any row");
        else {

            var token = $("meta[name='_csrf']").attr("content");
            var header = $("meta[name='_csrf_header']").attr("content");

            $.ajax({
                type: 'POST',
                url: '/busroute/delete',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify(delete_ids),
                traditional: true,
                beforeSend: function(xhr){
                    xhr.setRequestHeader(header, token);
                },
                complete: function(data) {
                    window.location.replace("/");
                    console.log(data);
                    alert(data.responseText);
                }
            });
        }

    });
});

function findDeleteIds() {
    var delete_ids = [];
    var table = document.getElementById("table-busroute-today");
    for(var i = 0, row; row = table.rows[i]; i++) {
        var check_button  = row.getElementsByTagName("td")[row.cells.length - 1].getElementsByTagName('input')[0];
        var first_cell = row.getElementsByTagName("td")[0];

        if (check_button.checked == true) delete_ids.push(parseInt(first_cell.textContent));
    }
    return delete_ids;
}

function showWelcomeLoginSuccess() {
    swal(
        'Welcome!',
        'Đăng nhập thành công',
        'success'
    ).then(function () {
        location.href=location.href.replace("?true", "");
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


