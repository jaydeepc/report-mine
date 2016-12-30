$(document).ready(function() {
  $("#stage_spec").hide();
  $(".summary-page-table-heading").text("Complete");

  //Setup execution table column details
  $("#first-details").text("Platform");
  $("#second-details").text("Python Version");
  $("#third-details").text("Execution Time");
  $("#fourth-details").text("Created On");

  //Hide data label in gaugechart
  $(".highcharts-label").hide();

  //setup config for gauguechart
});
