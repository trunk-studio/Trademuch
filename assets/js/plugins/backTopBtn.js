Framework7.prototype.plugins.backTopBtn = function(app, params) {
  // exit if not enabled
  if (!params) return;

  var tag = {
    name: 'backTopBtn'
  };
  pluginLog(tag, 'plugin loaded');

  return {
    hooks: {
      pageInit: function(pageData) {
        backTopBtn(pageData);
      },
    } // end hooks
  };
};


function backTopBtn(pageData) { // hide Scroll bar when scroll down.
  var timer, lock = false;

  // $('.page-content').delegate('.active', 'scroll', function(event) {
  $$('.page-content').scroll(function() {

    var mapView = $$('.tab-link.active').hasClass("mapView");
    var profileView = $$('.tab-link.active').hasClass("profileView");
    var postDetailF7 = $$('.view-main').attr("data-page") == 'postDetailF7' ? true : false;

    // console.log("event.originalEvent.wheelDelta=>", event.originalEvent.target.scrollTop);
    var scrollTop = $$(this).scrollTop();

    if ($$(".page-content.active").offset().top <= 35) {
      if (scrollTop <= 94) {
        // console.log('Scroll up');
        scrollUp();
      } else if (scrollTop >= 95) {
        // console.log('Scroll down');
        scrollDown();
      } else {
        timer = setTimeout(function() {
          scrollUp(false);
        }, 3000);
      }
    } else scrollUp();

  }); // end scroll

  $$('#back-top').click(function() {
    $$(this).hide();
    jsScrollTop($$(".page-content"), $$(".card").offset().top, 400);
    // $(".page-content").animate({
    //   scrollTop: $$(".card").offset().top
    // }, 400);
    window.myApp.showToolbar(".mainToolbar");
    return false;
  });

  function scrollUp() {
    if (lock) {
      lock = false;
      timer = null;
      // window.myApp.showToolbar(".mainToolbar");
    }
    var backTopBtn = $$("#back-top");
    if (backTopBtn || backTopBtn == undefinded)
      if ($$(".page-content.active").offset().top >= 0) {
        // $('#back-top').fadeOut();
        $$('#back-top').removeClass('fadeIn');
        $$('#back-top').addClass('fadeOut');
      }
  } // end scrollUp

  function scrollDown() {
    if (!lock) {
      lock = true;
      timer = null;
      // window.myApp.hideToolbar(".mainToolbar");
    }
    if ($$(".page-content.active").offset().top <= 0) {
      btnFading();
    }
    // $('#back-top').fadeIn();
  } // end scrollDown

  function btnFading() {
    // if ((!profileView && !mapView) && !postDetailF7) {
    if ((!profileView && !mapView) && !postDetailF7) {
      var toolbarState = $$('.toolbar').hasClass('toolbar-hidden');
      // console.log(toolbarState);
      if (toolbarState) {
        // $('#back-top').fadeOut();
        $$('#back-top').removeClass('fadeIn');
        $$('#back-top').addClass('fadeOut');
      } else {
        // $('#back-top').fadeIn();
        $$('#back-top').show();
        $$('#back-top').removeClass('fadeOut');
        $$('#back-top').addClass('fadeIn');
      }
    }
  } // end btnFading

  function jsScrollTop(element, to, duration) {
    if (duration <= 0) return;
    var difference = to - element.scrollTop();
    var perTick = difference / duration * 10;

    setTimeout(function() {
      element.scrollTop(element.scrollTop() + perTick);
      $$('#back-top').hide()
      if (element.scrollTop() === to) return;
      jsScrollTop(element, to, duration - 10);
    }, 10);
  }
}
