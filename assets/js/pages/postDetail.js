// /////////////////////////////////////////////////
// favorite icon color definition
// /////////////////////////////////////////////////
var favFalseColor = "rgba(255, 255, 255, 0.35)";
var favTrueColor = "#ff5757";
var favErrColor = "rgb(0, 0, 0)";

// /////////////////////////////////////////////////
// event -> onPageAfterAnimation
// /////////////////////////////////////////////////
// myApp.onPageAfterAnimation('postDetail', function(page) {
myApp.onPageInit('postDetail', function(page) {
  // console.log("postDetail onPageAfterAnimation");
  if (myApp.params.log) console.log("postDetail onPageInit");

  // for fb comment board plugin
  $$(function() {
    var origin = window.location.origin;
    $$(".fb-comments").attr('data-href', origin);
  });

  $$(".favboxa").click(function() {
    var fav = $$(this);
    var id = fav.attr("data-id");
    var isFav = fav.attr("data-isFav");
    var title, msg, itemTitle = $$(".post-title").text();
    var img = $$(this).attr("data-img");

    fav.attr('disabled', true);

    if (isFav == "true" || isFav == true) {
      title = 'Item deleted :(';
      msg = 'You just removed `' + itemTitle + '` from favorite list';

      myApp.deleteFav(id,
        function() {
          myApp.notiForFav(title, msg, img);
          var fav = $$(".favboxa");
          fav.children().css("color", favFalseColor);
          fav.attr("data-isFav", false);
          fav.removeAttr('disabled');
        },
        function() {
          $$(".favboxa").children().css("color", favErrColor);
        });
    } else {
      title = 'Item Added :)';
      msg = 'You just added `' + itemTitle + '` to your favorite list';

      myApp.addFav(id,
        function() {
          myApp.notiForFav(title, msg, img);
          var fav = $$(".favboxa");
          fav.children().css("color", favTrueColor);
          fav.attr("data-isFav", true);
          fav.removeAttr('disabled');
        },
        function() {
          $$(".favboxa").children().css("color", favErrColor);
        });
    }
  }); // end click

  // for sns sharing
  var address = myApp.getCurrentView().activePage.url;
  var origin = window.location.origin;
  var shareLink = origin + address;

  // set line share link
  var itemTitle = $$(".post-title").text();
  var lineShareMsg = "Check this amazing stuff out! [" + itemTitle + "] in TradeMuch. (" + shareLink + ")";
  $$('.lineIt').attr('href', $$('.lineIt').attr('href') + lineShareMsg);

  // fb well shareing
  $$(".fbShare").on('click', function() {
    console.log("fb click");
    FB.ui({
        method: 'share',
        href: shareLink
      },
      // callback
      function(response) {
        if (response && !response.error_message) {
          //- alert('Posting completed.');
          console.log("FB share successed=>", response);
        } else {
          //- alert('Error while posting.');
          console.log("FB share failed=>", response);
        }
      });
  }); // end fbShare
}); // end onPageAfterAnimation

// /////////////////////////////////////////////////
// event -> onPageBeforeRemove
// /////////////////////////////////////////////////
myApp.onPageBeforeRemove('postDetail', function(page) {


});
