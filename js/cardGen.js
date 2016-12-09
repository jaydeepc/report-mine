         $(document).ready(function() {

                $.getJSON('result.json', function(jd) {
                    for (i = 0; i < jd.results.length; i++) {
                        if (jd.results[i].result == "FAILED"){

                            $("#report").append(
                                '<tr><td><p>' + jd.results[i].test_method_name + '</p></td><td><p>' + jd.results[i].test_class_name +
                                '</p></td><td><div class="arrow"></div></td></tr>' +
                                '<tr><td colspan="5"><pre><p style="display: none">' + jd.results[i].failure_trace + '</p></pre>' +
                                '</td></tr>'


                            );
                        }
                        else if (jd.results[i].result == "PASSED"){

                            $("#report_pass").append(
                                '<tr><td><p>' + jd.results[i].test_method_name + '</p></td><td><p>' + jd.results[i].test_class_name +
                                '</p></td><td><div class="arrow"></div></td></tr>' +
                                '<tr><td colspan="5"><pre><p style="display: none">Its all GREEN</p></pre>' +
                                '</td></tr>'


                            );
                        }
                        else if (jd.results[i].result == "ERROR"){

                            $("#report_error").append(
                                '<tr><td><p>' + jd.results[i].test_method_name + '</p></td><td><p>' + jd.results[i].test_class_name +
                                '</p></td><td><div class="arrow"></div></td></tr>' +
                                '<tr><td colspan="5"><pre><p style="display: none">' + jd.results[i].error_trace + '</p></pre>' +
                                '</td></tr>'


                            );
                        }
                        else if (jd.results[i].result == "SKIPPED"){

                            $("#report_skipped").append(
                                '<tr><td><p>' + jd.results[i].test_method_name + '</p></td><td><p>' + jd.results[i].test_class_name +
                                '</p></td><td><div class="arrow"></div></td></tr>' +
                                '<tr><td colspan="5"><pre><p style="display: none">' + jd.results[i].skipped_msg + '</p></pre>' +
                                '</td></tr>'


                            );
                        }

                    }
                });

                $(function() {
                    $("td[colspan=3]").find("p").hide();
                    $("table").click(function(event) {
                        event.stopPropagation();
                        var $target = $(event.target);
                        if ( $target.closest("td").attr("colspan") > 1 ) {
                            $target.slideUp();
                        } else {
                            $target.closest("tr").next().find("p").slideToggle();
                        }
                    });
                });




         });

