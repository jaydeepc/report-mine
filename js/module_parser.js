 $(document).ready(function() {
 $.getJSON('../data/result.json', function(jd) {
    var my_array = [];
    for(i=0; i<jd.suiteResult.specResults.length; i++){

         total_scenarios = jd.suiteResult.specResults[i].scenarioCount
         failed_scenarios = jd.suiteResult.specResults[i].scenarioFailedCount
         skipped_scenarios = jd.suiteResult.specResults[i].scenarioSkippedCount
         passed_scenarios =  total_scenarios - failed_scenarios - skipped_scenarios

         ready_to_release = "Check";
         key = jd.suiteResult.specResults[i].protoSpec.specHeading;
         pass_percent = Math.round(passed_scenarios * 100/total_scenarios);
         confidence_color = "orange";

        if (pass_percent == 100){
            confidence_color = "#75d644";
            ready_to_release = "most-popular";
        }
        else if (pass_percent >= 80 && pass_percent < 100){
            confidence_color = "orange";
        }
        else {
            confidence_color = "#d65544";
        }

        var data_for_graph = {};
        data_for_graph['category'] = key;
        data_for_graph['column-1'] = passed_scenarios;
        data_for_graph['column-2'] = failed_scenarios;


        my_array.push(data_for_graph);

        createBar(my_array);
         $("#pricing-table").append(
        '<div class="plan" id="'+ ready_to_release +'"><h3>' + key + '<span>' + pass_percent + '%</span></h3>' +
        '<div class="confidence" style="color: white; background-color: ' + confidence_color + '">' + 'Confidence' + '</div>' +
        '<ul>' +
            '<li><b>' + total_scenarios + '</b> - Total Number of Scenarios</li>' +
            '<li><b>' + passed_scenarios + '</b> - Scenarios Passed</li>' +
            '<li><b>' + failed_scenarios + '</b> - Scenarios Failed</li>' +
            '<li><b>' + skipped_scenarios+ '</b> - Scenarios Skipped</li>' +
            '</ul></div>'

        );

    }
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
                            "title": "Scenarios Passed",
                            "type": "column",
                            "valueField": "column-1",
                            "lineColor": "#FFFFFF",
                            "fillColors": "#75d644"
                        },
                        {
                            "balloonText": "[[title]] in '[[category]]':[[value]]",
                            "fillAlphas": 1,
                            "id": "AmGraph-2",
                            "title": "Scenarios Failed",
                            "type": "column",
                            "valueField": "column-2",
                            "lineColor": "#FFFFFF",
                            "fillColors": "#f26f6f"
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
