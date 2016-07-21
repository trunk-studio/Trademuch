(function() {
  Framework7.prototype.plugins.favoriteView = function(app, params) {
    // exit if not enabled
    if (!params) return;

    var tag = {
      name: 'favoriteView',
      color: 5
    };
    pluginLog(tag, 'view loaded');

    return {
      hooks: {
        appInit: function() {
          appInit();
        },
        pageBeforeInit: function(pageData) {
          if (pageData.name == "favorite") pageBeforeInit(pageData);
        },
        pageInit: function(pageData) {
          if (pageData.name == "favorite") pageInit(pageData);
        },
        pageBeforeRemove: function(pageData) {
          if (pageData.name == "favorite") pageBeforeRemove(pageData);
        },
        pageBeforeAnimation: function(pageData) {
          if (pageData.name == "favorite") pageBeforeAnimation(pageData);
        },
        pageAfterAnimation: function(pageData) {
          if (pageData.name == "favorite") pageAfterAnimation(pageData);
        },
      } // end hooks
    };
  };

  function appInit() {

    myApp.reloadFavorite = function() {
      $$.get("/user/favorites", function(data) {
        $$("#favoriteView > .pages").html(data);
        // the way below contant navbar and transform animation.
        // favoriteView.loadContent(data;)
      })
    };

  } // end appInit

  // runs when BEFORE insert a f7 page to view.
  function pageBeforeInit(pageData) {
    // todo

  } // end pageInit

  // runs when a f7 page be inserted to view.
  function pageInit(pageData) {

    // swiping out right acition -> add selsect item to favorite.
    $$(favoriteView.selector).on('click', '.addFav', function(e) {
      e.stopImmediatePropagation();
      var t = $$(this);
      var id = t.attr("data-id");
      var img = t.attr("data-img");
      var itemTitle = $$(".item-title").children('.item.link').text();

      var title = 'Item Added :)';
      var msg = 'You just added `' + itemTitle + '` to your favorite list';

      myApp.addFav(id,
        function() {
          myApp.notiForFav(title, msg, img);
          myApp.reloadFavorite();
        });
    }); // end click

    // delete favorite item.
    $$(favoriteView.selector).on('click', '.deleteFav', function(e) {
      e.stopImmediatePropagation();
      var t = $$(this);
      var id = t.attr("data-id");
      var img = t.attr("data-img");
      var itemTitle = $$(".item-title").children('.item.link').text();

      var title = 'Item deleted :(';
      var msg = 'You just removed `' + itemTitle + '` from favorite list';

      myApp.deleteFav(id,
        function() {
          myApp.notiForFav(title, msg, img);
          myApp.reloadFavorite();
        });
    }); // end click

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
