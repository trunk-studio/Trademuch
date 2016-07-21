(function() {
  Framework7.prototype.plugins.profileView = function(app, params) {
    // exit if not enabled
    if (!params) return;

    var tag = {
      name: 'profileView',
      color: 5
    };
    pluginLog(tag, 'loaded');

    return {
      hooks: {
        appInit: function() {
          appInit();
        },
        pageBeforeInit: function(pageData) {
          if (pageData.name == "profile") pageBeforeInit(pageData);
        },
        pageInit: function(pageData) {
          if (pageData.name == "profile") pageInit(pageData);
        },
        pageBeforeRemove: function(pageData) {
          if (pageData.name == "profile") pageBeforeRemove(pageData);
        },
        pageBeforeAnimation: function(pageData) {
          if (pageData.name == "profile") pageBeforeAnimation(pageData);
        },
        pageAfterAnimation: function(pageData) {
          if (pageData.name == "profile") pageAfterAnimation(pageData);
        },
      } // end hooks
    };
  };


  function appInit() {

    myApp.reloadProfile = function() {
      $$.get("/user/profile", function(data) {
        $$("#profileView > .pages").html(data);
        // the way below contant navbar and transform animation.
        // favoriteView.loadContent(data;)
      })
    };

  } // end appInit

  // runs when BEFORE insert a f7 page to view.
  function pageBeforeInit(pageData) {

  } // end pageInit

  // runs when a f7 page be inserted to view.
  function pageInit(pageData) {

    $$(profileView.selector).on('click', '.deletePost', function(e) {
      // e.preventDefault();
      e.stopImmediatePropagation();

      var delPost = $$(this);
      var id = delPost.attr("data-id");
      var li = $$(this).parents('li');

      myApp.confirm('Are you sure?', function() {
        var img = delPost.attr("data-img");
        var itemTitle = $$(".item-title").children('.item.link').text();
        var title = 'Item deleted :(';
        var msg = 'You just removed `' + itemTitle + '` from your post list';

        myApp.deletePost(id,
          function() {
            myApp.notiForFav(title, msg, img);
            // myApp.reloadProfile();
            myApp.swipeoutDelete(li)
          });
      });
    });

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
