$(document).ready(function() {

    $.getJSON('../data/result.json', function(jd) {
        test_list = jd.report.tests;

        $(".time-exe").append(Math.round(find_slowest_test(test_list).duration));
        $("#check_slw_test").attr("onclick", "location.href='test_result.html?test_name=" + fetch_test_name(find_slowest_test(test_list).name) + "';");

        $(".time-module").append(Math.round(sorted_module_arr(create_module_dict_arr(jd), "avg_test_time").slice(-1)[0].duration));
        $("#check_slw_mod").attr("onclick", "location.href='test_result.html?module=" + sorted_module_arr(create_module_dict_arr(jd), "avg_test_time").slice(-1)[0].module + "';");

        $(".vul-module").append(Math.round(sorted_module_arr(create_module_dict_arr(jd), "failure_rate").slice(-1)[0].failure_rate));
        $("#check_vul_mod").attr("onclick", "location.href='test_result.html?module=" + sorted_module_arr(create_module_dict_arr(jd), "failure_rate").slice(-1)[0].module + "';");

        $(".fastest-module").append(Math.round(sorted_module_arr(create_module_dict_arr(jd), "avg_test_time")[0].avg_test_time));
        $("#check_fast_mod").attr("onclick", "location.href='test_result.html?module=" + sorted_module_arr(create_module_dict_arr(jd), "avg_test_time")[0].module + "';");

        $(".avg-time").append(Math.round(avg_test_execution_time(jd)));
        $("#avg_test").attr("onclick", "location.href='test_execution_time_graph.html';");
    });

});


function avg_test_execution_time(json_data){
    var avg_test_exe_time = Math.round(json_data.report.summary.duration/json_data.report.summary.num_tests);
    return avg_test_exe_time;
}

function find_slowest_test(test_list){
    var new_sorted_list = sortByKey(test_list, "duration")
    return new_sorted_list.slice(-1)[0];
}

function sorted_module_arr(module_object_list, sort_key){
        var sorted_module_list = sortByKey(module_object_list, sort_key);
        return sorted_module_list;
}

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function fetch_module_name(name_string){
    module_name = name_string.split("::")[1];
    return module_name;
}

function fetch_test_name(name_string){
    module_name = name_string.split("::")[2];
    return module_name;
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

function create_module_dict_arr(jd){
        var module = {};
        var modules = {};
        var my_array = [];

        for(i=0; i<jd.report.tests.length; i++){
          value = jd.report.tests[i].name;
          module_name = value.split("::")[1]
          var count = (module[module_name] || 0) + 1;
          module[module_name] = count;
        }

        for (key in module) {
            var details = {};
            pass_count_key = "pass_count";
            var pass_count = 0;
            fail_count_key = "fail_count";
            var fail_count = 0;
            skip_count_key = "skip_count";
            var skip_count = 0;
            error_count_key = "error_count";
            var error_count = 0;
            total_time = "duration";
            var duration = 0.0;

            for (i=0; i < jd.report.tests.length; i++){
                if(jd.report.tests[i].name.split("::")[1] == key){
                    if (jd.report.tests[i].outcome == 'passed'){
                        pass_count = pass_count + 1;
                    }
                    else if (jd.report.tests[i].outcome == 'failed'){
                        fail_count = fail_count + 1;
                    }
                    else if (jd.report.tests[i].outcome == 'skipped'){
                        skip_count = skip_count + 1;
                    }
                    else if (jd.report.tests[i].outcome == 'error'){
                        error_count = error_count + 1;
                    }

                    duration = duration + jd.report.tests[i].duration;
                }
            }
            details['total'] = module[key];
            details['failure_rate'] = Math.round((fail_count + error_count)*100/module[key]);
            details[pass_count_key] = pass_count;
            details[fail_count_key] = fail_count;
            details[skip_count_key] = skip_count;
            details[error_count_key] = error_count;
            details[total_time] = duration;
            details['module'] = key;
            details['avg_test_time'] = Math.round(duration/module[key]);

            my_array.push(details);

        }
     return my_array;
}


