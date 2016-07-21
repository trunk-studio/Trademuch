(function() {
  Framework7.prototype.plugins.sampleView = function(app, params) {
    // exit if not enabled
    if (!params) return;

    var tag = {
      name: 'sampleView',
      color: 5
    };
    pluginLog(tag, 'loaded');

    return {
      hooks: {
        pageBeforeInit: function(pageData) {
          if (pageData.name == "sample") pageBeforeInit(pageData);
        },
        pageInit: function(pageData) {
          if (pageData.name == "sample") pageInit(pageData);
        },
        pageBeforeRemove: function(pageData) {
          if (pageData.name == "sample") pageBeforeRemove(pageData);
        },
        pageBeforeAnimation: function(pageData) {
          if (pageData.name == "sample") pageBeforeAnimation(pageData);
        },
        pageAfterAnimation: function(pageData) {
          if (pageData.name == "sample") pageAfterAnimation(pageData);
        },
      } // end hooks
    };
  };

  // runs when BEFORE insert a f7 page to view.
  function pageBeforeInit(pageData) {
    // todo

  } // end pageInit

  // runs when a f7 page be inserted to view.
  function pageInit(pageData) {
    // todo

  } // end pageInit

  // runs when f7 page be removed from view.
  function pageBeforeRemove(pageData) {
    // todo

  } // end pageBeforeRemove

  // runs when BEFORE f7 transforms between pages.
  function pageBeforeAnimation(pageData) {
    // todo

  } // end pageBeforeRemove

  // runs when AFTER f7 transform between pages.
  function pageAfterAnimation(pageData) {
    // todo

  } // end pageBeforeRemove

})();
