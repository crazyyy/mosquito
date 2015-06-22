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

		show: function (dialog) {
			$('.block-super-left .contact-send').click(function (e) {
				e.preventDefault();
				// validate form
				if (contact.validate()) {
					var msg = $('.block-super-left .contact-message');
					msg.fadeOut(function () {
						msg.removeClass('contact-error').empty();
					});
					$('.block-super-left .contact-title').html('Sending...');
					$('.block-super-left form').fadeOut(200);
					$('.block-super-left .contact-content').animate({
						height: '260px'
					}, function () {
						$('.block-super-left .contact-loading').fadeIn(200, function () {
							$.ajax({
								url: 'data/form.php',
								data: $('.block-super-left form').serialize() + '&action=send',
								type: 'post',
								cache: false,
								dataType: 'html',
								success: function (data) {
									$('.block-super-left .contact-loading').fadeOut(200, function () {
										$('.block-super-left .contact-title').html('Thank you!');
										msg.html(data).fadeIn(200);
									});
								},
								error: contact.error
							});
						});
					});
				}
				else {
					if ($('.block-super-left .contact-message:visible').length > 0) {
						var msg = $('.block-super-left .contact-message div');
						msg.fadeOut(200, function () {
							msg.empty();
							contact.showError();
							msg.fadeIn(200);
						});
					}
					else {
						$('.block-super-left .contact-message').animate({
							height: '1px'
						}, contact.showError);
					}

				}
			});
		},
		close: function (dialog) {
			$('.block-super-left .contact-message').fadeOut();
			$('.block-super-left .contact-title').html('Goodbye...');
			$('.block-super-left form').fadeOut(200);
			$('.block-super-left .contact-content').animate({
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
			if (!$('.block-super-left #contact-name').val()) {
				contact.message += 'Укажите Ваше Имя. ';
			}

			var email = $('.block-super-left #contact-email').val();
			if (!email) {
				contact.message += 'Email is required. ';
			}
			else {
				if (!contact.validateEmail(email)) {
					contact.message += 'Email is invalid. ';
				}
			}

      if (!$('.block-super-left #contact-message').val()) {
        contact.message += 'Message is required.';
      }

      var contactPhoneLenght = $('.block-super-left .contact-phone').val().length;
      console.log(contactPhoneLenght);
      if (!$('.block-super-left .contact-phone').val()  ||  contactPhoneLenght < 15) {
        contact.message += 'Укажите Ваш телефон.';

      }

			if (contact.message.length > 0) {
				return false;
			}
			else {
				return true;
			}
		},
		validateEmail: function (email) {
			var at = email.lastIndexOf("@");

			// Make sure the at (@) sybmol exists and
			// it is not the first or last character
			if (at < 1 || (at + 1) === email.length)
				return false;

			// Make sure there aren't multiple periods together
			if (/(\.{2,})/.test(email))
				return false;

			// Break up the local and domain portions
			var local = email.substring(0, at);
			var domain = email.substring(at + 1);

			// Check lengths
			if (local.length < 1 || local.length > 64 || domain.length < 4 || domain.length > 255)
				return false;

			// Make sure local and domain don't start with or end with a period
			if (/(^\.|\.$)/.test(local) || /(^\.|\.$)/.test(domain))
				return false;

			// Check for quoted-string addresses
			// Since almost anything is allowed in a quoted-string address,
			// we're just going to let them go through
			if (!/^"(.+)"$/.test(local)) {
				// It's a dot-string address...check for valid characters
				if (!/^[-a-zA-Z0-9!#$%*\/?|^{}`~&'+=_\.]*$/.test(local))
					return false;
			}

			// Make sure domain contains only valid characters and at least one period
			if (!/^[-a-zA-Z0-9\.]*$/.test(domain) || domain.indexOf(".") === -1)
				return false;

			return true;
		},
		showError: function () {
			$('.block-super-left .contact-message')
				.html($('<div class="contact-error"></div>').append(contact.message))
				.fadeIn(200);
		}
	};

	contact.init();

});
