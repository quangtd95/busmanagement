$(document).ready(function () {
	if ($('#error').val() == 'error'){
		swal({title: 'Bạn chưa chọn vé hoặc điền thông tin',
			text: 'quay lại!',
			type: 'error'
		}).then(function(){
			window.location.replace("/");
		});
	}

	 $('#form3').submit(function (event){
			event.preventDefault();
			 if(!($('#quay').is(':checked')) && (!$('#nganhang').is(':checked'))) { 
			 	swal({title: 'Bạn chưa phương thức thanh toán',
                    text: 'chọn 1!',
                    type: 'error'
                               });
	 	} else {
	 		var token = $("meta[name='_csrf']").attr("content");
			var header = $("meta[name='_csrf_header']").attr("content");
			var urls = "/book/";
			if ($('#quay').is(':checked')) urls +="0" ;else urls +="1";
			var data ={
				none:"hihi"
			};
			$.ajax({
        	type: 'POST',
            url: urls,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            traditional: true,
            beforeSend: function(xhr){
            	xhr.setRequestHeader(header, token);
			},
            success: function(data) {
            	swal({title: 'đặt vé thành công',
                    text: 'check email để xem mã vé của bạn!',
                    type: 'success'
                               }).then(function(){
                                   window.location.replace("/");
                               });
				
			},
			error:function(data){
				swal({title: 'Có lỗi xảy ra',
                    text: 'thử lại sau!',
                    type: 'error'
                               });
				window.location.replace("/");
            }
		});
	 	}
	});
});