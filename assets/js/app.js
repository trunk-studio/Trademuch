// init f7 app.
var myApp = new Framework7({
  init: false,

  // basic info
  modalTitle: 'TradeMuch',
  statusbarOverlay: false,

  // broswering state
  pushState: true,
  pushStateSeparator: "",
  pushStateRoot: "/app",
  preloadPreviousPage: true,
  uniqueHistory: true,
  allowDuplicateUrls: true,

  // f7 compile template
  template7Pages: true,
  precompileTemplates: true,

  // lazyload
  imagesLazyLoadSequential: true,
  imagesLazyLoadThreshold: 50,

  // swipe page
  swipeBackPage: true,
  swipeBackPageAnimateShadow: false,
  swipeBackPageAnimateOpacity: false,

  // animation configs
  animatePages: true,
  animateNavBackIcon: true,

  // page scrolling
  hideToolbarOnPageScroll: true,
  hideTabbarOnPageScroll: true,
  // hideNavbarOnPageScroll: true,
  // showBarsOnPageScrollEnd: false,

  // ajax reactions
  onAjaxStart: function(xhr) {
    myApp.showIndicator();
  },
  onAjaxComplete: function(xhr) {
    setTimeout(function() {
      myApp.hideIndicator();
    }, 225);
  },

  // --------------------------------------- //
  //            plugin switchs               //
  // --------------------------------------- //
  log: true,
  pageEventCatcher: true,
  disableSocketAutoConnection: true,
  backTopBtn: false,
  fbSupport: true,
  barsController: true,
  upscroller: {
    text: 'Go to Top'
  },

  // --------------------------------------- //
  //              view switchs               //
  // --------------------------------------- //
  toolbar: true,
  mainView: true,
  searchView: true,
  favoriteView: true,
  profileView: true,
  addPostView: true,

}); // end myApp

var address = window.location.origin;

// Add main view
var mainView = myApp.addView('.view-main', {
  // Enable Dynamic Navbar for this view
  dynamicNavbar: true,
  domCache: false,
  linksView: mainView,
  url: address + myApp.params.pushStateRoot,
});

// Add search view
var searchView = myApp.addView('.view-search', {
  dynamicNavbar: true,
  // turn-on cache to keep search results.
  domCache: true,
  linksView: searchView,
  url: address + "/search",
});

// Add favorite view
var favoriteView = myApp.addView('.view-favorite', {
  dynamicNavbar: true,
  domCache: true,
  linksView: favoriteView,
  // url: "/app#favorite",
});

// Add profile view
var profileView = myApp.addView('.view-profile', {
  dynamicNavbar: true,
  domCache: true,
  linksView: profileView,
  // url: "/app#profile",
});

// Add addPost view
var addPostView = myApp.addView('.view-addPost', {
  dynamicNavbar: true,
  domCache: false,
  linksView: addPostView,
});

// Expose Internal DOM library
window.$$ = Framework7.$;
window.myApp = myApp;
window.mainView = mainView;
window.searchView = searchView;
window.favoriteView = favoriteView;
window.profileView = profileView;
window.addPostView = addPostView;

var pathname = window.location.pathname.split("/")[1];
var tag = {
  name: 'app Initing',
  color: 4,
};

switch (pathname) {
  case mainView.url.split(address + "/")[1]:
    myApp.showTab("#" + mainView.container.id);
    $$(".mapView").addClass('active');
    pluginLog(tag, 'enter default app view');
    break;

  case searchView.url.split(address + "/")[1]:
    myApp.showTab("#" + searchView.container.id)
    $$(".searchView").addClass('active');
    pluginLog(tag, 'entere search view');
    break;

  default:
    myApp.showTab("#" + mainView.container.id);
    $$(".mapView").addClass('active');
}

// exec f7 app.
myApp.init();
