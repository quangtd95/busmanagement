$(window).on("load resize ", function() {
    var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
    $('.tbl-header').css({'padding-right':scrollWidth});
}).resize();

$(document).ready(function () {
	
	var message = $("#message").val();
	console.log(message);
	if (message==""){
		
	} else if (message=="empty!"){
		 swal({
             title: 'Oops',
             text: "không tìm thấy kết quả nào!",
             type: 'error'
         });
	} else {
		 swal({
             title: 'Đã tìm thấy',
             text: message,
             type: 'success'
         });
	}

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

    
    
    ///////////
    $(function() {
        procDateTime();
        closeDialog();

        $(".dropdown").on("mouseover", function() {$(this).addClass("open");});  
        $(".dropdown").on("mouseleave", function() {$(this).removeClass("open");});

        $( "input[name=bus-route-select-all]" ).on( "click", function() {
            if ($(this). prop("checked") == true) {
                $(".table-content tr").addClass('table-row-selected');
            }
            else {
                $(".table-content tr").removeClass('table-row-selected');
            }
            $(".table-content input:checkbox").prop('checked', $(this).prop("checked"));
        });

        $(".table-content input:checkbox").on( "click", function() {
            if ($(this). prop("checked") == true) {
                $(this).closest('tr').addClass('table-row-selected');
            }
            else {
                $(this).closest('tr').removeClass('table-row-selected');
            }
        });

        $( "#home-add-bus-route-btn" ).button().on( "click", function() {        	
            $("#home-dialog").removeClass('dialog-close').addClass('dialog-open');
            $("#home-dialog-add-btn").show();
            $("#home-dialog-cancel-btn").show();
            $("#add-bus-route").show();

            /////////////EVENT////////////////////
            $("#home-dialog-add-btn").on('click',function(){
            	
            	// validate
                $("#dialog-form").validate({
            		rules:{
            			name_home_dialog_destination: { 
            				required: true,
            				maxlength: 100
            			}, 
            			name_home_dialog_departure_day: {
            				required: true,
            				dateITA: true,
            				maxlength: 100
            			}, 
            			name_home_dialog_departure_time: {
            				required: true,
            				time: true, 
            				maxlength: 100
            			}, 
            			name_home_dialog_arrival_day: {
            				required: true,
            				dateITA: true, 
            				maxlength: 100
            			}, 
            			name_home_dialog_arrival_time: {
            				required: true,
            				time: true, 
            				maxlength: 100
            			}, 
            			name_home_dialog_bus_service: { 
            				required: true, 
            				maxlength: 100
            			}, 
            			name_home_dialog_bus_service_destination: { 
            				required: true, 
            				maxlength: 100
            			}, 
            			name_home_dialog_ticket_price: {
            				required: true, 
            				digits: true, 
            				maxlength: 100
            			}, 
            			name_home_dialog_total_ticket: {
            				required: true, 
            				digits: true,
            				range: [10, 80], 
            				maxlength: 100
            			}
            		}, 
            		messages: {
            			name_home_dialog_destination: { 
            				required: "must fill",
            				maxlength: "maxlen 100"
            			},
            			name_home_dialog_departure_day: {
            				required: "must fill",
            				dateITA: "dd/mm/yyyy", 
            				maxlength: "maxlen 100"
            			}, 
            			name_home_dialog_departure_time: {
            				required: "must fill",
            				time: "hh:mm", 
            				maxlength: "maxlen 100"
            			}, 
            			name_home_dialog_arrival_day: {
            				required: "must fill",
            				dateITA: "dd/mm/yyyy", 
            				maxlength: "maxlen 100"
            			}, 
            			name_home_dialog_arrival_time: {
            				required: "must fill",
            				time: "hh:mm", 
            				maxlength: "maxlen 100"
            			}, 
            			name_home_dialog_bus_service: { 
            				required: "must fill", 
            				maxlength: "maxlen 100"
            			}, 
            			name_home_dialog_bus_service_destination: { 
            				required: "must fill",
            				maxlength: "maxlen 100"
            			}, 
            			name_home_dialog_ticket_price: {
            				required: "must fill",
            				digits: "integer", 
            				maxlength: "maxlen 100"
            			}, 
            			name_home_dialog_total_ticket: {
            				required: "must fill",
            				digits: "integer",
            				range: "10 to 80", 
            				maxlength: "maxlen 100"
            			}
            		},
            		submitHandler: function(form) {
                        var token = $("meta[name='_csrf']").attr("content");
                        var header = $("meta[name='_csrf_header']").attr("content");
                        
                        var data= {
                          source: "Đà Nẵng-Bến xe TT Đà nẵng",
                           destination:$("#home-dialog-destination").val(), // Nơi đến: Sài Gòn 
                           busServiceDestination: $("#home-dialog-bus-service-destination").val(), // Bến xe: Bến xe Miền Đông  
                           busService:$("#home-dialog-bus-service").val(),	// Nhà xe: ABC 
                           departureTime: $("#home-dialog-departure-time").val(), // Giờ đi: 7:30   
                           departureDate: $("#home-dialog-departure-day").val().replace(/\//g, '-'), // Ngày đi: 21-05-1995 
                           arrivalTime: $("#home-dialog-arrival-time").val(), // Giờ đến: 8:30  
                           arrivalDate: $("#home-dialog-arrival-day").val().replace(/\//g, '-'), // Ngày đến: 21-05-1995
                           ticketPrice: $("#home-dialog-ticket-price").val(), // Giá tiền: 69000 
                           totalTickets: $("#home-dialog-total-ticket").val(), // Tổng số vé: 30
                       };
                       $.ajax({
                           type: 'POST',
                           url: '/busroute/add',
                           contentType: "application/json; charset=utf-8",
                           dataType: "json",
                           data: JSON.stringify(data),
                           traditional: true,
                           beforeSend: function(xhr){
                               xhr.setRequestHeader(header, token);
                           },
                           success: function(data) {

                               
                               swal({
                                   title: 'Thành công',
                                   text: data.responseText,
                                   type: 'success'
                               }).then(function(){
                                   window.location.replace("/");
                               })
                               
                               window.location.reload();

                           },
                           error:function(data){
                              alert(data.responseText);
                              window.location.reload();
                          }
                      });
            		}
            	});
            	
          });

            /////////////EVENT////////////////////
        });

        $( "#home-edit-bus-route-btn" ).button().on( "click", function() {
            var cntCheckbox = $(".table-content input:checkbox:checked").length;
            var id;
            if (cntCheckbox != 1) {
                if (cntCheckbox > 1) $("#delete-bus-route h4").html("Không chọn nhiều hơn 1 tuyến xe để sửa!");
                else $("#delete-bus-route h4").html("Phải chọn 1 tuyến xe để có thể sửa!");
                $("#home-dialog-ok-btn").show();
                $("#delete-bus-route").show();
            } 
            else {
                id = $('.table-content input:checkbox:checked').closest('tr').find('td:nth-child(1)').text();
                
                $("#home-dialog-destination").val($('.table-content input:checkbox:checked').closest('tr').find('td:nth-child(5) > span:nth-of-type(1) > span:nth-of-type(1)').text());
                $("#home-dialog-departure-day").val($('.table-content input:checkbox:checked').closest('tr').find('td:nth-child(4) > span:nth-of-type(2) > span:nth-of-type(2)').text());
                $("#home-dialog-departure-time").val($('.table-content input:checkbox:checked').closest('tr').find('td:nth-child(4) > span:nth-of-type(2) > span:nth-of-type(1)').text());
                $("#home-dialog-arrival-day").val($('.table-content input:checkbox:checked').closest('tr').find('td:nth-child(5) > span:nth-of-type(2) > span:nth-of-type(2)').text());
                $("#home-dialog-arrival-time").val($('.table-content input:checkbox:checked').closest('tr').find('td:nth-child(5) > span:nth-of-type(2) > span:nth-of-type(1)').text());
                $("#home-dialog-bus-service").val($('.table-content input:checkbox:checked').closest('tr').find('td:nth-child(3)').text());
                $("#home-dialog-bus-service-destination").val($('.table-content input:checkbox:checked').closest('tr').find('td:nth-child(5) > span:nth-of-type(1) > span:nth-of-type(2)').text());
                $("#home-dialog-ticket-price").val($('.table-content input:checkbox:checked').closest('tr').find('td:nth-child(6) > span:nth-of-type(1)').text());
                $("#home-dialog-contact").val($('.table-content input:checkbox:checked').closest('tr').find('td:nth-child(7) > span:nth-of-type(1)').text());

                $("#home-dialog-edit-btn").show();
                $("#home-dialog-cancel-btn").show();    
                $("#add-bus-route").show();
                
                $("#home-dialog-edit-btn").on('click', function() {
                    ajax_edit(id);
            });
            }
            $("#home-dialog").removeClass('dialog-close').addClass('dialog-open');
        });
        
        function ajax_edit(id){
        	
        	
        	// validate
            $("#dialog-form").validate({
        		rules:{
        			name_home_dialog_destination: { 
        				required: true, 
        				maxlength: 100
        			}, 
        			name_home_dialog_departure_day: {
        				required: true,
        				dateITA: true, 
        				maxlength: 100
        			}, 
        			name_home_dialog_departure_time: {
        				required: true,
        				time: true,
        				maxlength: 100
        			}, 
        			name_home_dialog_arrival_day: {
        				required: true,
        				dateITA: true,
        				maxlength: 100
        			}, 
        			name_home_dialog_arrival_time: {
        				required: true,
        				time: true,
        				maxlength: 100
        			}, 
        			name_home_dialog_bus_service: { 
        				required: true, 
        				maxlength: 100
        			}, 
        			name_home_dialog_bus_service_destination: {
        				required: true,
        				maxlength: 100
        			}, 
        			name_home_dialog_ticket_price: {
        				required: true, 
        				digits: true,
        				maxlength: 100
        			}, 
        			name_home_dialog_total_ticket: {
        				required: true, 
        				digits: true,
        				range: [10, 80],
        				maxlength: 100
        			}
        		}, 
        		messages: {
        			name_home_dialog_destination: { 
        				required: "must fill",
        				maxlength: "maxlen 100"
        			},
        			name_home_dialog_departure_day: {
        				required: "must fill",
        				dateITA: "dd/mm/yyyy",
        				maxlength: "maxlen 100"
        			}, 
        			name_home_dialog_departure_time: {
        				required: "must fill",
        				time: "hh:mm",
        				maxlength: "maxlen 100"
        			}, 
        			name_home_dialog_arrival_day: {
        				required: "must fill",
        				dateITA: "dd/mm/yyyy",
        				maxlength: "maxlen 100"
        			}, 
        			name_home_dialog_arrival_time: {
        				required: "must fill",
        				time: "hh:mm",
        				maxlength: "maxlen 100"
        			}, 
        			name_home_dialog_bus_service: { 
        				required: "must fill",
        				maxlength: "maxlen 100"
        			}, 
        			name_home_dialog_bus_service_destination: { 
        				required: "must fill",
        				maxlength: "maxlen 100"
        			}, 
        			name_home_dialog_ticket_price: {
        				required: "must fill",
        				digits: "integer",
        				maxlength: "maxlen 100"
        			}, 
        			name_home_dialog_total_ticket: {
        				required: "must fill",
        				digits: "integer",
        				range: "10 to 80",
        				maxlength: "maxlen 100"
        			}
        		},
        		submitHandler: function(form) {
        			var token = $("meta[name='_csrf']").attr("content");
                    var header = $("meta[name='_csrf_header']").attr("content");
                    var url = '/busroute/'+id+'/edit';
                    console.log('url = '+url);
                    var data= {
                    		source: "Đà Nẵng-Bến xe TT Đà nẵng",
                    		destination:$("#home-dialog-destination").val(), // Nơi đến: Sài Gòn 
                    		busServiceDestination: $("#home-dialog-bus-service-destination").val(), // Bến xe: Bến xe Miền Đông  
                    		busService:$("#home-dialog-bus-service").val(),	// Nhà xe: ABC 
                    		departureTime: $("#home-dialog-departure-time").val(), // Giờ đi: 7:30   
                    		departureDate: $("#home-dialog-departure-day").val(), // Ngày đi: 21-05-1995 
                    		arrivalTime: $("#home-dialog-arrival-time").val(), // Giờ đến: 8:30  
                    		arrivalDate: $("#home-dialog-arrival-day").val(), // Ngày đến: 21-05-1995
                    		ticketPrice: $("#home-dialog-ticket-price").val(), // Giá tiền: 69000 
                    		totalTickets: $("#home-dialog-total-ticket").val(), // Tổng số vé: 30
                    };

                    $.ajax({
                    	type: 'POST',
                    	url: '/busroute/'+id+'/edit',
                    	contentType: "application/json; charset=utf-8",
                    	dataType: "json",
                    	data: JSON.stringify(data),
                    	traditional: true,
                    	beforeSend: function(xhr){
                    		xhr.setRequestHeader(header, token);
                    	},
                    	success: function(data) {
                    		
                    		console.log(data);
                    		swal({
                    			title: 'Thành công',
                    			text: data.responseText,
                    			type: 'success'
                    		})
                    		
                    		window.location.reload();
                    	},
                    	error:function(data){
                    		alert(data.responseText);
                            window.location.reload();
                    	}
                    });
        		}
        	});
        }

        $( "#home-delete-bus-route-btn" ).button().on( "click", function() {
            var cntCheckbox = $(".table-content input:checkbox:checked").length;
            console.log(cntCheckbox);
            if (cntCheckbox < 1) {
                $("#delete-bus-route h4").html("Phải chọn 1 tuyến xe để có thể xóa!");
            } 
            else {
                $("#delete-bus-route h4").html("Bạn có thực sự muốn xóa tuyến xe này?");
                $("#home-dialog-delete-btn").show();    
            }
            $("#home-dialog-cancel-btn").show();
            $("#delete-bus-route").show();
            $("#home-dialog").removeClass('dialog-close').addClass('dialog-open');
        });

        $(".home-dialog-close").on("click", function() {
            closeDialog();
            $("#home-dialog").removeClass('dialog-open').addClass('dialog-close');
            $("#home-dialog-cancel-booking").removeClass('dialog-open').addClass('dialog-close');
        });

        $("#home-cancel-booking-btn").on("click", function() {
            $("#home-dialog-cancel-booking").removeClass('dialog-close').addClass('dialog-open');
            
        });
    });

    ///////////
    
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


    function closeDialog() {
        $("#home-dialog-destination").val("");
        $("#home-dialog-bus-service").val("");
        $("#home-dialog-departure-time").val("");
        $("#home-dialog-bus-service-destination").val("");
        $("#home-dialog-arrival-time").val("");
        $("#home-dialog-ticket-price").val("");
        $("#home-dialog-remaining-ticket").val("");
        $("#home-dialog-contact").val("");

        $("#add-bus-route").hide();
        $("#delete-bus-route").hide();
        $("#home-dialog-add-btn").hide();
        $("#home-dialog-edit-btn").hide();
        $("#home-dialog-delete-btn").hide();
        $("#home-dialog-cancel-btn").hide();
        $("#home-dialog-ok-btn").hide();

        $("#home-dialog-delete-btn").on('click',function(){

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

                        console.log(data);
                        swal({
                            title: 'Thành công',
                            text: data.responseText,
                            type: 'success'
                        }).then(function(){
                            window.location.replace("/");
                        })

                    }
                });
            }

        });
    }

    function procDateTime() {
        var cnttr = $(".table-content tr").length;

        for (var idx = 1; idx <= cnttr; idx++)
        {
		//////////////////////////////////////////// SOURCE
        var txt = $('.table-content').find('tr:nth-child(' + idx + ') td:nth-child(4) > span:nth-of-type(1)').text();
        var place = "";
        var busStop = "";

        var i = 0;
        while (txt[i] != '-')
        {
            place += txt[i];
            i++;
        }
        i++;
        for (; i < txt.length; i++)
        {
            busStop += txt[i];
        }
        $('.table-content').find('tr:nth-child(' + idx + ') td:nth-child(4) > span:nth-of-type(1)').html("<span>" + place + "</span> - <span>" + busStop + "</span>");

        //////////////////////////////////////////// DEPARTURE TIME
        var txt = $('.table-content').find('tr:nth-child(' + idx + ') td:nth-child(4) > span:nth-of-type(2)').text();

        var year = "";
        var month = "";
        var day = "";
        var time = "";

        var i = 0;
        for (; i < 4; i++)
        {
            year += txt[i];
        }
        i++;
        for (var cnt = 0; cnt < 2; cnt++, i++)
        {
            month += txt[i];
        }
        i++;
        for (var cnt = 0; cnt < 2; cnt++, i++)
        {
            day += txt[i];
        }
        i++;
        for (var cnt = 0; cnt < 5; cnt++, i++)
        {
            time += txt[i];
        }

        $('.table-content').find('tr:nth-child(' + idx + ') td:nth-child(4) > span:nth-of-type(2)').html("<span>" + time + "</span> <br/> <span>" + day + "/" + month + "/" + year + "</span>");

        //////////////////////////////////////////// DESTINATION
        var txt = $('.table-content').find('tr:nth-child(' + idx + ') td:nth-child(5) > span:nth-of-type(1)').text();
        var place = "";
        var busStop = "";

        var i = 0;
        while (txt[i] != '-')
        {
            place += txt[i];
            i++;
        }
        i++;
        for (; i < txt.length; i++)
        {
            busStop += txt[i];
        }
        $('.table-content').find('tr:nth-child(' + idx + ') td:nth-child(5) > span:nth-of-type(1)').html("<span>" + place + "</span> - <span>" + busStop + "</span>");
        
        //////////////////////////////////////////// ARRIVAL TIME
        txt = $('.table-content').find('tr:nth-child(' + idx + ') td:nth-child(5) > span:nth-of-type(2)').text();

        year = "";
        month = "";
        day = "";
        time = "";

        var i = 0;
        for (; i < 4; i++)
        {
            year += txt[i];
        }
        i++;
        for (var cnt = 0; cnt < 2; cnt++, i++)
        {
            month += txt[i];
        }
        i++;
        for (var cnt = 0; cnt < 2; cnt++, i++)
        {
            day += txt[i];
        }
        i++;
        for (var cnt = 0; cnt < 5; cnt++, i++)
        {
            time += txt[i];
        }

        $('.table-content').find('tr:nth-child(' + idx + ') td:nth-child(5) > span:nth-of-type(2)').html("<span>" + time + "</span> <br/> <span>" + day + "/" + month + "/" + year + "</span>");
    }
}



