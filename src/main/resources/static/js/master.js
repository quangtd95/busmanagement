
$(window).on("load resize ", function() {
  var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
  $('.tbl-header').css({'padding-right':scrollWidth});
}).resize();

$(document).ready(function () {
    console.log('thís');
    if (getUrlParameter("true") != null) {
        swal(
            'Welcome!',
            'Đăng nhập thành công',
            'success'
        ).then(function () {
            location.href=location.href.replace("?true", "");
        });
    }
});
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

