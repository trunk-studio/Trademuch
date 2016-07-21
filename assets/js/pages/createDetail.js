var page = 'createDetail';

//
myApp.onPageBeforeRemove(page, function(page) {


});

//
myApp.onPageInit(page, function(page) {

  // init f7-calendar
  var now = new Date();
  var today = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();

  // if no hobby...
  var category = myApp.formGetData('createCategoryChoose');
  if (!category) {
    myApp.showIndicator();
    setTimeout(function() {
      myApp.alert("oops! please seslect category agagin.", 'Error');
      myApp.getCurrentView().router.load({
        url: "/post/create/Category",
        reload: true,
        pushState: false,
        pushStateOnLoad: false
      });
      myApp.hideIndicator();
    }, 225);
  }
  console.log("category=>", category);

  // if no mode
  var postMode = myApp.formGetData('storyModeChoose');
  if (!postMode) {
    var storyMode = {}
    storyMode.mode = "give";
    myApp.formStoreData('storyModeChoose', storyMode);
    postMode = myApp.formGetData('storyModeChoose');
  }
  console.log("postMode=>", postMode);

  // category selects
  $$('.radioItem').click(function() {
    $$('.checked').hide();
    $$("input[name='item']").val("");
    if ($$(this).find('input').prop("checked")) {
      $$(this).find('.checked').hide();
      $$(this).find('input').prop("checked", false);
    } else {
      $$(this).find('.checked').show();
      $$(this).find('input').prop("checked", true);
    }

    var storedData = myApp.formToJSON('#createDetailChoose');
    myApp.formStoreData('createDetailChoose', storedData);
    console.log("storedData=>", storedData);
  });

  $$("input[name='item']").on('change', function() {
    var radioItem = $$("input[name='radioItem']");
    radioItem.prop("checked", false);
    $$('.checked').hide();
    var item = $$("input[name='item']").val();
    var storedData = myApp.formToJSON('#createDetailChoose');
    myApp.formStoreData('createDetailChoose', storedData);
  });

  $$("input[name='title']").on('input', function() {
    console.log("title length", $$(this).val().trim().length);
    if ($$(this).val().trim().length > 0) {
      var storedData = myApp.formToJSON('#createDetailChoose');
      myApp.formStoreData('createDetailChoose', storedData);

      // save title input to itemname at this version.
      $$("input[name='item']").val($$(this).val());
      $$('#finishStep').removeAttr('disabled');
    } else {
      $$('#finishStep').attr('disabled', 'disabled');
    }
  });

  $$("textarea[name='content']").on('input', function() {
    var storedData = myApp.formToJSON('#createDetailChoose');
    myApp.formStoreData('createDetailChoose', storedData);
  });

  $$("input[name='image']").on('change', function() {
    var storedData = myApp.formToJSON('#createDetailChoose');
    myApp.formStoreData('createDetailChoose', storedData);
  });

  $$("input[name='price']").on('input', function() {
    var storedData = myApp.formToJSON('#createDetailChoose');
    myApp.formStoreData('createDetailChoose', storedData);
  });
  $$("input[name='price']").on('click', function() {
    $$(this).val("");
  });

  // storyMode
  $$("input[name='seeking']").on('change', function() {
    var mode, storyMode = {};
    if ($$(this).prop('checked')) mode = "get";
    else mode = "give";

    storyMode.mode = mode;
    myApp.formStoreData('storyModeChoose', storyMode);

    var postMode = myApp.formGetData('storyModeChoose');
    console.log("postMode=>", postMode);
  });

  // html5 start date picker
  $$("input[name='postPeriodStart']").attr("min", today);
  $$("input[name='postPeriodStart']").on('click', function() {
    $$(this).val("");
    cleanQuickDatePickerState();
  });

  // html5 end date picker
  $$("input[name='postPeriodEnd']").attr("min", today);
  $$("input[name='postPeriodEnd']").on('click', function() {
    $$(this).val("");
    cleanQuickDatePickerState();
  });

  // posting period qucick picker
  $$(".quickDatePickArea > .col-auto > .button-round").on('click', function(e) {
    var value = $$(this).attr('data-value');
    if (value == "pick") {
      // show f7 date picker
      $$("#calendar-postPeriod").click();
      return;
    } else {
      var now = new Date();
      var yy = parseInt(now.getFullYear());
      var mm = parseInt(now.getMonth() + 1);
      var dd = parseInt(now.getDate());
      var detail = value.split("-");
      var count = parseInt(detail[0]);
      var unit = detail[1];
      var startDate = yy + "-" + mm + "-" + dd;

      if (unit == "m") {
        mm += count;
        if (mm > 12) {
          yy += Math.floor(mm / 12);
          mm = mm % 12;
        } else if (mm < 10) mm = "0" + mm;
      }
      if (unit == "w" || unit == "d") {
        if (unit == "w") dd += count * 7;
        if (unit == "d") dd += count;
        var lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        if (dd > lastDay) {
          console.log("dd=>", dd);
          console.log("lastDay=>", lastDay);
          if (dd >= lastDay) {
            mm += Math.floor(dd / lastDay);
            dd = dd % lastDay;
          }
        }
      }
      var endDate = yy + "-" + mm + "-" + dd;
      $$("#calendar-postPeriod").val(startDate + " - " + endDate);
    }
    // clean state first.
    cleanQuickDatePickerState();
    // give the one be clicked new state.
    $$(this).addClass('suggestClicked');
  }); // end click

  function cleanQuickDatePickerState() {
    // reset click state
    var length = $$(".quickDatePickArea > .col-auto > .button-round").length;
    for (var i = 0; i <= length; i++) {
      $$($$(".quickDatePickArea > .col-auto > .button-round")[i]).removeClass('suggestClicked');
    }
  } // end cleanQuickDatePickerState

  $$("img.preview").click(function(e) {
    e.preventDefault();
    $$(this).addClass('active-state');
    $$('.uploadBtn')[0].click();
    $$('.uploadBtn').trigger('click');
  });

  $$(document).on('click', '#finishStep', function(e) {
    // {"mode":"give","hobby":"1","detail":{"title":"123","radioItem":"2","item":""},
    // "location":{"latitude":24.148657699999998,"longitude":120.67413979999999,"accuracy":30}}
    e.preventDefault();
    e.stopImmediatePropagation();
    $$(this).attr('disabled', true);
    myApp.showIndicator();

    var postMode = myApp.formGetData('storyModeChoose');
    var category = myApp.formGetData('createCategoryChoose');
    var detail = myApp.formGetData('createDetailChoose');

    var data = {};
    data.mode = postMode == undefined ? null : postMode.mode;
    data.hobby = category == undefined ? null : category.hobby;
    data.detail = detail;

    // posting mode
    if (!data.mode || data.mode == null) {
      myApp.hideIndicator();
      mainView.router.loadPage('/story');
      $$("#finishStep").removeAttr('disabled');
      return false;
    }

    // post title
    if ((!data.detail || !data.detail.title) || (!data.detail.title.length > 0)) {
      myApp.hideIndicator();
      myApp.alert("Don't forget to enter a nice title :)", "Oops!");
      $$("#finishStep").removeAttr('disabled');
      return false;
    }

    //post price
    // if (!data.detail.price || data.detail.price == "") {
    //   myApp.hideIndicator();
    //   myApp.alert("Please give your item/service a nice price, or even free :)", "Oops!")
    //   return false;
    // }

    // post category
    // var customCategory = $$("input[name='item']").val();
    // if ( !data.detail.radioItem && customCategory == "" ) {
    //   myApp.hideIndicator();
    //   myApp.alert("Please select a category or enter a new one. :)", "Oops!");
    //   return false;
    // }

    // post date period
    // By default give today to startDate if use hasn't selsect period.
    if (!data.detail.startDate || data.detail.startDate == undefined) {
      // get value
      var datePickerValue = $$("#calendar-postPeriod").val();

      if (!datePickerValue || datePickerValue == undefined) {
        var now = new Date();
        data.detail.startDate = "" + now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate();
      } else {
        // re-assembling date period field.
        data.detail.startDate = "" + $$("#calendar-postPeriod").val().split(" - ")[0];
        data.detail.endDate = "" + $$("#calendar-postPeriod").val().split(" - ")[1];
      }
    }
    console.log("data.detail.startDate=>", data.detail.startDate);

    /*---------------------- get user location ----------------------*/
    var location = {};
    navigator.geolocation.getCurrentPosition(
      getLocSuccess,
      getLocError,
      options);

    var options = {
      enableHighAccuracy: true,
      timeout: 2500,
      maximumAge: 2500
    };

    // if html5 geo api works then submit.
    function getLocSuccess(loc) {
      console.log("html5 location=>", loc);
      location = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        accuracy: loc.coords.accuracy
      }
      data.location = location;
      submit();
    } // end GetLocationAndSubmit

    // if html5 geo api failed then use geoIp for instead.
    function getLocError(err) {

      $$.ajax({
        url: 'http://ip-api.com/json/',
        type: 'POST',
        dataType: 'jsonp',
        success: function(loc) {
          var geoip = JSON.parse(loc);
          console.log("geoip location=>", geoip);
          location = {
            latitude: geoip.lat,
            longitude: geoip.lon,
            accuracy: 500
          }
          data.location = location;
          submit();
        },
        error: function(err) {
          console.log("get html5 LocError!");

          var lon = getCookie("lon");
          var lat = getCookie("lat");
          location = {
            latitude: lat,
            longitude: lon
          }
          data.location = location;
          $$("#finishStep").removeAttr('disabled');
          submit();
          // if get geoip's data failed then give a default loaciotn from user setting.
        }
      }); // end ajax

    } // end error

    // submit depends on image upload.
    function submit() {
      var imageCount = $$("input.uploadBtn")[0].files.length;
      if ((imageCount != null) && (imageCount > 0)) {
        console.log("saveImagesAndPost");
        saveImagesAndPost(data);
      } else {
        // now user must post things with a photo!
        // console.log("saveOnlyPost");
        // savePost(data);
        myApp.hideIndicator();
        myApp.alert('You need to pick a photo for this post. :(', 'Error');
      }
    }; // end submit

    function savePost(data) {
      console.log("data before submit=>", (data));
      // save post
      $$.ajax({
        url: "/rest/post/create",
        type: "POST",
        data: data,
        success: function(result) {
          console.log(result);
          result = JSON.parse(result);
          $$("#finishStep").removeAttr('disabled');
          myApp.formDeleteData('storyModeChoose');
          myApp.formDeleteData('createCategoryChoose');
          myApp.formDeleteData('createDetailChoose');
          myApp.hideIndicator();
          myApp.reloadProfile();
          myApp.getCurrentView().router.load({
            url: '/post/' + result.id,
            reload: true,
            pushState: false,
            pushStateOnLoad: true,
          });
        },
        error: function(xhr, ajaxOptions, thrownError) {
          $$("#finishStep").removeAttr('disabled');
          myApp.hideIndicator();
          myApp.alert('Due to internet connection issues, please try again later or check you GPS status. thank you.', 'Error');
          console.log(xhr.status);
          console.log(thrownError);
        }
      }); // end ajax
    }; // end savePost

    function saveImagesAndPost(data) {
      console.log("data before submit=>", (data));
      // submit to upload post image.
      var formData = new FormData($$('form[id="storyImageUpload"]')[0]);
      $$.ajax({
        url: "/api/uploadImageBase64",
        type: "POST",
        dataType: "JSON",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function(result) {
          var saveResult = JSON.parse(result);
          console.log("save image finish.->", saveResult);
          console.log("result[0].src->", saveResult[0].src);
          data.images = saveResult[0].src;
          savePost(data);
        },
        error: function(xhr, ajaxOptions, thrownError) {
          myApp.hideIndicator();
          $$("#finishStep").removeAttr('disabled');
          var msg = 'upload image failed. please try it again.(' + xhr.status + ')';
          myApp.alert(msg, 'Error');
          console.log(xhr.status);
        }
      }); // end ajax
    }; // end saveImages
  }); // end finishStep-click

  // default clcik this date period
  setTimeout(function() {
    $$("a[data-value='1-m']").click();
  }, 500);

  $$(document).on("change", "input[name='image']", function() {
    var input = $$(this);

    // shows count. disable count becasue now only can upload one photo.
    // $("div.fileUpload-btn > span").text("upload a photo(" + input.get(0).files.length + ")");
    var img = document.createElement("img");

    // show wrapper
    $$(".canvasWrapper").show();

    // preview selected pic.
    var reader = new FileReader(input);
    var canvas = document.getElementById('viewport');
    var ctx = canvas.getContext('2d');

    reader.onload = function(e) {

      var img = new Image();
      img.onload = function() {
        var max_Length = 300;

        var imgWidth = img.width;
        var imgHeight = img.height;

        if (imgWidth > imgHeight) {
          if (imgWidth > max_Length) {
            imgHeight = Math.round(imgHeight *= max_Length / imgWidth);
            imgWidth = max_Length;
          }
        } else {
          if (imgHeight > max_Length) {
            imgWidth = Math.round(imgWidth *= max_Length / imgHeight);
            imgHeight = max_Length;
          }
        }

        canvas.width = imgWidth;
        canvas.height = imgHeight;

        var that = this;
        EXIF.getData(img, function() {
          var orientation = EXIF.getTag(that, 'Orientation');
          console.log("!!!!!!!!!!!!" + orientation);

          if (orientation == 6 || orientation == 8 || orientation == 3) {
            var rotateAngle = 0;

            switch (orientation) {
              case 3:
                rotateAngle = 180;
                break;
              case 6:
                rotateAngle = 90;
                canvas.width = imgHeight;
                canvas.height = imgWidth;
                break;
              case 8:
                rotateAngle = -90;
                canvas.width = imgHeight;
                canvas.height = imgWidth;
                break;
            }

            var x = canvas.width / 2;
            var y = canvas.height / 2;

            ctx.translate(x, y);
            ctx.rotate(rotateAngle * Math.PI / 180);

            ctx.drawImage(img, (-imgWidth / 2), (-imgHeight / 2), imgWidth, imgHeight);
          } else {
            ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
          }
        });
        // ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        var jpegBase64 = canvas.toDataURL("image/jpeg", 0.6);

        console.log('=== jpegBase64 ===', jpegBase64);
        $$('img.preview').attr('src', e.target.result);
        $$("input[name='picBase64']").val(jpegBase64);
      }
      if (event.target.result) img.src = event.target.result;

    }
    console.log(input);
    if (input[0].files[0] != null) reader.readAsDataURL(input[0].files[0]);

  }); // end fileUpload
});







$$(document).on('pageInit pageReInit', '.page[data-page="createDetail"]', function(e) {
  // set a range time picker
  // var calendarPostPeriod = myApp.calendar({
  //   input: '#calendar-postPeriod',
  //   rangePicker: true,
  //   closeOnSelect: true,
  //   disabled: function(date) {
  //     // enable today
  //     if (date.getFullYear() == now.getFullYear() &&
  //       date.getMonth() == now.getMonth() &&
  //       date.getDate() == now.getDate()) {
  //       return false;
  //     }
  //     // only enable future time
  //     if (date.getTime() < now.getTime()) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   },
  // });
  // disable f7's date picker
  // $$("input[name='postPeriod']").on('click', function() {
  //   $$(this).val("");
  //   cleanQuickDatePickerState();
  // });
  // $$("input[name='postPeriod']").on('change', function() {
  //   var storedData = myApp.formToJSON('#createDetailChoose');
  //   myApp.formStoreData('createDetailChoose', storedData);
  //   console.log("period=>", $(this).val());
  // });

}); // end pageInit-createDetail
