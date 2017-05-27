$(document).ready(function () {
	

	$('#form2').submit(function (event){
		event.preventDefault();

		var token = $("meta[name='_csrf']").attr("content");
		var header = $("meta[name='_csrf_header']").attr("content");

		var data= {
			name: $("#hoten").val(),
			birthDay: $("#ngaysinh").val(),
            cardId: $("#cmnd").val(),
            address: $("#diachi").val(),
            email:$("#email").val(),
            telephone:$("#dienthoai").val(),
            numberOfTickets:$("#number").val(),
            idTicket:$("#ticketId").val()
		};

        $.ajax({
        	type: 'POST',
            url: window.location.pathname,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            traditional: true,
            beforeSend: function(xhr){
            	xhr.setRequestHeader(header, token);
			},
            success: function(data) {
				
			},
			error:function(data){
				swal({
                	title: 'Thất bại',
                    text: data.responseText,
                    type: 'error'
                    });
            }
		});
                   });
});