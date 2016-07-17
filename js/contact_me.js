$(function() {

    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            // Prevent spam click and default submit behaviour
            $("#btnSubmit").attr("disabled", true);
            event.preventDefault();

            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }

            var id = 204977;
			      var subject = phone;
      			var grecaptcharesponse ;
            if(typeof $('textarea[name=g-recaptcha-response]') !== 'undefined') grecaptcharesponse = $('textarea[name=g-recaptcha-response]').val(); else grecaptcharesponse ='';

      			var dataString = 'id='+ id + '&name=' + name + '&email=' + email + '&subject=' + subject + '&message=' + message + '&grecaptcharesponse=' + grecaptcharesponse;
            			//alert(dataString);
            			$('#response').html("Sending...");

            			$.ajax({
            				type: "POST",
            				url: "http://kontactr.com/xuser/process",
            				data: dataString,
            				success: function(html) {
                      console.log(html);
            						if(html == "1")
            						{
            							$('#response').html('<div class="error">All fields are required</div>');
            							$('input[value=]').first().focus();
            						}
            						else if(html == "2")
            						{
            							$('#response').html('<div class="error">Invalid email address</div>');
            							$('input[name=email]').focus();
            						}
            						else if(html == "3")
            						{
            							$('#response').html('<div class="error">reCAPTCHA not validated</div>');
            						}
            						else // if(html == "Success")
            						{
            							$('#kform').html('<div class="success">Your message has been sent successfully. Want a <a href="http://kontactr.com/signup" target="_blank">contact form</a> like this?</div>');
            						}
            					}
            			});

            /*
            $.ajax({
                url: "http://kontactr.com/xuser/process",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    message: message
                },
                cache: false,
                success: function() {
                    // Enable button & show success message
                    $("#btnSubmit").attr("disabled", false);
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            });*/
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

// When clicking on Full hide fail/success boxes
$('#name').focus(function() {
    $('#success').html('');
});
