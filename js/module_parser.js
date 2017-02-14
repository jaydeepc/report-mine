 $(document).ready(function() {
     $.getJSON('../data/result.json', function(jd) {
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

                }
            }
            details['total'] = module[key];
            details[pass_count_key] = pass_count;
            details[fail_count_key] = fail_count;
            details[skip_count_key] = skip_count;
            details[error_count_key] = error_count;
            modules[key] = details;

        }

        for (key in modules){
            var data_for_graph = {};
            data_for_graph['category'] = key;
            data_for_graph['column-1'] = modules[key]['pass_count'];
            data_for_graph['column-2'] = modules[key]['fail_count'];
            data_for_graph['column-3'] = modules[key]['error_count'];
            data_for_graph['column-4'] = modules[key]['skip_count'];
            my_array.push(data_for_graph);
        }


        for (key in modules){
                var confidence_color;
                var pass_percent;
                var ready_to_release = "";
                pass_percent = Math.round((modules[key]['pass_count'])*100/modules[key]['total']);
                if (pass_percent == 100){
                    confidence_color = "#7EC416";
                    ready_to_release = "most-popular";
                }
                else if (pass_percent >= 80 && pass_percent < 100){
                    confidence_color = "orange";
                }
                else {
                    confidence_color = "#d65544";
                }

               var failed_link = "";
               var passed_link = "";
               var skipped_link = "";
               var error_link = ""

               if (modules[key]['fail_count'] > 0){
                    failed_link = "<li><b><a href='test_result.html?module=" + key + "&status=passed'>" + modules[key]['fail_count'] + "</b> - Tests Failed</li></a>";
               }
               else{
                    failed_link = "<li><b>" + modules[key]['fail_count'] + "</b> - Tests Failed</li>";
               }

               if (modules[key]['pass_count'] > 0){
                    passed_link = "<li><b><a href='test_result.html?module=" + key + "&status=passed'>" + modules[key]['pass_count'] + "</b> - Tests Passed</li></a>";
               }
               else{
                    passed_link = "<li><b>" + modules[key]['pass_count'] + "</b> - Tests Passed</li>";
               }

               if (modules[key]['error_count'] > 0){
                    error_link = "<li><b><a href='test_result.html?module=" + key + "&status=error'>" + modules[key]['error_count'] + "</b> - Tests Errored Out</li></a>";
               }
               else{
                    error_link = "<li><b>" + modules[key]['error_count'] + "</b> - - Tests Errored Out</li>";
               }

               if (modules[key]['skip_count'] > 0){
                    skipped_link = "<li><b><a href='test_result.html?module=" + key + "&status=skipped'>" + modules[key]['skip_count'] + "</b> - Tests Skipped</li></a>";
               }
               else{
                    skipped_link = "<li><b>" + modules[key]['skip_count'] + "</b> - Tests Skipped</li>";
               }


               $("#pricing-table").append(
                  '<div class="plan" id="'+ ready_to_release +'"><h3>' + key + '<span>' + pass_percent + '%</span></h3>' +
                  '<div class="confidence" style="color: white; background-color: ' + confidence_color + '">' + 'Confidence' + '</div>' +
                  '<ul>' +
                      '<li><b><a href=\'test_result.html?module=' + key + '\'>' + modules[key]['total'] + '</b> - Total Number of Tests</li></a>' +
                       passed_link +
                       failed_link +
                       error_link +
                       skipped_link
              );

        }
        createBar(my_array);
    });
 });

function createBar(data_array){
    AmCharts.makeChart("chartdiv",
        {
            "type": "serial",
            "categoryField": "category",
            "startDuration": 1,
            "categoryAxis": {
                "gridPosition": "start"
            },
            "trendLines": [],
            "graphs": [
                {
                    "balloonText": "[[title]] in '[[category]]':[[value]]",
                    "fillAlphas": 1,
                    "id": "AmGraph-1",
                    "title": "Tests Passed",
                    "type": "column",
                    "valueField": "column-1",
                    "lineColor": "#FFFFFF",
                    "fillColors": "#75d644"
                },
                {
                    "balloonText": "[[title]] in '[[category]]':[[value]]",
                    "fillAlphas": 1,
                    "id": "AmGraph-2",
                    "title": "Tests Failed",
                    "type": "column",
                    "valueField": "column-2",
                    "lineColor": "#FFFFFF",
                    "fillColors": "#f26f6f"
                },
                {
                    "balloonText": "[[title]] in '[[category]]':[[value]]",
                    "fillAlphas": 1,
                    "id": "AmGraph-3",
                    "title": "Tests Errored",
                    "type": "column",
                    "valueField": "column-3",
                    "lineColor": "#FFFFFF",
                    "fillColors": "#FF6F0F"
                },
                {
                    "balloonText": "[[title]] in '[[category]]':[[value]]",
                    "fillAlphas": 1,
                    "id": "AmGraph-4",
                    "title": "Tests Skipped",
                    "type": "column",
                    "valueField": "column-4",
                    "lineColor": "#FFFFFF",
                    "fillColors": "#f4d20e"
                }
            ],
            "guides": [],
            "valueAxes": [
                {
                    "id": "ValueAxis-1",
                    "stackType": "regular",
                    "title": "Number of Scenarios"
                }
            ],
            "allLabels": [],
            "balloon": {},
            "legend": {
                "enabled": true,
                "useGraphSettings": true
            },
            "titles": [
                {
                    "id": "Title-1",
                    "size": 15,
                    "text": ""
                }
            ],
            "dataProvider": data_array
        }
    );
}
