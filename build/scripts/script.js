$(document).ready(function(){

  $('#submission-form').submit(function(e) {

    if ($("#email").val() && $("#info").val()) {

      $("#submission-form").hide();
      $("#submission-form input").val("");
      $("#submission-form textarea").val("");

      $(".message").addClass("success");
      $(".message").text("Your message has been submitted successfully.");

      $.ajax({

            url: "https://docs.google.com/forms/d/e/1FAIpQLSeTDVuph6orVNtXd-hWp0L7d47JBg0pCuZr-qYcrBkzF5N1Uw/formResponse",
            data: $('#submission-form').serialize(),
            type: "POST",
            dataType: "xml",
            crossDomain: true,
            statusCode: {
                0: function() {
                    console.log("0")
                },
                200: function() {
                    console.log("weh")
                }
            }

      });

    }
    else {
      $(".message").addClass("error");
      $(".message").text("Something went wrong! Did you fill out all the required fields?");
    }



    e.preventDefault();

  });

});
