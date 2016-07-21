// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //finish - getuseragent Browser Language
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$$(document).on('pageInit', '.page[data-page="finish"]', function(e) {

  var hobby = myApp.formGetData('hobbySelect').hobby;
  console.log("selected hobbys=>", hobby);

  if (!hobby || !hobby[0]) {
    window.location.replace(window.location.pathname + window.location.search);
  }

  checkRegion();

  $$(document).click("#submit", function(e) {
    e.preventDefault();
    var email = $$('input[name="email"]').val();
    if (email) {
      if (email.length == 0) {
        myApp.alert('Enter your EMAIL please :)', 'Woops!');
        return false;
      }
    }
    var e = document.getElementById("regionSelect");
    var region = e.options[e.selectedIndex].text;
    var selected = e.options[e.selectedIndex].value;
    if (selected != "0") {
      addressToLatLng(region);
    } else {
      //   getGeoIpLocation();
      myApp.alert('We need to know where are you to provide the best user experience :)', 'Woops!');
      return false;
    }
  }); // end click

  function checkRegion() {
    var list = [];

    var tw = ["基隆市", "台北市", "新北市", "宜蘭縣", "新竹市", "新竹縣", "桃園市",
      "苗栗縣", "台中市", "彰化縣", "南投縣", "嘉義市", "嘉義縣", "雲林縣",
      "台南市", "高雄市", "屏東縣", "台東縣", "花蓮縣", "金門縣", "連江縣", "澎湖縣"
    ];

    var uk = ["Bath", "Birmingham", "Bradford", "Brighton & Hove", "Bristol", "Cambridge",
      "Canterbury", "Carlisle", "Chester", "Chichester", "Coventry", "Derby",
      "Durham", "Ely", "Exeter", "Gloucester", "Hereford", "Kingston upon Hull",
      "Lancaster", "Leeds", "Leicester", "Lichfield", "Lincoln", "Liverpool",
      "City of London", "Manchester", "Newcastle upon Tyne", "Norwich", "Nottingham", "Oxford",
      "Peterborough", "Plymouth", "Portsmouth", "Preston", "Ripon", "Salford",
      "Salisbury", "Sheffield", "Southampton", "St Albans", "Stoke-on-Trent", "Sunderland",
      "Truro", "Wakefield", "Wells", "Westminster", "Winchester", "Wolverhampton",
      "Worcester", "York", "Armagh", "Belfast", "Londonderry", "Lisburn",
      "Newry", "Aberdeen", "Dundee", "Edinburgh", "Glasgow", "Inverness",
      "Stirling", "Perth", "Bangor", "Cardiff", "Newport", "St. David's",
      "Swansea"
    ];

    if (getRegion() == "zh-TW") {
      list = ["請選擇地區"];
      // $.merge(list, tw);
      list = list.concat(tw);
      $$("#registerFinish").css("background-image", "url('/img/Taipei.jpg')");

    } else if (getRegion() == "en" || getRegion() == "en-gb") {
      list = ["Where are you?"];
      // $.merge(list, uk)
      list = list.concat(uk);

    } else {
      list = ["Where are you?"];
      // $.merge(list, uk);
      // $.merge(list, tw);
      list = list.concat(uk);
      list = list.concat(tw);
    }

    setOption(list);
  }

  function getRegion() {
    var region = navigator.language;
    return region;
  }

  function setOption(list) {
    $$.each(list, function(i, value) {
      $$('#regionSelect').append("<option value='" + i + "'>" + value + "</option>");
      $$("#regionSelect").trigger('change');
    });
  }

  function loadScript(url, callback) {
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
  }


  function addressToLatLng(addr) {
    var jsUrl = "http://maps.google.com/maps/api/js?libraries=places";
    loadScript(jsUrl, function() {
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({
        "address": addr
      }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var latitude = results[0].geometry.location.lat();
          var longitude = results[0].geometry.location.lng();
          var location = {
            latitude: latitude,
            longitude: longitude
          };
          submitSingUpForm(location);
          // } else {
          //   // if no result than use geoip
          //   getGeoIpLocation();
        }
      });
    }); // end getscript
  }; // end addressToLatLng

  function getGeoIpLocation() {
    $$.ajax({
      url: 'http://ip-api.com/json/',
      type: 'POST',
      dataType: 'jsonp',
      success: function(loc) {
        var geoLoc = JSON.parse(loc);
        var latitude = geoLoc.lat;
        var longitude = geoLoc.lon;
        var location = {
          latitude: latitude,
          longitude: longitude
        };
        submitSingUpForm(location);
      }
    }); // end ajax
  }; // end getGeoIpLocation

  function submitSingUpForm(location) {
    var email = $$("input[name='email']").val();
    var hobby = $$("input[name='hobby']").val();
    var data = {
      hobby: hobby,
      location: location
    };
    if (email) {
      data.email = email;
    }

    $$.ajax({
      url: '/rest/user',
      type: 'PUT',
      data: data,
      success: function(data) {
        $$("#submit").attr("disabled", true);
        $$("#submit").css("background-color", "gray");
        $$("#submit").css("border-color", "white");
        $$("#submit").css("color", "darkgrey");
        window.location.replace('/');
        // myApp.getCurrentView().router.back({
        //   url: myApp.getCurrentView().url,
        //   force: true,
        //   ignoreCache: true,
        //   reload: true,
        //   pushState: true,
        // });
      },
      error: function(err) {
        console.log(err);
        var msg = 'Your email address has already been used.(' + err + ")";
        window.myApp.alert(msg, 'OH-NO!');
      }
    }); // end ajax
  }; // end submitSingUpForm

}); // end page-finish
