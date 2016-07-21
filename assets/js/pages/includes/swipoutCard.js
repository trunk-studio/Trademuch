// card click
$$(document)
  .on('click', '.swipeout', function(event) {
    var f7open = $$(this).hasClass('swipeout-opened');
    var closeOpen = $$(this).hasClass('close-open');
    if (!f7open) {
      if (closeOpen) {
        $$(this).removeClass('close-open');
        console.log("不動");
      } else {
        console.log("跳轉");
        $$(this).css('background-color', 'rgb(169, 208, 247)');
        myApp.getCurrentView().router.load({
          url: '/post/' + $$(this).attr("data-id"),
          pushState: true,
          pushStateOnLoad: true,
        });
      }
    }
  })
  .on("touchend", '.swipeout', function() {
    var f7open = $$(this).hasClass('swipeout-opened');
    if (!f7open) {
      $$(this).removeClass('close-open');
    }
  })
  .on("close", '.swipeout', function() {
    $$(this).addClass('close-open');
  })
  .on('pageAfterAnimation', function() {
    $$('.swipeout').css('background-color', 'white');
  });
