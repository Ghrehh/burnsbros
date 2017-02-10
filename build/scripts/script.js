//taken from http://stackoverflow.com/questions/8425701/ajax-mailchimp-signup-form-integration
function register($form) {
  var mc_message = $(".mailchimp-message");
    $.ajax({
        type: $form.attr('method'),
        url: $form.attr('action'),
        data: $form.serialize(),
        cache       : false,
        dataType    : 'json',
        contentType: "application/json; charset=utf-8",
        error       : function(err) { alert("Could not connect to the registration server. Please try again later."); },
        success     : function(data) {
            if (data.result != "success") {
                console.log("something went wrong")
                mc_message.addClass("error");
                mc_message.text("Something went wrong, please try again.");
            } else {
                console.log("all good")
                mc_message.addClass("success");
                mc_message.text("Please check your email to confirm your subscription.");
                $(".email-field").val("");
            }
        }
    });
}

$(document).ready(function(){

  $('#submission-form').submit(function(e) {

    if ($("#email").val() && $("#info").val()) {

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

      $("#submission-form").hide();
      $("#submission-form input").val("");
      $("#submission-form textarea").val("");

      $(".message").addClass("success");
      $(".message").text("Your message has been submitted successfully.");

    }
    else {
      $(".message").addClass("error");
      $(".message").text("Something went wrong! Did you fill out all the required fields?");
    }



    e.preventDefault();

  });

  var $form = $('#email-submission');

  if ( $form.length > 0 ) {
      $('form input[type="submit"]').bind('click', function ( event ) {
          if ( event ) event.preventDefault();
          register($form);
      });
  }

  var header_h1 = $("header h1")
  var header_p = $("header p")

  var dur = 700;

  header_h1.css({"position": "relative", "bottom": "200px", "opacity": "0"})
  header_h1.animate({bottom: "0px", opacity: "1"}, dur + 200)

  header_p.css({"position": "relative", "bottom": "200px", "opacity": "0"})
  header_p.animate({bottom: "0px", opacity: "1"}, dur)


  var card1 = $("#our-process-card");
  var card2 = $("#newsletter-card");

  card1.css({"position": "relative", "right": "200px"})
  card2.css({"position": "relative", "left": "200px"})

  card1.animate({right: "-20px", opacity: "1"}, 500, function(){
    card1.animate({right: "10px"}, 500, function(){
      card1.animate({right: "0px"}, 700)
    })
  })
  card2.animate({left: "-20px", opacity: "1"}, 500, function(){
    card2.animate({left: "10px"}, 500, function(){
      card2.animate({left: "0px"}, 700);
    })
  })

});
