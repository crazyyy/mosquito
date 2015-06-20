/*
 * SimpleModal Contact Form
 * http://simplemodal.com
 *
 * Copyright (c) 2013 Eric Martin - http://ericmmartin.com
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */

jQuery(function ($) {
  var contact = {
    message: null,
    init: function () {
      $('header .recall').click(function (e) {
        e.preventDefault();

        // load the contact form using ajax
        $.get('data/contact.php', function (data) {
          // create a modal dialog with the data
          $(data).modal({
            closeHTML: '<a href="#" title="Close" class="modal-close"></a>',
            position: ['15%'],
            overlayId: 'contact-overlay',
            containerId: 'contact-container',
            onOpen: contact.open,
            onShow: contact.show,
            onClose: contact.close
          });
        });
      });
    },
    open: function (dialog) {
      // dynamically determine height
      var h = 280;

      $('#contact-container .contact-title').html('Загрузка...');
      dialog.overlay.fadeIn(200, function () {
        dialog.container.fadeIn(200, function () {
          dialog.data.fadeIn(200, function () {
            $('#contact-container .contact-content').animate({
              height: h
            }, function () {
              $('#contact-container form').fadeIn(200, function () {
                $('#contact-container #contact-name').focus();
              });
            });
          });
        });
      });
    },
    show: function (dialog) {
      $('#contact-container .contact-send').click(function (e) {
        e.preventDefault();
        // validate form
        if (contact.validate()) {
          var msg = $('#contact-container .contact-message');
          msg.fadeOut(function () {
            msg.removeClass('contact-error').empty();
          });
          $('#contact-container .contact-title').html('Отправка...');
          $('#contact-container form').fadeOut(200);
          $('#contact-container .contact-content').animate({
            height: '80px'
          }, function () {
            $('#contact-container .contact-loading').fadeIn(200, function () {
              $.ajax({
                url: 'data/contact.php',
                data: $('#contact-container form').serialize() + '&action=send',
                type: 'post',
                cache: false,
                dataType: 'html',
                success: function (data) {
                  $('#contact-container .contact-loading').fadeOut(200, function () {
                    $('#contact-container .contact-title').html('Спасибо!');
                    msg.html(data).fadeIn(200);
                  });
                },
                error: contact.error
              });
            });
          });
        }
      });
    },
    close: function (dialog) {
      $('#contact-container .contact-message').fadeOut();
      $('#contact-container form').fadeOut(200);
      $('#contact-container .contact-content').animate({
        height: 40
      }, function () {
        dialog.data.fadeOut(200, function () {
          dialog.container.fadeOut(200, function () {
            dialog.overlay.fadeOut(200, function () {
              $.modal.close();
            });
          });
        });
      });
    },
    error: function (xhr) {
      alert(xhr.statusText);
    },
    validate: function () {
      contact.message = '';

      if (!$('#contact-container #contact-name').val()) {
        contact.message += 'Введите ваше имя. ';
      }

      var email = $('#contact-container #contact-email').val();
      if (!email) {
        contact.message += 'Укажите корректный телефон ';
      } else {
        if (!contact.validateEmail(email)) {
          contact.message += 'Телефон указан с ошибкой. ';
        }
      }
    },
    validateEmail: function (email) {

      // Check lengths
      if (email.length < 5) return false;

      // // Make sure domain contains only valid characters and at least one period
      // if (!/^[-0-9\.]*$/.test(email)  === -1)
      //   return false;

      return true;
    },
    showError: function () {
      $('#contact-container .contact-message')
        .html($('<div class="contact-error"></div>').append(contact.message))
        .fadeIn(200);
    }
  };

  contact.init();

});
