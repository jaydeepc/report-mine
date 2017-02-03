$(document).ready(function() {

    $.getJSON('../data/result.json', function(jd) {

        test_list = jd.report.tests;
        for(i=0; i<test_list.length; i++){
            $(".container tbody").append("<tr id='table-row-"+i+"'><td>" + fetch_module_name(test_list[i].name)
            +
            "</td><td>"
            +
            fetch_test_name(test_list[i].name)
            +
            "</td><td>" +
            test_list[i].outcome
            +
            "</td><td><a onclick='showModal("+i+");'>Show Failure Trace</a></td><td>"
            +
            has_artifact()
            +
            "</td></tr>");

            }
        }).then(function(){
                var url = window.location.href;
                query_param = url.split("?")[1];

                if(query_param !== undefined){
                    param_dict = {};
                    query_param_list = query_param.split("&");
                    for(var i=0; i<query_param_list.length; i++){
                        key_val = query_param_list[i].split("=");
                        param_dict[key_val[0]] = key_val[1];
                    }

                    var table = document.querySelector("table");
                    var rows = table.rows;
                    for (var i = 1; i < rows.length; i++) {
                        if((rows[i].cells[0].innerHTML != param_dict["module"]) || (rows[i].cells[2].innerHTML != param_dict["status"])){
                            rows[i].remove();
                            i = i - 1;
                        }
                    }
                }
        });

});

function removeModal(){
    $('#modal').removeClass('show');
}
function showModal(i){
    var header = $('<h2>'+ fetch_module_name(test_list[i].name) +' : ' + fetch_test_name(test_list[i].name) +'</h2>');
    var body = $('<pre>'+test_list[i].call.longrepr.trim()+'</pre>');
    var footer = $("<button class='md-close' onclick='removeModal();'>Close</button>");
    $('#modal-header').html('');
    $('#modal-container').html('');
    $('#modal-header').append(header);
    $('#modal-container').append(body);
    $('#modal-header').append(footer);
    $('#modal').addClass('show');
}



function fetch_module_name(name_string){

    module_name = name_string.split("::")[1];
    return module_name;

}

function fetch_test_name(name_string){

    module_name = name_string.split("::")[2];
    return module_name;

}

function has_artifact(){
    return true;
}

