$(document).ready(function() {

    $.getJSON('../data/result.json', function(jd) {

        test_list = jd.report.tests;
        show_failure_trace = "";
        show_screenshot = "";

        table_creator = {
            0:{"Module Name": "module"},
            1:{"Test Name": "test_name"},
            2:{"Status": "status"},
            3:{"Stack Trace": "stacktrace"},
            4: {"Artifact": "atrifact"}
        };

        for(i=0; i<test_list.length; i++){
            var color="";
            show_failure_trace = stackTraceLink();
            show_screenshot = has_artifact();

            color = moduleNameColor();
            $(".container tbody").append("<tr id='table-row-"+i+"'><td style='color:"+color+"'>" + fetch_module_name(test_list[i].name)
            +
            "</td><td>"
            +
            fetch_test_name(test_list[i].name)
            +
            "</td><td>" +
            test_list[i].outcome
            +
            "</td><td>" +
            SecondsTohhmmss(test_list[i].duration) + "</td>"
            +
            show_failure_trace
            +
            show_screenshot
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
                    var separator = " "
                    keys = Object.keys(param_dict)
                    if (keys.length > 1){
                        separator = ", "
                    }
                    for (var j=0; j<keys.length; j++){
                        if (j == (keys.length -1)){
                            var separator = ""
                        }
                        $(".filter-name").append(" "+ first_to_uppercase(keys[j])+": "+first_to_uppercase(param_dict[keys[j]]) + separator);
                        column_index = find_pos_from_filter_key(table_creator, keys[j]);
                        for (var i = 1; i < rows.length; i++) {
                            if((rows[i].cells[column_index].innerHTML != param_dict[keys[j]])){
                                rows[i].remove();
                                i = i - 1;
                            }
                        }
                    }
                }
        });

});

function stackTraceLink(){
    if (test_list[i].outcome != 'passed'){
        return "</td><td class='stacktrace'><a onclick='showModal("+i+");'>Show Failure Trace</a></td><td>";
        }
    return "</td><td class='stacktrace'>*** N/A ***</td><td>";
}

function moduleNameColor(){
    if (test_list[i].outcome == 'passed'){
               return "#61ab3b";
            }
    else if(test_list[i].outcome == 'error'){
               return "#e86c2f";
            }
    else if(test_list[i].outcome == 'skipped'){
               return "#c7b213";
            }
    return "#e65050";
}

function removeModal(){
    $('#modal').removeClass('show');
}
function showModal(i){
    var fail_trace = "";
    if (test_list[i].call !== undefined){
        fail_trace = test_list[i].call.longrepr.trim();
    }
    else {
        if (test_list[i].setup !== undefined){
            if (test_list[i].setup.longrepr !== undefined){
                fail_trace = test_list[i].setup.longrepr.trim();
            }
            else if (test_list[i].teardown !== undefined){
                if (test_list[i].teardown.longrepr !== undefined){
                    fail_trace = test_list[i].teardown.longrepr.trim();
                }

            }
        }

    }
    var header = $('<h2>'+ fetch_module_name(test_list[i].name) +' : ' + fetch_test_name(test_list[i].name) +'</h2>');
    var body = $('<pre id="stack-trace">'+fail_trace+'</pre>');
    var footer = $("<div class='md-close' onclick='removeModal();'><i class='fa fa-times-circle icon-close' aria-hidden='true'></i></button>");
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

function show_screenshots(i){
    test_name = fetch_test_name(test_list[i].name);
    var body = $("<img class='stretch' src='../screenshots/" + test_name + ".png'></img>");
    var footer = $("<div class='md-close' onclick='removeModal();'><i class='fa fa-times-circle icon-close' aria-hidden='true'></i></button>");
    $('#modal-header').html('');
    $('#modal-container').html('');
    $('#modal-container').append(body);
    $('#modal-header').append(footer);
    $('#modal').addClass('show');
}

function has_artifact(){
    if (test_list[i].outcome == 'passed' || test_list[i].outcome == 'skipped'){
        return "*** N/A ***";
    }
    img_link = "<a onclick='show_screenshots("+i+");'>Screenshot</a>";
    return img_link;
}

function find_pos_from_filter_key(dict_val, filter_key){
    for (var key in dict_val){
        if (dict_val[key][Object.keys(dict_val[key])[0]] == filter_key){
            return key;
        }
    }
}

function first_to_uppercase(str) {
    return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
        return $1.toUpperCase();
    });
}

function SecondsTohhmmss(totalSeconds) {
  var hours   = Math.floor(totalSeconds / 3600);
  var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
  var seconds = totalSeconds - (hours * 3600) - (minutes * 60);

  // round seconds
  seconds = Math.round(seconds * 100) / 100

  var result = (hours < 10 ? "0" + hours : hours);
      result += " : " + (minutes < 10 ? "0" + minutes : minutes);
      result += " : " + (seconds  < 10 ? "0" + seconds : seconds);
  return result;
  }


