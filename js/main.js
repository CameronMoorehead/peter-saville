$(document).ready(function() {
  // Add class when window scrolls
  $(window).scroll(function(event) {
    $(".module").each(function(i, el) {
      var el = $(el);
      if (el.visible(true)) {
        el.addClass("come-in");
      }
    });
  });
  // Leave elements alone if already visible
  var win = $(window);
  var allMods = $(".module");

  // Already visible modules
  allMods.each(function(i, el) {
    var el = $(el);
    if (el.visible(true)) {
      el.addClass("already-visible");
    }
  });
  win.scroll(function(event) {
    allMods.each(function(i, el) {
      var el = $(el);
      if (el.visible(true)) {
        el.addClass("come-in");
        }
    });
  });
  
})
