$(document).ready(function() {

    $complete_exe_summary = $("#stage");
    $scenarios_summary = $("#stage_spec");
    $execution_env_summary = $("#execution_details");
    $pagination = $(".pagination");

    $complete_exe_summary.show();
    $scenarios_summary.hide();
    $execution_env_summary.hide();

    $(document).on("click", ".scenario-button", function(e){
        $complete_exe_summary.hide();
//        $features_summary.hide('slide', {direction: 'left'}, 1000);
        $execution_env_summary.hide();
//        $steps_summary.hide('slide', {direction: 'left'}, 1000);
        $scenarios_summary.show();
//        $scenarios_summary.show('slide', {direction: 'right'}, 500);
        $pagination.show();

    });

    $(document).on("click", ".step-button", function(e){
        $complete_exe_summary.hide();
        $scenarios_summary.hide();
        $execution_env_summary.show();
//        $steps_summary.show('slide', {direction: 'right'}, 1000);
        $pagination.show();
    });

    $(document).on("click", ".feature-button", function(e){
        $scenarios_summary.hide();
        $execution_env_summary.hide();
        $complete_exe_summary.show();
//        $features_summary.show('slide', {direction: 'right'}, 1000);
        $pagination.show();
    });

});