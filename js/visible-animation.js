$(document).ready(() => {
  // Add class when window scrolls
  $(window).scroll(event => {
    $(".module").each((i, el) => {
      if ($(el).visible(true)) {
        $(el).addClass("come-in");
      }
    });
  });
  // Leave elements alone if already visible
  let win = $(window);
  let allMods = $(".module");

  // Already visible modules
  allMods.each((i, el) => {
    if ($(el).visible(true)) {
      $(el).addClass("already-visible");
    }
  });
  win.scroll(event => {
    allMods.each((i, el) => {
      if ($(el).visible(true)) {
        $(el).addClass("come-in")
        }
    });
  });

})
