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

function moveArrows(mPos){
  var arrows = $(".arrow")

  for (var i = 0; i < arrows.length; i++){
    var arrow = arrows.eq(i);

    var arrY = arrow.offset().top - arrow.height();
    var arrX = arrow.offset().left - (arrow.width() / 2);

    var adj = (mPos.y - 30) - arrY;
    var opp = (mPos.x - 30) - arrX;





    var angle = Math.atan(opp / adj) * 180/Math.PI;
      angle = angle - angle - angle;
    if (adj < 0) {
      angle = angle + 180;
    }


    $(arrow).css({"transform": "rotate(" + angle + "deg)"});

  }

  setTimeout(function(){
    moveArrows(mPos);
  }, 1000 / 60);


}

$(document).ready(function(){

  var mPos = { x: -1,
                y: -1 }

   $(document).mousemove(function(event) {
       mPos.x = event.pageX;
       mPos.y = event.pageY;
   });

  var IS_IPAD = (navigator.userAgent.match(/iPad/i) != null);
  var IS_IPHONE = (navigator.userAgent.match(/iPhone/i) != null) || (navigator.userAgent.match(/iPod/i) != null);
  var IS_SAFARI = (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1);


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

  if (IS_IPAD || IS_IPHONE || IS_SAFARI) {
    $(".orange-button-form").addClass("orange-button-form-fix")
  }

  if ($(".arrow")){

    setTimeout(function(){
      moveArrows(mPos);
    }, 200);
  }

});
