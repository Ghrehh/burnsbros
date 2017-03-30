var mPos = { x: -1,y: -1 }
var arrowAngles = [];

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

function moveArrows(mPos, arrowAngles){
  var arrows = $(".svg-arrow")
  var isHovered = $('#project-planner').is(":hover");

  if (isHovered) {

    for (var i = 0; i < arrows.length; i++){
      var arrow = arrows.eq(i);

      var arrY = arrow.offset().top - arrow.height();
      var arrX = arrow.offset().left - (arrow.width() / 2);

      var adj = (mPos.y - 55) - arrY;
      var opp = (mPos.x - 30) - arrX;





      var angle = Math.atan(opp / adj) * 180/Math.PI;
        angle = angle - angle - angle;
      if (adj < 0) {
        angle = angle + 180;
      }

      arrowAngles[i] = angle;
      $(arrow).css({"transform": "rotate(" + angle + "deg)"});

    }
  }
  else {

    for (var i = 0; i < arrows.length; i++){
      var arrow = arrows.eq(i);
      var angle  = arrowAngles[i];


      if (angle > 0) {
        angle = angle - 3;
        if (angle < 0) {angle = 0}
        arrowAngles[i] = angle;
        $(arrow).css({"transform": "rotate(" + angle + "deg)"});

      }
      else if (angle < 0) {
        angle = angle + 3;
        if (angle > 0) {angle = 0}
        arrowAngles[i] = angle;
        $(arrow).css({"transform": "rotate(" + angle + "deg)"});
      }
    }
  }

  setTimeout(function(){
    //moveArrows(mPos, arrowAngles);
  }, 1000 / 120);


}

function checkForAppleDevices(){
  var IS_IPAD = (navigator.userAgent.match(/iPad/i) != null);
  var IS_IPHONE = (navigator.userAgent.match(/iPhone/i) != null) || (navigator.userAgent.match(/iPod/i) != null);
  var IS_SAFARI = (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1);

  if (IS_IPAD || IS_IPHONE || IS_SAFARI) {
    $(".orange-button-form").addClass("orange-button-form-fix")
  }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function resizeHeroItem(){
  var window_height = $(window).height();
  var nav_height = $("#top-nav").height();

  var hero_item_height = $("#vertical-center").height(); //item actually containing content

  if (window_height > hero_item_height) {

    $("#index").css({"height": ((window_height - nav_height) * 1) + "px"})
    $("#vertical-center").css({"padding-bottom": ((window_height - nav_height) * 0.025) + "px"})
    $("header").css({"padding":"0px"})

    console.log("resizing hero item")

  }
  else {

    $("#index").removeAttr("style")
    $("#vertical-center").removeAttr("style")
    $("header").removeAttr("style")
    
    console.log("did not resize hero item, screen too small")
  }
}




$(document).ready(function(){

  
  checkForAppleDevices();

  //tracks mouse movement;
  $(document).mousemove(function(event) {
       mPos.x = event.pageX;
       mPos.y = event.pageY;
   });

  //contact form
  $('#contact-form').submit(function(e) {
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
            data: $('#contact-form').serialize(),
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

      $(window).scrollTop($("#success-scroll").offset().top)

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


  //send another button that appears after a message is submitted on the contact screen
  $("#say-hello .send-another").click(function(){
    $(".overlay").hide()
  })

  //newsletter signup
  var $form = $('#email-submission');
  if ( $form.length > 0 ) {
      $('#email-submission input[type="submit"]').bind('click', function ( event ) {
          if ( event ) event.preventDefault();
          register($form);
      });
  }

  //animates svg arrows on contact page
  if ($(".svg-arrow").length > 0){

    moveArrows(mPos, arrowAngles);

  }

  //homepage fullscreen
  if($("#index").length > 0){
    resizeHeroItem();

    $(window).resize(function(){
      resizeHeroItem();
    })
  }

  //mobile menu open and close
  $("#mobile-menu-open").click(function(){
    $("#mobile-menu-inner").css({"height": $(window).height() + "px"})
    $("#mobile-menu").fadeIn(200);
    //$("body").css({"overflow":"hidden"});
    $(".logo-link").addClass("logo-link-mobile-menu");
    $("#mobile-menu .about-link ").addClass("link-animate");
    $("#mobile-menu .projects-link ").addClass("link-animate-slow");
    $("#mobile-menu .contact-link ").addClass("link-animate-slower");
    
  })

  $("#mobile-menu-close").click(function(){
    $("#mobile-menu").fadeOut(200);
    //$("body").css({"overflow":"initial"});
    $(".logo-link").removeClass("logo-link-mobile-menu");
  })




});


$(window).on('load', function(){ 
  
  $("body").css({"display":"none", "opacity": 1}).fadeIn(150);

  //$("nav").css({"animation":"fall-fade-in 0.6s forwards"})
  $("header").css({"animation":"fall-fade-in 0.6s forwards"})
  $("main").css({"animation":"fall-fade-in 1s forwards"})

  $("header .title-container").css({"animation":"rise-fade-in 1.2s forwards"})
  $("header .page-description").css({"animation":"rise-fade-in 1.5s forwards"})
  $("header .body-writing").css({"animation":"rise-fade-in 1.7s forwards"})


})