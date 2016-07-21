function deleteFav(id, success, failed) {
  myApp.showIndicator();

  // delete item from favorite list.
  $$.ajax({
    url: "/rest/favorite/" + id,
    type: "DELETE",
    success: function(data) {
      if (myApp.params.log) console.log("deleted favorite result=>", data);

      if (data.indexOf("<") == 0) {
        myApp.getCurrentView().loadContent(data);
      } else {
        if (JSON.parse(data).result)
          if (typeof success != "undenfined" && typeof success == "function") success();
      }
    },
    error: function(xhr, ajaxOptions, thrownError) {
      if (typeof failed != "undenfined" && typeof failed == "function") failed();
      if (myApp.params.log) console.log("deleteFav: thrownError=>", xhr.status, thrownError);
      myApp.alert(" Error occurred when try to add favorite.", xhr.status);
    },
    complete: function() {
      myApp.hideIndicator();
    }
  }); // end ajax
} // end deleteFav

myApp.deleteFav = this.deleteFav;
