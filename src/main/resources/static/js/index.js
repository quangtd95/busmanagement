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
            	  var token = $("meta[name='_csrf']").attr("content");
                  var header = $("meta[name='_csrf_header']").attr("content");

                var data= {
                	source: "Đà Nẵng-Bến xe TT Đà nẵng",
                    destination:$("#home-dialog-destination").val(),
                    busServiceDestination: $("home-dialog-bus-service-destination").val(),
                    busService:$("#home-dialog-bus-service").val(),
                    departureTime: $("home-dialog-departure-time").val(),
                    departureDate: "",
                    arrivalTime: $("home-dialog-arrival-time").val(),
                    arrivalDate: "",
                    ticketPrice: $("home-dialog-ticket-price").val(),
                    totalTickets: "",
                    remainingTicket: $("home-dialog-remaining-ticket").val(),
                    contact: $("home-dialog-contact").val()
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
                    
                    console.log(data);
                    swal({
                        title: 'Thành công',
                        text: data.responseText,
                        type: 'success'
                        }).then(function(){
                            window.location.replace("/");
                        })

                },
                error:function(data){
                	alert(data.responseText);
                }
            });
            });


            /////////////EVENT////////////////////
        });

        $( "#home-edit-bus-route-btn" ).button().on( "click", function() {
            var cntCheckbox = $(".table-content input:checkbox:checked").length;
            // console.log(cntCheckbox);
            if (cntCheckbox != 1) {
                if (cntCheckbox > 1) $("#delete-bus-route h4").html("Không chọn nhiều hơn 1 tuyến xe để sửa!");
                else $("#delete-bus-route h4").html("Phải chọn 1 tuyến xe để có thể sửa!");
                $("#home-dialog-ok-btn").show();
                $("#delete-bus-route").show();
            } 
            else {
                // console.log($('.table-content input:checkbox:checked').closest('tr').find('td:nth-child(2) span:nth-of-type(2)').text());
                $("#home-dialog-destination").val($('.table-content input:checkbox:checked').closest('tr').find('td:nth-child(2) span:nth-of-type(2)').text());
                $("#home-dialog-bus-service").val($('.table-content input:checkbox:checked').closest('tr').find('td:nth-child(3) span:nth-of-type(1)').text());
                $("#home-dialog-departure-time").val($('.table-content input:checkbox:checked').closest('tr').find('td:nth-child(3) span:nth-of-type(2)').text());
                $("#home-dialog-bus-service-destination").val($('.table-content input:checkbox:checked').closest('tr').find('td:nth-child(4) span:nth-of-type(1)').text());
                $("#home-dialog-arrival-time").val($('.table-content input:checkbox:checked').closest('tr').find('td:nth-child(4) span:nth-of-type(2)').text());
                $("#home-dialog-ticket-price").val($('.table-content input:checkbox:checked').closest('tr').find('td:nth-child(5) span:nth-of-type(1)').text());
                $("#home-dialog-remaining-ticket").val($('.table-content input:checkbox:checked').closest('tr').find('td:nth-child(5) span:nth-of-type(2)').text());
                $("#home-dialog-contact").val($('.table-content input:checkbox:checked').closest('tr').find('td:nth-child(6) span:nth-of-type(1)').text());

                $("#home-dialog-edit-btn").show();
                $("#home-dialog-cancel-btn").show();    
                $("#add-bus-route").show();
            }
            $("#home-dialog").removeClass('dialog-close').addClass('dialog-open');
        });

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
    //////////////////////////////////////////// DEPARTURE TIME
    var txt = $('.table-content').find('tr:first td:nth-child(3) span:nth-of-type(2)').text();

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

    $('.table-content').find('tr:first td:nth-child(3) span:nth-of-type(2)').html(time + "<br/>" + day + "/" + month + "/" + year);

    //////////////////////////////////////////// ARRIVAL TIME
    txt = $('.table-content').find('tr:first td:nth-child(4) span:nth-of-type(2)').text();

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

    $('.table-content').find('tr:first td:nth-child(4) span:nth-of-type(2)').html(time + "<br/>" + day + "/" + month + "/" + year);
}



