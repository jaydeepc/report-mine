$(document).ready(function() {

    $.getJSON('../data/result.json', function(jd) {

        test_list = jd.report.tests;
        for(i=0; i<test_list.length; i++){
            if (test_list[i].outcome == "failed"){
                $(".container tbody").append("<tr><td>" + fetch_module_name(test_list[i].name)
                +
                "</td><td>"
                +
                fetch_test_name(test_list[i].name)
                +
                "</td><td><a class='md-trigger' data-modal='modal-12' onclick='showModal();' name='"+ fetch_test_name(test_list[i].name) +"'>Show Failure Trace</a></td><td>"
                +
                has_artifact()
                +
                "</td></tr>");

              $( ".md-trigger" ).promise().done(function() {
                $("body").append("<div class='md-modal md-effect-12' id='modal-12' name='" + fetch_test_name(test_list[i].name) + "' >" +
                "<div class='md-content'>" +
                "<h3>" +
                "Console Error" +
                "</h3><hr><br><p><pre>" + test_list[i].call.longrepr.trim() + "</pre></p><br><hr><button class='md-close' onclick='removeModal();'>Close</button></div>" +
                "</div><div class='md-overlay'></div>")

              });

            }
        }

    });


});


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

