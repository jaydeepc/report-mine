$(document).ready(function() {

    $.getJSON('../data/result.json', function(jd) {

        test_list = jd.report.tests;
        show_failure_trace = "";
        show_screenshot = "";

        table_creator = {
            0:{"Module Name": "module_name"},
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
            $(".container tbody").append("<tr id='table-row-"+i+"'><td style='color:"+color+"'>" + fetch_module_name(test_list[i])
            +
            "</td><td>"
            +
            fetch_test_name(test_list[i])
            +
            "</td><td>" +
            test_list[i].testDetails.results
            +
            "</td><td>" +
            SecondsTohhmmss(test_list[i].totaltime) + "</td>"
            +
            show_failure_trace
            +
            show_screenshot
            +
            "</td></tr>");

            }
        }).then(function(){
                url = window.location.href;
                query_params = url.split("?")[1].split("&");
                var keys = new Array();
                var vals = new Array();
                for(var i = 0; i<query_params.length; i++){
                    keys.push(query_params[i].split("=")[0]);
                    vals.push(query_params[i].split("=")[1]);
                    }

                separator = ";";
                for(var i=0; i<keys.length; i++){
                    key = keys[i];
                    value = vals[i];
                    if(i==keys.length-1)
                       separator = "";
                    $(".filter-name").append(" "+ first_to_uppercase(key)+": "+first_to_uppercase(value) + separator); //fills the title info

                    var table = document.querySelector("table");
                    var rows = table.rows;
                    var json = keys.getDuplicates();
                    column_index = find_pos_from_filter_key(table_creator, key);

                    //if the key is duplicated, check for all values across rows, before removing the row
                    if(key in json){
                        var mergedVal = new Array();
                        json[key].forEach(function (index){
                            mergedVal.push(vals[index]);
                        });
                        for (var j = 1; j < rows.length; j++) {
                        row_val= rows[j].cells[column_index].innerHTML;
                        if($.inArray(row_val, mergedVal)==-1){
                            rows[j].remove();
                                j = j - 1;
                                }
                            }
                        } else{
                            for (var j = 1; j < rows.length; j++) {
                            if((rows[j].cells[column_index].innerHTML != value)){
                                rows[j].remove();
                                j = j - 1;
                                }
                             }
                          }
                    }
        });

});


Array.prototype.getDuplicates = function () {
    var duplicates = {};
    for (var i = 0; i < this.length; i++) {
        if(duplicates.hasOwnProperty(this[i])) {
            duplicates[this[i]].push(i);
        } else if (this.lastIndexOf(this[i]) !== i) {
            duplicates[this[i]] = [i];
        }
    }
    return duplicates;
};


function stackTraceLink(){
    if (test_list[i].testDetails.results != 'Pass'){
        return "</td><td class='stacktrace'><a onclick='showModal("+i+");'>Show Failure Trace</a></td><td>";
        }
    return "</td><td class='stacktrace'>*** N/A ***</td><td>";
}

function moduleNameColor(){
    if (test_list[i].testDetails.results == 'Pass'){
               return "#61ab3b";
            }
    else if(test_list[i].testDetails.results == 'Error'){
               return "#e86c2f";
            }
    else if(test_list[i].testDetails.results == 'Skip'){
               return "#c7b213";
            }
    return "#e65050";
}

function removeModal(){
    $('#modal').removeClass('show');
}
function showModal(i){
    var fail_trace = "";
    fail_trace = test_list[i].testDetails.exceptiontrace.trim();

    var header = $('<h2>'+ fetch_module_name(test_list[i]) +' : ' + fetch_test_name(test_list[i]) +'</h2>');
    var body = $('<pre id="stack-trace">'+fail_trace+'</pre>');
    var footer = $("<div class='md-close' onclick='removeModal();'><i class='fa fa-times-circle icon-close' aria-hidden='true'></i></button>");
    $('#modal-header').html('');
    $('#modal-container').html('');
    $('#modal-header').append(header);
    $('#modal-container').append(body);
    $('#modal-header').append(footer);
    $('#modal').addClass('show');
}


function fetch_module_name(test){
    return test.testDetails.classname;
}

function fetch_test_name(test){
    return test.testDetails.methodname;
}

function show_screenshots(i){
    screenShotPath = test_list[i].testDetails.logs.screenShotFailure;
    var body = $("<img class='stretch' src='" + screenShotPath + "'></img>");
    var footer = $("<div class='md-close' onclick='removeModal();'><i class='fa fa-times-circle icon-close' aria-hidden='true'></i></button>");
    $('#modal-header').html('');
    $('#modal-container').html('');
    $('#modal-container').append(body);
    $('#modal-header').append(footer);
    $('#modal').addClass('show');
}

function has_artifact(){
    if (test_list[i].testDetails.results == 'Pass' || test_list[i].testDetails.results == 'Skip'){
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


