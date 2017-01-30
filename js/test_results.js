$(window).load(function() {

    $.getJSON('../data/result.json', function(jd) {

        test_list = jd.report.tests;
        for(i=0; i<test_list.length; i++){
            if (test_list[i].outcome == "failed"){
                $(".container tbody").append("<tr id='table-row-"+i+"'><td>" + fetch_module_name(test_list[i].name)
                +
                "</td><td>"
                +
                fetch_test_name(test_list[i].name)
                +
                "</td><td><a onclick='showModal("+i+");'>Show Failure Trace</a></td><td>"
                +
                has_artifact()
                +
                "</td></tr>");
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

