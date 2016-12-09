//         $(document).ready(function() {

                $.getJSON('../data/result.json', function(jd) {
                    for (i=0; i<jd.suiteResult.specResults.length; i++) {
                        if (jd.suiteResult.specResults[i].failed == true){
                            spec_name = jd.suiteResult.specResults[i].protoSpec.specHeading;
                            stack_trace = "This is stacktrace";
                            scenario_list_obj = []
                            scenario_heading = ""
                            scenario_text = ""
                            table = {}
                            failed_table_rows = []

                            for(i=0; i<jd.suiteResult.specResults.length; i++){
                                if (jd.suiteResult.specResults[i].failedDataTableRows !== undefined){
                                    failed_table_rows = jd.suiteResult.specResults[i].failedDataTableRows;
                                }
                                if (jd.suiteResult.specResults[i].protoSpec.isTableDriven){
                                    for (j=0; j<jd.suiteResult.specResults[i].protoSpec.items.length; j++){
                                        if (jd.suiteResult.specResults[i].protoSpec.items[j].tableDrivenScenario !== undefined){
                                            scenario_list_obj = jd.suiteResult.specResults[i].protoSpec.items[j].tableDrivenScenario.scenarios;
                                        }
                                        else if (jd.suiteResult.specResults[i].protoSpec.items[j].table !== undefined){
                                            table = jd.suiteResult.specResults[i].protoSpec.items[j].table;
                                        }
                                    }

                                }
                            }
                        scenario_html = '<table class="scneario"><tbody>';
                        table_id = [];
                        for(k=0; k<scenario_list_obj.length; k++){
                            data_used = "";
                            for (l=0; l<scenario_list_obj[k].scenarioItems.length; l++){
                                text = "";

                                if (scenario_list_obj[k].scenarioItems[l].step !== undefined){
                                    for (m=0; m<scenario_list_obj[k].scenarioItems[l].step.fragments.length; m++){
                                        if (scenario_list_obj[k].scenarioItems[l].step.fragments[m].fragmentType == 1){
                                            text = text + scenario_list_obj[k].scenarioItems[l].step.fragments[m].text;
                                        }
                                        else{
                                            data_used = scenario_list_obj[k].scenarioItems[l].step.fragments[m].parameter.value;
                                            text = text + data_used;
                                        }
                                    }

                                }
                            if (data_used != ""){
                                if(text != ""){
                                    scenario_html = scenario_html + '<tr class=' + data_used.replace(/ /g,'') + ' style="display: none;"><td>' + text + '</td></tr>';
                                }

                            }
                            else{
                                scenario_html = scenario_html + '<tr style="display: none;"><td>' + text + '</td></tr>';
                            }

                            }
                        table_id.push(data_used.replace(/ /g,''));
                        }

                            scenario_html = scenario_html + '</tbody></table>';


                            table_html = '<table class="container" id="stackcontainer"><tbody>'

                            for (i=0; i<table.headers.cells.length; i++){
                                table_html = table_html + '<th>' + table.headers.cells[i] + '</th>';
                            }

                            for (i=0; i<table.rows.length; i++){
                                for (j=0; j<table.rows[i].cells.length; j++){
                                    if ($.inArray(i, failed_table_rows) != -1){
                                        table_html = table_html + '<tr class="failed" id=' + table.rows[i].cells[j].replace(/ /g,'') + '><td>' + table.rows[i].cells[j] + '</td></tr>';
                                    }
                                    else{
                                        table_html = table_html + '<tr class="passed"><td>' + table.rows[i].cells[j].replace(/ /g,'') + '</td></tr>';
                                    }
                                }

                            }

                            table_html = table_html + '</tbody></table>';

                            $(".container .accordion dl").append(
                                '<dt><a href="#accordion' + (i+1) + '" aria-expanded="false" aria-controls="accordion' + (i+1) + '" class="accordion-title accordionTitle js-accordionTrigger">' + spec_name + '</a>' +
                                '</dt><dd class="accordion-content accordionItem is-collapsed" id="accordion' + (i+1) + '" aria-hidden="true"><div class="all_stack"><h2>' + scenario_heading + '\n</h2>' + table_html + '</div><p></p><div>' + scenario_html + '</div></dd>'
                            );

                         for(i=0; i<table_id.length; i++){
                            $('#' + table_id[i]).click(function() {
                                class_name = $(this).attr('id');
                                var control = $('.' + class_name).toggle();
                            });
                         }
//                            $('#Unisex').click(function() {
//                                console.log('clicked: Unisex');
//                                var control = $('.Unisex').toggle();
//                            });
//
//                            $('#JunkValue').click(function() {
//                                console.log('clicked: JunkValue');
//                                var control = $('.JunkValue').toggle();
//                            });

                        }
                    }
                }).done(function () {
                    var d = document,
                    accordionToggles = d.querySelectorAll('.js-accordionTrigger'),
                    setAria,
                    setAccordionAria,
                    switchAccordion,
                  touchSupported = ('ontouchstart' in window),
                  pointerSupported = ('pointerdown' in window);
                  skipClickDelay = function(e){
                    e.preventDefault();
                    e.target.click();
                  }

                        setAriaAttr = function(el, ariaType, newProperty){
                        el.setAttribute(ariaType, newProperty);
                    };
                    setAccordionAria = function(el1, el2, expanded){''
                        switch(expanded) {
                      case "true":
                        setAriaAttr(el1, 'aria-expanded', 'true');
                        setAriaAttr(el2, 'aria-hidden', 'false');
                        break;
                      case "false":
                        setAriaAttr(el1, 'aria-expanded', 'false');
                        setAriaAttr(el2, 'aria-hidden', 'true');
                        break;
                      default:
                                break;
                        }
                    };
                //function
                    switchAccordion = function(e) {
                        console.log("triggered");
                        e.preventDefault();
                        var thisAnswer = e.target.parentNode.nextElementSibling;
                        var thisQuestion = e.target;
                        if(thisAnswer.classList.contains('is-collapsed')) {
                            setAccordionAria(thisQuestion, thisAnswer, 'true');
                        } else {
                            setAccordionAria(thisQuestion, thisAnswer, 'false');
                        }
                        thisQuestion.classList.toggle('is-collapsed');
                        thisQuestion.classList.toggle('is-expanded');
                        thisAnswer.classList.toggle('is-collapsed');
                        thisAnswer.classList.toggle('is-expanded');

                        thisAnswer.classList.toggle('animateIn');
                    };
                    for (var i=0,len=accordionToggles.length; i<len; i++) {
                        if(touchSupported) {
                          accordionToggles[i].addEventListener('touchstart', skipClickDelay, false);
                        }
                        if(pointerSupported){
                            accordionToggles[i].addEventListener('pointerdown', skipClickDelay, false);
                        }
                        accordionToggles[i].addEventListener('click', switchAccordion, false);
                    }
                });

//         });

