var $ = jQuery.noConflict();
$(document).ready(function($) {
  // todo:kent
  // hotfix for map's item clcik link
  $('body').delegate('.item-link', 'click', function(event) {
    console.log("click map item!");
    var url = $(this).attr('data-id');
    console.log("url key=>",url);
    top.window.mainView.router.loadPage('/post/f7/'+url);
  });

});
