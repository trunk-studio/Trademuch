function deletePost(id, success, failed) {
  myApp.showIndicator();

  $$.ajax({
    url: "/rest/post/" + id,
    type: "DELETE",
    success: function(data) {
      if (myApp.params.log) console.log("deleted post result=>", data);

      if (data.indexOf("<") == 0) {
        myApp.getCurrentView().loadContent(data);
      } else {
        if (typeof success != "undenfined" && typeof success == "function") success();
      }
    },
    error: function(xhr, ajaxOptions, thrownError) {
      if (typeof failed != "undenfined" && typeof failed == "function") failed();
      if (myApp.params.log) console.log("deleteFav: thrownError=>", xhr.status, thrownError);
      myApp.alert(" Error occurred when try to delete a item.", xhr.status);
    },
    complete: function() {
      myApp.hideIndicator();
    }
  }); // end ajax
} // end deleteFav
myApp.deletePost = this.deletePost;
