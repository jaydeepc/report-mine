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
                    total_failed_specs = jd.suiteResult.specsFailedCount;
                    total_skipped_specs = jd.suiteResult.specsSkippedCount;
                    total_pass_rate = jd.suiteResult.successRate;
                    total_specs = Math.round((total_failed_specs + total_skipped_specs)*100 / (100 - total_pass_rate));
                    total_pass_specs = total_specs - total_failed_specs - total_skipped_specs


                    $('#stage .pricing-table .price .green').append('<p><span>%</span>' + jd.suiteResult.successRate + '</p>')
                    $('#stage .pricing-table .price .red').append('<p><span>%</span>' + Math.round((total_failed_specs)*100/total_specs) + '</p>')
                    $('#stage .pricing-table .price .yellow').append('<p><span>%</span>' + Math.round((total_skipped_specs)*100/total_specs) + '</p>')

                    env = jd.suiteResult.environment;
                    tags = jd.suiteResult.tags;
                    unconverted_tt = jd.suiteResult.executionTime
                    tt = msToTime(unconverted_tt);
                    exe_time = jd.suiteResult.timestamp;
                    project_name = jd.suiteResult.projectName

                    $('.env').append(env);
                    $('.tags').append(tags);
                    $('.tt').append(tt);
                    $('.gt').append(exe_time);
                    $('.project').append(project_name);

                    total_scenarios = 0;
                    passed_scenarios = 0;
                    failed_scenarios = 0;
                    skipped_scenarios = 0;
                    for (i=0; i<jd.suiteResult.specResults.length; i++){
                        total_scenarios = total_scenarios + jd.suiteResult.specResults[i].scenarioCount;
                        failed_scenarios = failed_scenarios + jd.suiteResult.specResults[i].scenarioFailedCount;
                        skipped_scenarios = skipped_scenarios + jd.suiteResult.specResults[i].scenarioSkippedCount;
                    }
                    passed_scenarios = total_scenarios - failed_scenarios - skipped_scenarios;

                    $('#stage_spec .pricing-table .price .green').append('<p><span>%</span>' + Math.round((passed_scenarios)*100/total_scenarios) + '</p>')
                    $('#stage_spec .pricing-table .price .red').append('<p><span>%</span>' + Math.round((failed_scenarios)*100/total_scenarios) + '</p>')
                    $('#stage_spec .pricing-table .price .yellow').append('<p><span>%</span>' + Math.round((skipped_scenarios)*100/total_scenarios) + '</p>')

                    createPie("chartdiv", total_pass_specs, total_failed_specs, total_skipped_specs)
                    createPie("chartdiv1", passed_scenarios, failed_scenarios, skipped_scenarios)
                    createSpeedoMeter("gaugechart", Math.round(unconverted_tt/1000));
               });

                function createPie(chart_id, passCount, failCount, skipCount){
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
                                    "#F5151C",
                                    "#F3CB0B"
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
                                    }
                                ]
                            }
                        );
                }

            function createSpeedoMeter(chart_id, data) {

                Highcharts.chart(chart_id, {

                    chart: {
                        type: 'gauge',
                        plotBackgroundColor: null,
                        plotBackgroundImage: null,
                        plotBorderWidth: 0,
                        plotShadow: false
                    },

                    title: {
                        text: 'Execution Time State'
                    },

                    pane: {
                        startAngle: -150,
                        endAngle: 150,
                        background: [{
                            backgroundColor: {
                                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                                stops: [
                                    [0, '#FFF'],
                                    [1, '#333']
                                ]
                            },
                            borderWidth: 0,
                            outerRadius: '109%'
                        }, {
                            backgroundColor: {
                                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                                stops: [
                                    [0, '#333'],
                                    [1, '#FFF']
                                ]
                            },
                            borderWidth: 5,
                            outerRadius: '107%'
                        }, {
                            // default background
                        }, {
                            backgroundColor: '#DDD',
                            borderWidth: 0,
                            outerRadius: '105%',
                            innerRadius: '103%'
                        }]
                    },

                    // the value axis
                    yAxis: {
                        min: 0,
                        max: 90,

                        minorTickInterval: 'auto',
                        minorTickWidth: 1,
                        minorTickLength: 10,
                        minorTickPosition: 'inside',
                        minorTickColor: '#666',

                        tickPixelInterval: 30,
                        tickWidth: 2,
                        tickPosition: 'inside',
                        tickLength: 10,
                        tickColor: '#666',
                        labels: {
                            step: 2,
                            rotation: 'auto'
                        },
                        title: {
                            text: 'Minutes'
                        },
                        plotBands: [{
                            from: 0,
                            to: 30,
                            color: '#75d644' // green
                        }, {
                            from: 30,
                            to: 60,
                            color: '#f49b42' // yellow
                        }, {
                            from: 60,
                            to: 90,
                            color: '#f26f6f' // red
                        }]
                    },

                    series: [{
                        name: 'Execution Time',
                        data: [data/60],
                        tooltip: {
                            valueSuffix: 'Minutes'
                        }
                    }]

                },
                // Add some life
                function (chart) {
                    if (!chart.renderer.forExport) {
                        setInterval(function () {
                            var point = chart.series[0].points[0],
                                newVal,
                                inc = data/60 + Math.round(Math.random());

                            newVal = inc;
                            if (newVal < 0 || newVal > 200) {
                                newVal = point.y - inc;
                            }

                            point.update(newVal);

                        }, 200);
                    }
                });
            }
				
         });

