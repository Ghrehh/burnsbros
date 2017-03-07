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
});