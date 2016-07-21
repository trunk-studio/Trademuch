(function() {
  Framework7.prototype.plugins.searchView = function(app, params) {
    // exit if not enabled
    if (!params) return;

    var tag = {
      name: 'searchView',
      color: 5
    };
    pluginLog(tag, 'loaded');

    return {
      hooks: {
        appInit: function() {
          // appInit();
        },
        pageBeforeInit: function(pageData) {
          // if (pageData.name == "search") pageBeforeInit(pageData);
        },
        pageInit: function(pageData) {
          if (pageData.name == "search") pageInit(pageData);
        },
        pageBeforeRemove: function(pageData) {
          // if (pageData.name == "search") pageBeforeRemove(pageData);
        },
      } // end hooks
    };
  };

  //
  function pageInit(pageData) {

    var mySearchbar = myApp.searchbar('.searchbar', {
      searchList: '.list-block-search',
      searchIn: '.item-title'
    });

    // remove suggest button color after click cancel button.
    $$(".searchbar-cancel").click(function() {
      $$(".button-round").removeClass("suggestClicked");
    });

    $$(".categories .button").click(function() {
      // reset click state
      var length = $$(".categories > .button").length;
      for (var i = 0; i <= length; i++) {
        $$($$(".categories > .button")[i]).removeClass('suggestClicked');
      }
      // give the one be clicked new state.
      $$(this).addClass('suggestClicked');

      var keyword = $$(this).attr('data-keyword');
      if (keyword != "all") {
        $$(".searchbar-input > input").val(keyword);
        // goSearch(keyword);
        mySearchbar.search(keyword);
      } else {
        console.log("empty");
        mySearchbar.disable();
      }
    }); // end click

    $$("#formSearch").on('submit', function(e) {
      e.preventDefault();
      var keyword = $$(".searchbar-input > input").val();
      if (keyword) {
        goSearch(keyword);
      } else {
        window.myApp.alert("Don't forget to type something!");
      }
    }); // end submit

    // swiping out right acition -> add selsect item to favorite.
    $$(searchView.selector).on('click', '.addFav', function(event) {
      var t = $$(this);
      var id = t.attr("data-id");
      var img = t.attr("data-img");
      var itemTitle = $$(".item-title").children('.item.link').text();

      var title = 'Item Added :)';
      var msg = 'You just added `' + itemTitle + '` to your favorite list';

      myApp.addFav(id,
        function() {
          myApp.notiForFav(title, msg, img);
          t.parent().children('.deleteFav').removeClass('hide');
          t.addClass('hide');
          t.attr('data-isFav', true);
        });
    }); // end click

    // delete favorite item.
    $$(searchView.selector).on('click', '.deleteFav', function() {
      var t = $$(this);
      var id = t.attr("data-id");
      var img = t.attr("data-img");
      var itemTitle = $$(".item-title").children('.item.link').text();

      var title = 'Item deleted :(';
      var msg = 'You just removed `' + itemTitle + '` from favorite list';

      myApp.deleteFav(id,
        function() {
          myApp.notiForFav(title, msg, img);
          t.addClass('hide');
          t.parent().children('.addFav').removeClass('hide');
          t.attr('data-isFav', false);
        });
    }); // end click

  } // end pagaInit

  function goSearch(keyword) {
    $$.ajax({
      url: "/rest/post/search/" + keyword,
      type: "GET",
      success: function(result) {
        var data = JSON.parse(result);
        console.log("goSearch(keyword:%s)=>%o", keyword, data);
        showSearchResult(data);
      },
      error: function(xhr, ajaxOptions, thrownError) {
        console.log("xhr.status,thrownError=>", xhr.status, thrownError);
        if (xhr.status == 403) {
          // to-do print it out
        }
      }
    }); // end ajax
  }; // end goSearch

  function showSearchResult(data) {
    console.log("f7 showSearchResult=>", data);
    var searchResultTemplate = $$('script#searchResult').html();
    var compiledSearchResultTemplate = Template7.compile(searchResultTemplate);
    // window.myApp.template7Data.searchResult = data;
    $$('#search-result').html(compiledSearchResultTemplate(data));
  }; // end search-result
})();
