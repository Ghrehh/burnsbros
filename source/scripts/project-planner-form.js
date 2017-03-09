var budget = "<10000";
var project_type = "Web Development";
var start_date = "ASAP";
var deadline = "ASAP";

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

  $(".project-type .option").click(function(){
    $(".project-type .option").removeClass("active-option");

    $(this).addClass("active-option")
    project_type = $(this).data("value");
  })

  $(".start-date .option").click(function(){
    $(".start-date .option").removeClass("active-option");

    $(this).addClass("active-option")
    start_date = $(this).data("value");
  })

  $(".deadline .option").click(function(){
    $(".deadline .option").removeClass("active-option");

    $(this).addClass("active-option")
    deadline = $(this).data("value");
    console.log(deadline)
  })

  $(".budget-field .option").click(function(){
    $(".budget-field .option").removeClass("active-option");
    $(".budget-field .number").removeClass("active-number");

    $(this).find(".number").addClass("active-number");
    

    budget = String($(this).data("budget"));
    var bar_filled_percentage = "0%";

    if ( budget === "<10000"){
      bar_filled_percentage = "0%";
      $(".budget-field .option-1").addClass("active-option");
    }
    else if ( budget === "20000"){
      bar_filled_percentage = "25%";
      $(".budget-field .option-1, .budget-field .option-2").addClass("active-option");
    }
    else if ( budget === "30000"){
      bar_filled_percentage = "50%";
      $(".budget-field .option-1, .budget-field .option-2, .budget-field .option-3").addClass("active-option");
    }
    else if ( budget === "40000"){
      bar_filled_percentage = "75%";
      $(".budget-field .option-1, .budget-field .option-2, .budget-field .option-3, .budget-field .option-4").addClass("active-option");
    }
    else if ( budget === "50000+"){
      bar_filled_percentage = "100%";
      $(".budget-field .option-1, .budget-field .option-2, .budget-field .option-3, .budget-field .option-4, .budget-field .option-5").addClass("active-option");
    }

    $(".bar-inner").animate({width: bar_filled_percentage}, 500);

  })
});