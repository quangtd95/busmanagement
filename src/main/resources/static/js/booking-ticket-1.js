$(document).ready(function () {
	
	var ngaydi = $('#ngaydi').val();
	$('#ngaydi').val(ngaydi.substring(0,10));
	$('#giodi').val(ngaydi.substring(10,ngaydi.length));

	 $('#soluongve').on('input',function(e){
    	$('#tongtien').val($("#giave").val() * $('#soluongve').val());
    });
	 
	 $('#form1').submit(function (event){
	 	event.preventDefault();
	 	if ($('#soluongve').val() == 0){
	 		  swal({title: 'Bạn chưa chọn vé',
                    text: 'chọn ít nhất 1 vé!',
                    type: 'error'
                               });
	 	}
	 	else {
	 		myUrl = window.location.pathname;
	        myUrl +='/';
	        myUrl +=$('#soluongve').val();
	        window.location.replace(myUrl);	
	 	}
	 });
});