$(document).ready(function() {
  $("#stage_spec").hide();
  $(".summary-page-table-heading").text("Complete");

  //Setup execution table column details
  $("#first-details").text("Appium Version");
  $("#second-details").text("Application Version");
  $("#third-details").text("Runner");
//  $("#fourth-details").text("Created On");

  //Hide data label in gaugechart
  $(".highcharts-label").hide();

  //setup config for gauguechart

  //setup result status

 $.getJSON('../config.json', function(jd) {
    $("#pass").attr("href", "test_result.html?status=" + jd.status.pass);
    $("#fail").attr("href", "test_result.html?status=" + jd.status.fail);
    $("#skip").attr("href", "test_result.html?status=" + jd.status.skip);
    $("#error").attr("href", "test_result.html?status=" + jd.status.error);

    $("#module-name").text(jd.result_view.module_name);
 });


});
