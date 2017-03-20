var project_types = {"Web Development": false,
                     "App Development": false,
                     "Research and Consulting": false,
                     "Something Else": false,  
                    };

var start_date = false;
var deadline = false;

var budget = "50000+";

function hasSelectedProjectType(){
  if (project_types["Web Development"]){
    return true;
  }
  else if (project_types["App Development"]){
    return true;
  }
  else if (project_types["Research and Consulting"]){
    return true;
  }
  else if (project_types["Something Else"]){
    return true;
  }
  else {
    return false;
  }
}

function getSelectedProjectTypes(){
  var results = [];

  if (project_types["Web Development"]){
    results.push("Web Development");
  }
  if (project_types["App Development"]){
    results.push("App Development");
  }
  if (project_types["Research and Consulting"]){
    results.push("Research and Consulting");
  }
  if (project_types["Something Else"]){
    results.push("Something Else");
  }

  return results;
}


$(document).ready(function(){

  //form
  $('#project-planner-form').submit(function(e) {

    //required
    var name = $("#name").val();
    var email = $("#email").val();
    var valid_email = validateEmail($("#email").val());
    var info = $("#info").val();

    //not required
    var organisation = $("#organisation").val();
    var phone = $("#phone").val();

    //custom fields wont update the relevant variable until the next time the button is clicked in the on click method.
    //easier to assign the calendar values here than do it in the on click method
    if (start_date === "Custom") { start_date = $(".start-date").find(".calendar-field").val() }
    if (deadline === "Custom") { deadline = $(".deadline").find(".calendar-field").val() }

    //check if all required fields are filled, if they are, perform ajax request, if not make visible necessary error messages
    if (name && valid_email && info && hasSelectedProjectType() && start_date && deadline && budget) {
      $(".error-alert").hide();
      $(".error-message").hide();
      $(".form-field").removeClass("form-error")
      $(".overlay").css({"display": "flex"})

      var form_data = {"entry.1924694001": name,
                      "entry.1855561109": organisation,
                      "entry.1254274625": email,
                      "entry.1214020820": phone,
                      "entry.38978248": getSelectedProjectTypes().join(", "),
                      "entry.567273467": info,
                      "entry.873647966": start_date,
                      "entry.940227614": deadline,
                      "entry.778812851": budget}
      var url_data = $.param(form_data);

      //console.log(form_data)
      
      $.ajax({

            url: "https://docs.google.com/forms/d/e/1FAIpQLSdK9YWsyj3uHhMEgYjzPweeH6Ye6GqNWuSQg8gQzh4nzn0AwA/formResponse",
            data: url_data,
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
      $(".form-field").removeClass("form-error");

      if (name == false) {
        $(".name-field").addClass("form-error");
      }

      if (valid_email == false) {
        $(".email-field").addClass("form-error");
      }

      if (info == false) {
        $(".info-field").addClass("form-error");
      }

      if (!hasSelectedProjectType()) {
        $(".project-type-field").addClass("form-error");
      }

      if (start_date == false) {
        $(".start-date-field").addClass("form-error");
        
      }

      if (deadline == false) {
        $(".deadline-field").addClass("form-error");
      }

      if (budget == false) {
        $(".budget-field").addClass("form-error");
      }

    }

    //prevents form from firing
    e.preventDefault();

  });

  //send another button
  $("#project-planner .send-another").click(function(){
    $(".overlay").hide()
  })

  //custom form on click methods

  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

    var pt1 = new Hammer(document.getElementById('pt-first'));
    var pt2 = new Hammer(document.getElementById('pt-second'));
    var pt3 = new Hammer(document.getElementById('pt-third'));
    var pt4 = new Hammer(document.getElementById('pt-fourth'));

    var sd_asap = new Hammer(document.getElementById('sd-asap'));
    var sd_no_rush = new Hammer(document.getElementById('sd-no-rush'));
    var sd_custom = new Hammer(document.getElementById('sd-custom'));

    var dl_asap = new Hammer(document.getElementById('dl-asap'));
    var dl_no_rush = new Hammer(document.getElementById('dl-no-rush'));
    var dl_custom = new Hammer(document.getElementById('dl-custom'));

    var b1 = new Hammer(document.getElementById('b-first'));
    var b2 = new Hammer(document.getElementById('b-second'));
    var b3 = new Hammer(document.getElementById('b-third'));
    var b4 = new Hammer(document.getElementById('b-fourth'));
    var b5 = new Hammer(document.getElementById('b-fifth'));

    //project types
    pt1.on("tap press", function(ev) {
      var id = "#pt-first"
      var data = $(id).data("value"); 

      if ($(id).hasClass("active-option")) {
        $(id).removeClass("active-option");
        project_types[data] = false;
      }
      else {
        $(id).addClass("active-option");
        project_types[data] = true;
      }

      console.log(project_types)
        
    });

    pt2.on("tap press", function(ev) {
      var id = "#pt-second"
      var data = $(id).data("value"); 

      if ($(id).hasClass("active-option")) {
        $(id).removeClass("active-option");
        project_types[data] = false;
      }
      else {
        $(id).addClass("active-option");
        project_types[data] = true;
      }

      console.log(project_types)
        
    });

    pt3.on("tap press", function(ev) {
      var id = "#pt-third"
      var data = $(id).data("value"); 

      if ($(id).hasClass("active-option")) {
        $(id).removeClass("active-option");
        project_types[data] = false;
      }
      else {
        $(id).addClass("active-option");
        project_types[data] = true;
      }

      console.log(project_types)
        
    });

    pt4.on("tap press", function(ev) {
      var id = "#pt-fourth"
      var data = $(id).data("value"); 

      if ($(id).hasClass("active-option")) {
        $(id).removeClass("active-option");
        project_types[data] = false;
      }
      else {
        $(id).addClass("active-option");
        project_types[data] = true;
      }

      console.log(project_types)
        
    });

    //start date
    sd_asap.on("tap press", function(ev){
      var id = "#sd-asap";
      $(".start-date .option").removeClass("active-option");

      //hide all custom value fields and show default custom message
      $(".start-date .option").find(".body-writing").css({"opacity": "1"});
      $(".start-date .option").find(".calendar-field").css({"opacity": "0"});

      //if it's the custom field, hide the custom value message and display the custom value field
      if ($(id).data("value") === "Custom") {
        $(id).find(".body-writing").css({"opacity": "0"});
        $(id).find(".calendar-field").css({"opacity": "1"});
      }

      start_date = $(id).data("value");

      $(id).addClass("active-option")
      console.log(start_date);
    })

    sd_no_rush.on("tap press", function(ev){
      var id = "#sd-no-rush";
      $(".start-date .option").removeClass("active-option");

      //hide all custom value fields and show default custom message
      $(".start-date .option").find(".body-writing").css({"opacity": "1"});
      $(".start-date .option").find(".calendar-field").css({"opacity": "0"});

      //if it's the custom field, hide the custom value message and display the custom value field
      if ($(id).data("value") === "Custom") {
        $(id).find(".body-writing").css({"opacity": "0"});
        $(id).find(".calendar-field").css({"opacity": "1"});
      }

      start_date = $(id).data("value");

      $(id).addClass("active-option")
      console.log(start_date);
    })

    sd_custom.on("tap press", function(ev){
      var id = "#sd-custom";
      $(".start-date .option").removeClass("active-option");

      //hide all custom value fields and show default custom message
      $(".start-date .option").find(".body-writing").css({"opacity": "1"});
      $(".start-date .option").find(".calendar-field").css({"opacity": "0"});

      //if it's the custom field, hide the custom value message and display the custom value field
      if ($(id).data("value") === "Custom") {
        $(id).find(".body-writing").css({"opacity": "0"});
        $(id).find(".calendar-field").css({"opacity": "1"});
      }

      start_date = $(id).data("value");

      $(id).addClass("active-option")
      console.log(start_date);
    })

    //deadline
    dl_asap.on("tap press", function(ev){
      var id = "#dl-asap";
      $(".deadline .option").removeClass("active-option");

      //hide all custom value fields and show default custom message
      $(".deadline .option").find(".body-writing").css({"opacity": "1"});
      $(".deadline .option").find(".calendar-field").css({"opacity": "0"});

      //if it's the custom field, hide the custom value message and display the custom value field
      if ($(id).data("value") === "Custom") {
        $(id).find(".body-writing").css({"opacity": "0"});
        $(id).find(".calendar-field").css({"opacity": "1"});

      }

      deadline = $(id).data("value");


      $(id).addClass("active-option")

      console.log(deadline);
      
    })

    dl_no_rush.on("tap press", function(ev){
      var id = "#dl-no-rush";
      $(".deadline .option").removeClass("active-option");

      //hide all custom value fields and show default custom message
      $(".deadline .option").find(".body-writing").css({"opacity": "1"});
      $(".deadline .option").find(".calendar-field").css({"opacity": "0"});

      //if it's the custom field, hide the custom value message and display the custom value field
      if ($(id).data("value") === "Custom") {
        $(id).find(".body-writing").css({"opacity": "0"});
        $(id).find(".calendar-field").css({"opacity": "1"});

      }

      deadline = $(id).data("value");


      $(id).addClass("active-option")

      console.log(deadline);
      
    })

    dl_custom.on("tap press", function(ev){
      var id = "#dl-custom";
      $(".deadline .option").removeClass("active-option");

      //hide all custom value fields and show default custom message
      $(".deadline .option").find(".body-writing").css({"opacity": "1"});
      $(".deadline .option").find(".calendar-field").css({"opacity": "0"});

      //if it's the custom field, hide the custom value message and display the custom value field
      if ($(id).data("value") === "Custom") {
        $(id).find(".body-writing").css({"opacity": "0"});
        $(id).find(".calendar-field").css({"opacity": "1"});

      }

      deadline = $(id).data("value");


      $(id).addClass("active-option")

      console.log(deadline);
      
    })

    //budget
    b1.on("tap press", function(ev){
      var id = "#b-first";
      $(".budget-field .option").removeClass("active-option");
      $(".budget-field .number").removeClass("active-number");

      $(id).find(".number").addClass("active-number");
      $(id).addClass("active-option");
      
      budget = String($(id).data("budget"));

      console.log(budget);
    })

    b2.on("tap press", function(ev){
      var id = "#b-second";
      $(".budget-field .option").removeClass("active-option");
      $(".budget-field .number").removeClass("active-number");

      $(id).find(".number").addClass("active-number");
      $(id).addClass("active-option");
      
      budget = String($(id).data("budget"));

      console.log(budget);
    })

    b3.on("tap press", function(ev){
      var id = "#b-third";
      $(".budget-field .option").removeClass("active-option");
      $(".budget-field .number").removeClass("active-number");

      $(id).find(".number").addClass("active-number");
      $(id).addClass("active-option");
      
      budget = String($(id).data("budget"));

      console.log(budget);
    })

    b4.on("tap press", function(ev){
      var id = "#b-fourth";
      $(".budget-field .option").removeClass("active-option");
      $(".budget-field .number").removeClass("active-number");

      $(id).find(".number").addClass("active-number");
      $(id).addClass("active-option");
      
      budget = String($(id).data("budget"));

      console.log(budget);
    })

    b5.on("tap press", function(ev){
      var id = "#b-fifth";
      $(".budget-field .option").removeClass("active-option");
      $(".budget-field .number").removeClass("active-number");

      $(id).find(".number").addClass("active-number");
      $(id).addClass("active-option");
      
      budget = String($(id).data("budget"));

      console.log(budget);
    })
    

  }
  else {

    $(".project-type .option").click(function(){

      if ($(this).hasClass("active-option")){
        $(this).removeClass("active-option");

        var data = $(this).data("value"); 
        project_types[data] = false;
      }
      else {
        $(this).addClass("active-option");

        var data = $(this).data("value"); 
        project_types[data] = true;
      }

      console.log(project_types)

    })

    $(".start-date .option").click(function(){
      $(".start-date .option").removeClass("active-option");

      //hide all custom value fields and show default custom message
      $(".start-date .option").find(".body-writing").css({"opacity": "1"});
      $(".start-date .option").find(".calendar-field").css({"opacity": "0"});

      //if it's the custom field, hide the custom value message and display the custom value field
      if ($(this).data("value") === "Custom") {
        $(this).find(".body-writing").css({"opacity": "0"});
        $(this).find(".calendar-field").css({"opacity": "1"});
      }

      start_date = $(this).data("value");


      $(this).addClass("active-option")
      
    })

    $(".deadline .option").click(function(){
      $(".deadline .option").removeClass("active-option");

      //hide all custom value fields and show default custom message
      $(".deadline .option").find(".body-writing").css({"opacity": "1"});
      $(".deadline .option").find(".calendar-field").css({"opacity": "0"});

      //if it's the custom field, hide the custom value message and display the custom value field
      if ($(this).data("value") === "Custom") {
        $(this).find(".body-writing").css({"opacity": "0"});
        $(this).find(".calendar-field").css({"opacity": "1"});

      }

      deadline = $(this).data("value");


      $(this).addClass("active-option")
      
      
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
  }

  

  //add date pickers, jquery-ui code of the date pickers is added at the bottom of the
  $( ".calendar-field" ).datepicker({ dateFormat: 'dd-mm-yy' });
});