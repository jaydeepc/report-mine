 $(document).ready(function() {
     $.getJSON('../data/result.json', function(jd) {
        var platform = {};
        var platforms = {};
        var my_array = [];


        for(i=0; i<jd.report.tests.length; i++){
          platform_name = jd.report.tests[i].model;
          var count = (platform[platform_name] || 0) + 1;
          platform[platform_name] = count;
        }

        for (key in platform) {
            var details = {};
            pass_count_key = "pass_count";
            var pass_count = 0;
            fail_count_key = "fail_count";
            var fail_count = 0;
            skip_count_key = "skip_count";
            var skip_count = 0;
            error_count_key = "error_count";
            var error_count = 0;
            var platform_name = "";
            var version = "";

            for (i=0; i < jd.report.tests.length; i++){
                if(jd.report.tests[i].model == key){
                    platform_name = jd.report.tests[i].platform;
                    version = jd.report.tests[i].version;
                    if (jd.report.tests[i].testDetails.results == 'Pass'){
                        pass_count = pass_count + 1;
                    }
                    else if (jd.report.tests[i].testDetails.results == 'Fail'){
                        fail_count = fail_count + 1;
                    }
                    else if (jd.report.tests[i].testDetails.results == 'Skip'){
                        skip_count = skip_count + 1;
                    }
                    else if (jd.report.tests[i].testDetails.results == 'Error'){
                        error_count = error_count + 1;
                    }

                }
            }
            details['total'] = platform[key];
            details[pass_count_key] = pass_count;
            details[fail_count_key] = fail_count;
            details[skip_count_key] = skip_count;
            details[error_count_key] = error_count;
            details["platform"] = platform_name;
            details["version"] = version;
            platforms[key] = details;

        }

//        document.write(JSON.stringify(platforms));
        for (key in platforms){
                var logo = "";
//
               var failed_link = "";
               var passed_link = "";
               var skipped_link = "";
               var error_link = ""

               if (platforms[key]['fail_count'] > 0){
                    failed_link = "<li><b><a class='link-font' href='test_result.html?device=" + key + "&status=Fail'>" + platforms[key]['fail_count'] + "</b> - Tests Failed</li></a>";
               }
               else{
                    failed_link = "<li><b>" + platforms[key]['fail_count'] + "</b> - Tests Failed</li>";
               }
//
               if (platforms[key]['pass_count'] > 0){
                    passed_link = "<li><b><a class='link-font' href='test_result.html?device=" + key + "&status=Pass'>" + platforms[key]['pass_count'] + "</b> - Tests Passed</li></a>";
               }
               else{
                    passed_link = "<li class='link-font'><b>" + platforms[key]['pass_count'] + "</b> - Tests Passed</li>";
               }
//
               if (platforms[key]['error_count'] > 0){
                    error_link = "<li><b><a class='link-font' href='test_result.html?device=" + key + "&status=Error'>" + platforms[key]['error_count'] + "</b> - Tests Errored Out</li></a>";
               }
               else{
                    error_link = "<li><b>" + platforms[key]['error_count'] + "</b> - - Tests Errored Out</li>";
               }

               if (platforms[key]['skip_count'] > 0){
                    skipped_link = "<li><b><a class='link-font' href='test_result.html?device=" + key + "&status=Skip'>" + platforms[key]['skip_count'] + "</b> - Tests Skipped</li></a>";
               }
               else{
                    skipped_link = "<li><b>" + platforms[key]['skip_count'] + "</b> - Tests Skipped</li>";
               }

                device_name = key.split("_")[0].replace(/([A-Z]+)*([A-Z][a-z])/g, "$1 $2")
                if (platforms[key]["platform"] == "ANDROID"){
                    logo = "../images/android.png";
                }
                else{
                    logo = "../images/apple.png";
                }

               $("#promo").append(
                  '<div class="promo"><h4>' + device_name + '</h4>' +
                  '<ul class="features">' +
                      '<li class="brief"><span id="platform-name">' + platforms[key]["platform"] + ' Version - </span><span class="version">' + platforms[key]["version"] + '</span></li>' +
                      '<li class="price"><img class="dev-logo" src="' + logo + '" /></li>' + passed_link + failed_link + error_link + skipped_link +
                      '<li class="buy"><button>Check All Tests</button></li>' +
                      '</ul></div>'
              );

        }
    });
 });