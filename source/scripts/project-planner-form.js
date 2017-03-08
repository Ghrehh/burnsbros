var budget = "<10000";

$(document).ready(function(){
  $('#project-planner-form').submit(function(e) {
    var email = $("#email").val();
    var info = $("#info").val();

    var validEmail = validateEmail(email);

    if (validEmail && info) {
      $(".error-alert").hide();
      $(".error-message").hide();
      $(".form-field").removeClass("form-error")
      $(".overlay").css({"display": "flex"})
      $.ajax({

            url: "https://docs.google.com/forms/d/e/1FAIpQLSeTDVuph6orVNtXd-hWp0L7d47JBg0pCuZr-qYcrBkzF5N1Uw/formResponse",
            data: $('#submission-form').serialize(),
            type: "POST",
            dataType: "xml",
            crossDomain: true,
            statusCode: {
                0: function() {

                },
                200: function() {

                }
            }

      });

    }
    else {
      $(".error-alert").show();
      $(".error-message").hide();
      $(".email-field").removeClass("form-error");
      $(".info-field").removeClass("form-error");

      if (validEmail === false) {
        $(".email-field").addClass("form-error");
        $(".email-field .error-message").show();
      }

      if (info == false) {
        $(".info-field").addClass("form-error");
        $(".info-field .error-message").show();
      }

    }



    e.preventDefault();

  });

  $(".budget-field .option").click(function(){
    $(".budget-field .option").removeClass("active-option");
    $(this).addClass("active-option");
    console.log(budget)
    budget = String($(this).data("budget"));
    var bar_filled_percentage = "0%";

    if ( budget === "<10000"){
      bar_filled_percentage = "0%";
    }
    else if ( budget === "20000"){
      bar_filled_percentage = "25%";
    }
    else if ( budget === "30000"){
      bar_filled_percentage = "50%";
    }
    else if ( budget === "40000"){
      bar_filled_percentage = "75%";
    }
    else if ( budget === "50000+"){
      bar_filled_percentage = "100%";
    }

    $(".bar-inner").animate({width: bar_filled_percentage}, 1000);

  })
});