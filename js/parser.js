         $(document).ready(function() {

         function msToTime(s) {
              var ms = s % 1000;
              s = (s - ms) / 1000;
              var secs = s % 60;
              s = (s - secs) / 60;
              var mins = s % 60;
              var hrs = (s - mins) / 60;

              return hrs + ':' + mins + ':' + secs + '.' + ms;
            }

               $.getJSON('../data/result.json', function(jd) {
                    total_failed_tests = jd.report.summary.failed || 0;
                    total_skipped_tests = jd.report.summary.skipped || 0;
                    total_errored_tests = jd.report.summary.error || 0;
                    total_pass_tests = jd.report.summary.passed;
                    total_tests = jd.report.summary.num_tests;

                    //Populate Pie Chart
                    $('#stage .pricing-table .price .green')
                        .append('<p><span>%</span>' + Math.round((total_pass_tests)*100/total_tests) + '</p>')
                        .append('<p class="green_number">' + total_pass_tests + ' TEST(S) </p>');
                    $('#stage .pricing-table .price .red')
                        .append('<p><span>%</span>' + Math.round((total_failed_tests)*100/total_tests) + '</p>')
                        .append('<p class="red_number">' + total_failed_tests + ' TEST(S) </p>');
                    $('#stage .pricing-table .price .yellow')
                        .append('<p><span>%</span>' + Math.round((total_skipped_tests)*100/total_tests) + '</p>')
                        .append('<p class="yellow_number">' + total_skipped_tests + ' TEST(S) </p>');
                    $('#stage .pricing-table .price .orange')
                        .append('<p><span>%</span>' + Math.round((total_errored_tests)*100/total_tests) + '</p>')
                        .append('<p class="orange_number">' + total_errored_tests + ' TEST(S) </p>');
                    createPie("chartdiv", total_pass_tests, total_failed_tests, total_skipped_tests, total_errored_tests);

                    //populate gaugechart and details table
                    platform = jd.report.environment.Platform;
                    python_version = jd.report.environment.Python;
                    execution_time = jd.report.summary.duration.toFixed(2);
                    converted_exe_time = msToTime(execution_time);
                    time_of_execution = jd.report.created_at;
                    $('.env').append(python_version);
                    $('.tags').append(execution_time);
                    $('.gt').append(time_of_execution);
                    $('.project').append(platform);
                    createSpeedoMeter("gaugechart", Math.round(execution_time));
               });

                function createPie(chart_id, passCount, failCount, skipCount, errorcount){
                        AmCharts.makeChart(chart_id,
                            {
                                "type": "pie",
                                "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
                                "depth3D": 5,
                                "innerRadius": "57%",
                                "labelRadius": 22,
                                "radius": 160,
                                "startAngle": 61.2,
                                "colors": [
                                    "#75d644",
                                    "#f26f6f",
                                    "#f4d20e",
                                    "#FF6F0F"
                                ],
                                "hoverAlpha": 0.66,
                                "marginBottom": 20,
                                "maxLabelWidth": 1,
                                "outlineThickness": 0,
                                "titleField": "category",
                                "valueField": "column-1",
                                "autoDisplay": true,
                                "backgroundAlpha": 1,
                                "processCount": 1001,
                                "theme": "default",
                                "allLabels": [],
                                "balloon": {
                                    "animationDuration": 1.76,
                                    "borderThickness": 0.5,
                                    "disableMouseEvents": false,
                                    "fadeOutDuration": 0.68,
                                    "fontSize": 18,
                                    "pointerWidth": 25,
                                    "shadowAlpha": 1
                                },
                                "titles": [],
                                "dataProvider": [
                                    {
                                        "category": "Passed",
                                        "column-1": passCount
                                    },
                                    {
                                        "category": "Failures",
                                        "column-1": failCount
                                    },
                                    {
                                        "category": "Skips",
                                        "column-1": skipCount
                                    },
                                    {
                                        "category": "Errors",
                                        "column-1": errorcount
                                    }
                                ]
                            }
                        );
                }

            function createSpeedoMeter(chart_id, data) {
              data = data; //parseFloat(data / 60);
              var g = new JustGage({
              id: chart_id,
              value: data,
              min: 0,
              max: 600,
              title: "Execution Time Status",
              label: "Time in Seconds",
              width: 600,
              height: 400
              });
            }

         });
