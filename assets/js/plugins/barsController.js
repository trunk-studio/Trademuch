(function() {
  Framework7.prototype.plugins.barsController = function(app, params) {
    // exit if not enabled
    if (!params) return;

    var tag = {
      name: 'barsController'
    };
    pluginLog(tag, 'loaded');

    // expose method
    // initBarsController();

    return {
      hooks: {
        appInit: function() {

          myApp.showMyToolbar = function(toolbar) {
            if (typeof toolbar == 'undefined' || toolbar == null) {
              toolbar = '.toolbar';
            }
            $$(toolbar).addClass('animated');
            $$(toolbar).removeClass('toolbar-hidden');
            $$(toolbar).removeClass('toolbar-hiding');
            $$(toolbar).show();
          };

          myApp.hideMyToolbar = function(toolbar) {
            if (typeof toolbar == 'undefined' || toolbar == null) {
              toolbar = '.toolbar';
            }
            $$(toolbar).removeClass('animated');
            $$(toolbar).addClass('toolbar-hiding');
            $$(toolbar).addClass('toolbar-hidden');
            $$(toolbar).hide();
          };

        },
        pageBeforeInit: function(pageData) {

          // hide toolbar before page be initialized,
          // to avoid toolbar shows when user scroll page to the bottom.
          pagesHideToolbar(tag, pageData);

        },
        pageInit: function(pageData) {},
        pageBeforeRemove: function(pageData) {},
        pageBeforeAnimation: function(pageData) {

          // show toolbar before page animation,
          // so toolbar will be animated when page is transform.
          viewsShowToolbar(tag, pageData);

        },
        pageAfterAnimation: function(pageData) {

          // hide toolbar
          pagesHideToolbar(tag, pageData);

        },
      } // end hooks
    };
  };

  function pagesHideToolbar(tag, pageData) {
    var pageNeedsNoBars = ["postDetail", "createDetail", "createDetail", "registerHobby"];

    for (var i = 0; i < pageNeedsNoBars.length; i++) {

      if (pageData.name == pageNeedsNoBars[i]) {
        myApp.hideMyToolbar();
        var msg = 'hide toolbar for ' + pageData.name;
        pluginLog(tag, msg);
      }

    } // end for
  } // end

  function viewsShowToolbar(tag, pageData) {
    var viewNeedsBars = ["search", "main", "favorite", "profile"];

    for (var i = 0; i < viewNeedsBars.length; i++) {

      if (pageData.name == viewNeedsBars[i]) {
        myApp.showMyToolbar();
        var msg = 'show toolbar for ' + pageData.name;
        pluginLog(tag, msg);
      }

    } // end for
  } // end

})();
