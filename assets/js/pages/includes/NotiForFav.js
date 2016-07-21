function notiForFav(title, msg, img) {
  // show notification
  myApp.addNotification({
    title: title,
    message: msg,
    media: '<img width="48" height="48" style="border-radius:80%" src="' + img + '">'
  });
  setTimeout(function() {
    myApp.closeNotification('.notification-item');
  }, 2500);
} // end showNoti

myApp.notiForFav = notiForFav;
