// Change page title when not focused on tab
jQuery(document).ready(function($) {
  // Get page title
  var pageTitle = $("title").text();
  // Change page title on blur
  $(window).blur(function() {
    $("title").text("Bomberman Misses You... :(");
  });
  // Change page title back on focus
  $(window).focus(function() {
    $("title").text(pageTitle);
  });
});
