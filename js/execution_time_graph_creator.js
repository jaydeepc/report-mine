 function fetch_name(name_with_class){
    var name = name_with_class.split("::").pop(-1);
    return name;
}

 function create_series_data(name_time_json_data){
    data_list = []
    count_0_5 = 0;
    count_5_10 = 0;
    count_10_15 = 0;
    count_15_more = 0;
    dict_data = {};

    for (key in name_time_json_data){
        exe_time = name_time_json_data[key];
        exe_time = parseFloat(exe_time);
        if (between(exe_time, 0, 5)){
            count_0_5 = count_0_5 + 1;
        }
        else if(between(exe_time, 5, 10)){
            count_5_10 = count_5_10 + 1;
        }
        else if(between(exe_time, 10, 15)){
            count_10_15 = count_10_15 + 1;
        }
        else{
            count_15_more = count_15_more + 1;
        }
    }

    dict_data["name"] = "0 to 5 seconds";
    dict_data["y"] = count_0_5;
    dict_data["drilldown"] = "0 to 5 seconds";
    data_list.push(dict_data);

    dict_data = {};
    dict_data["name"] = "5 to 10 seconds";
    dict_data["y"] = count_5_10;
    dict_data["drilldown"] = "5 to 10 seconds";
    data_list.push(dict_data);

    dict_data = {};
    dict_data["name"] = "10 to 15 seconds";
    dict_data["y"] = count_10_15;
    dict_data["drilldown"] = "10 to 15 seconds";
    data_list.push(dict_data);

    dict_data = {};
    dict_data["name"] = "More than 15 seconds";
    dict_data["y"] = count_15_more;
    dict_data["drilldown"] = "More than 15 seconds";
    data_list.push(dict_data);

    return data_list;

}

function create_drill_data(name_time_json_data){
    test_list_0_5 = []
    test_list_5_10 = []
    test_list_10_15 = []
    test_list_15 = []
    data_list = []
    dict_data = {};
    drill_down_tooltip = {"pointFormat": '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> seconds<br/>' }

    for (key in name_time_json_data){
        exe_time = name_time_json_data[key];
        exe_time = parseFloat(exe_time);

        if (between(exe_time, 0, 5)){
            test_list_0_5.push([key, exe_time]);
        }
        else if(between(exe_time, 5, 10)){
            test_list_5_10.push([key, exe_time]);
        }
        else if(between(exe_time, 10, 15)){
            test_list_10_15.push([key, exe_time]);
        }
        else{
            test_list_15.push([key, exe_time]);
        }
    }

    dict_data["name"] = "0 to 5 seconds";
    dict_data["data"] = test_list_0_5;
    dict_data["id"] = "0 to 5 seconds";
    dict_data["tooltip"] =drill_down_tooltip;
    data_list.push(dict_data);

    dict_data = {};
    dict_data["name"] = "5 to 10 seconds";
    dict_data["data"] = test_list_5_10;
    dict_data["id"] = "5 to 10 seconds";
    dict_data["tooltip"] =drill_down_tooltip;
    data_list.push(dict_data);

    dict_data = {};
    dict_data["name"] = "10 to 15 seconds";
    dict_data["data"] = test_list_10_15;
    dict_data["id"] = "10 to 15 seconds";
    dict_data["tooltip"] =drill_down_tooltip;
    data_list.push(dict_data);

    dict_data = {};
    dict_data["name"] = "More than 15 seconds";
    dict_data["data"] = test_list_15;
    dict_data["id"] = "More than 15 seconds";
    dict_data["tooltip"] =drill_down_tooltip;
    data_list.push(dict_data);


    return data_list

}

function between(x, min, max) {
  return x >= min && x <= max;
}

 $(document).ready(function() {
       $.getJSON('../data/result.json', function(jd) {
            total_tests = jd.report.tests;
            name_time_json = {};
            s_data = []
            for (var i=0; i<total_tests.length; i++){
                name_time_json[fetch_name(total_tests[i].name)] = parseFloat(total_tests[i].duration).toFixed(4);
            }

            s_data = create_series_data(name_time_json);
            d_data = create_drill_data(name_time_json);
            create_drill_bar(s_data, d_data, "container");
        });

 });

 function create_drill_bar(serial_data, drill_data_list, div_id){
         var default_yAxis_title = "Number of tests";
         $(function () {
            // Create the chart
            var chart = Highcharts.chart(div_id, {
                chart: {
                    type: 'column',
                    events: {
                        drilldown: function(e) {
                            chart.yAxis[0].setTitle({ text: "Execution Time" });
                            chart.setTitle({ text: "Execution time for all tests in the chosen time band" });
                        },
                        drillup: function(e) {
                            chart.yAxis[0].setTitle({ text: default_yAxis_title })
                            chart.setTitle({ text: "" });
                        }
                    }

                },
                title: {
                    text: ''
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    title: {
                        text: default_yAxis_title
                    }

                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: false,
                            format: '{point.y:1f}'
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:11px"><b>{series.name}</b></span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> tests<br/>'
                },
                credits:{
                    text: ""
                },
                series: [{
                    name: 'Time Band',
                    colorByPoint: true,
                    colors: ["#008be8", "#62abdb", "#ef974a", "#e53d3d"],
                    data: serial_data
                }],
                drilldown: {
                    series: drill_data_list
                }
            });
        });

 }
