// Avoid `console` errors in browsers that lack a console.
(function () {
  var method;
  var noop = function () {};
  var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
        console[method] = noop;
    }
}
}());

$('.tel').mask('0 (000) 000-00-00');

// $(document).ready(function(){
//   $('.catalog-slides').slick({
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     variableWidth: 300,
//     autoplay: false,
//     autoplaySpeed: 2000
//   });
// });

$(function () {
    $('header').stickyNavbar({
    activeClass: "active",          // Class to be added to highlight nav elements
    sectionSelector: "scrollto",    // Class of the section that is interconnected with nav links
    animDuration: 500,              // Duration of jQuery animation
    startAt: 1,                     // Stick the menu at XXXpx from the top of the this() (nav container)
    easing: "linear",               // Easing type if jqueryEffects = true, use jQuery Easing plugin to extend easing types - gsgd.co.uk/sandbox/jquery/easing
    animateCSS: true,               // AnimateCSS effect on/off
    animateCSSRepeat: false,        // Repeat animation everytime user scrolls
    cssAnimation: "fadeInDown",     // AnimateCSS class that will be added to selector
    jqueryEffects: false,           // jQuery animation on/off
    jqueryAnim: "slideDown",        // jQuery animation type: fadeIn, show or slideDown
    selector: "a",                  // Selector to which activeClass will be added, either "a" or "li"
    mobile: false,                  // If false nav will not stick under 480px width of window
    mobileWidth: 480,               // The viewport width (without scrollbar) under which stickyNavbar will not be applied (due usability on mobile devices)
    zindex: 9999,                   // The zindex value to apply to the element: default 9999, other option is "auto"
    stickyModeClass: "sticky",      // Class that will be applied to 'this' in sticky mode
    unstickyModeClass: "unsticky"   // Class that will be applied to 'this' in non-sticky mode
  });
});

$(window).scroll(function() {
    var scroll = $(window).scrollTop();

    if (scroll >= 30) {
        $("header").addClass("header-scrolled");
    } else {
        $("header").removeClass("header-scrolled");
    }
});
