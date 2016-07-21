(function() {
  Framework7.prototype.plugins.mainView = function(app, params) {
    // exit if not enabled
    if (!params) return;

    var tag = {
      name: 'mainView',
      color: 5
    };
    pluginLog(tag, 'loaded');

    return {
      hooks: {
        appInit: function() {
          // appInit();
        },
        pageBeforeInit: function(pageData) {
          if (pageData.name == "main") {
            pluginLog(tag, 'pageBeforeInit');
            pageBeforeInit(pageData);
          }
        },
        pageInit: function(pageData) {
          if (pageData.name == "main") {
            pluginLog(tag, 'pageInit');
            pageInit(pageData);
          }
        },
        pageBeforeRemove: function(pageData) {
          if (pageData.name == "main") pageBeforeRemove(pageData);
        },
      } // end hooks
    };
  };

  //
  function pageBeforeInit(pageData) {

    pageData.query.splashState = getCookie("splash");

    if (pageData.query.splashState) {
      $$('#splash').css("display", "none");

      pluginLog({
        name: 'mainView',
        color: 5
      }, 'hide splash');
    }

    pluginLog({
      name: 'mainView',
      color: 5
    }, 'cookie splash state =>' + pageData.query.splashState);
  }

  //
  function pageInit(pageData) {

    var splashState = pageData.query.splashState;

    if (!splashState) {
      $$('#splash').addClass('animated fadeOut');

      setTimeout(function() {
        $$('#splash').css("display", "none");
      }, 1000);

      setCookie("splash", true);

      pluginLog({
        name: 'mainView',
        color: 5
      }, 'fading out splash..');
    }

    $$(window).on('unload', function() {
      // remove cookie to re-animate splash
      // removeCookie("splash");
    });

    $$(document).on("click", ".infoContent", function(event) {
      if (myApp.params.log) console.log("click infoContent");
      myApp.getCurrentView().router.load({
        url: '/post/' + $$(this).attr("data-id"),
        pushState: true,
        pushStateOnLoad: true,
      });
    });

  }

  //
  function appInit() {


  }

  //
  function pageBeforeRemove(pageData) {

  }
})();
