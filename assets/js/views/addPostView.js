(function() {
  Framework7.prototype.plugins.addPostView = function(app, params) {
    // exit if not enabled
    if (!params) return;

    var tag = {
      name: 'addPostView',
      color: 5
    };
    pluginLog(tag, 'view loaded');

    return {
      hooks: {
        appInit: function() {
          appInit();
        },
        pageBeforeInit: function(pageData) {
          if (pageData.name == "addPost") pageBeforeInit(pageData);
        },
        pageInit: function(pageData) {
          if (pageData.name == "addPost") pageInit(pageData);
        },
        pageBeforeRemove: function(pageData) {
          if (pageData.name == "addPost") pageBeforeRemove(pageData);
        },
        pageBeforeAnimation: function(pageData) {
          if (pageData.name == "addPost") pageBeforeAnimation(pageData);
        },
        pageAfterAnimation: function(pageData) {
          if (pageData.name == "addPost") pageAfterAnimation(pageData);
        },
      } // end hooks
    };
  };

  function appInit() {

    myApp.addPost = function() {
      $$.get("/post/create/Category", function(data) {
        $$("#addPostView > .pages").html(data);
        // the way below contant navbar and transform animation.
        // addPostView.loadContent(data;)
      })
    };

    myApp.getPostCategory = function() {
      myApp.getCurrentView().router.load({
      // addPostView.router.load({
        url: "/post/create/Category",
        reload: false,
        pushState: false,
        pushStateOnLoad: false,
      });
    };

  } // end appInit

  // runs when BEFORE insert a f7 page to view.
  function pageBeforeInit(pageData) {
    // todo

  } // end pageInit

  // runs when a f7 page be inserted to view.
  function pageInit(pageData) {


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
