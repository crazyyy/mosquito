jQuery(function(e){var t={message:null,show:function(a){e(".block-super-left .contact-send").click(function(a){if(a.preventDefault(),t.validate()){var n=e(".block-super-left .contact-message");n.fadeOut(function(){n.removeClass("contact-error").empty()}),e(".block-super-left .contact-title").html("Sending..."),e(".block-super-left form").fadeOut(200),e(".block-super-left .contact-content").animate({height:"260px"},function(){e(".block-super-left .contact-loading").fadeIn(200,function(){e.ajax({url:"data/form.php",data:e(".block-super-left form").serialize()+"&action=send",type:"post",cache:!1,dataType:"html",success:function(t){e(".block-super-left .contact-loading").fadeOut(200,function(){e(".block-super-left .contact-title").html("Thank you!"),n.html(t).fadeIn(200)})},error:t.error})})})}else if(e(".block-super-left .contact-message:visible").length>0){var n=e(".block-super-left .contact-message div");n.fadeOut(200,function(){n.empty(),t.showError(),n.fadeIn(200)})}else e(".block-super-left .contact-message").animate({height:"1px"},t.showError)})},close:function(t){e(".block-super-left .contact-message").fadeOut(),e(".block-super-left .contact-title").html("Goodbye..."),e(".block-super-left form").fadeOut(200),e(".block-super-left .contact-content").animate({height:40},function(){t.data.fadeOut(200,function(){t.container.fadeOut(200,function(){t.overlay.fadeOut(200,function(){e.modal.close()})})})})},error:function(e){alert(e.statusText)},validate:function(){t.message="",e(".block-super-left #contact-name").val()||(t.message+="Укажите Ваше Имя. ");var a=e(".block-super-left #contact-email").val();a?t.validateEmail(a)||(t.message+="Email is invalid. "):t.message+="Email is required. ",e(".block-super-left #contact-message").val()||(t.message+="Message is required.");var n=e(".block-super-left .contact-phone").val().length;return console.log(n),(!e(".block-super-left .contact-phone").val()||15>n)&&(t.message+="Укажите Ваш телефон."),t.message.length>0?!1:!0},validateEmail:function(e){var t=e.lastIndexOf("@");if(1>t||t+1===e.length)return!1;if(/(\.{2,})/.test(e))return!1;var a=e.substring(0,t),n=e.substring(t+1);return a.length<1||a.length>64||n.length<4||n.length>255?!1:/(^\.|\.$)/.test(a)||/(^\.|\.$)/.test(n)?!1:(/^"(.+)"$/.test(a)||/^[-a-zA-Z0-9!#$%*\/?|^{}`~&'+=_\.]*$/.test(a))&&/^[-a-zA-Z0-9\.]*$/.test(n)&&-1!==n.indexOf(".")?!0:!1},showError:function(){e(".block-super-left .contact-message").html(e('<div class="contact-error"></div>').append(t.message)).fadeIn(200)}};t.init()});