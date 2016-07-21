"use strict";
//var $ = jQuery.noConflict();

var mapStyles = [{
  "featureType": "administrative",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#444444"
  }]
}, {
  "featureType": "administrative.land_parcel",
  "elementType": "all",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "landscape",
  "elementType": "all",
  "stylers": [{
    "color": "#f2f2f2"
  }]
}, {
  "featureType": "landscape.natural",
  "elementType": "all",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "poi",
  "elementType": "all",
  "stylers": [{
    "visibility": "on"
  }, {
    "color": "#052366"
  }, {
    "saturation": "-70"
  }, {
    "lightness": "85"
  }]
}, {
  "featureType": "poi",
  "elementType": "labels",
  "stylers": [{
    "visibility": "simplified"
  }, {
    "lightness": "-53"
  }, {
    "weight": "1.00"
  }, {
    "gamma": "0.98"
  }]
}, {
  "featureType": "poi",
  "elementType": "labels.icon",
  "stylers": [{
    "visibility": "simplified"
  }]
}, {
  "featureType": "road",
  "elementType": "all",
  "stylers": [{
    "saturation": -100
  }, {
    "lightness": 45
  }, {
    "visibility": "on"
  }]
}, {
  "featureType": "road",
  "elementType": "geometry",
  "stylers": [{
    "saturation": "-18"
  }]
}, {
  "featureType": "road",
  "elementType": "labels",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "road.highway",
  "elementType": "all",
  "stylers": [{
    "visibility": "on"
  }]
}, {
  "featureType": "road.arterial",
  "elementType": "all",
  "stylers": [{
    "visibility": "on"
  }]
}, {
  "featureType": "road.arterial",
  "elementType": "labels.icon",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "road.local",
  "elementType": "all",
  "stylers": [{
    "visibility": "on"
  }]
}, {
  "featureType": "transit",
  "elementType": "all",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "water",
  "elementType": "all",
  "stylers": [{
    "color": "#57677a"
  }, {
    "visibility": "on"
  }]
}];

function setCookie(name, value) {
  //var Days = 1; //default one day
  //var exp  = new Date();
  //exp.setTime(exp.getTime() + Days*24*60*60*1000);
  document.cookie = name + "=" + escape(value) + "; path=/";
}

function createHomepageGoogleMap(_latitude, _longitude, json) {

  var mapCenter = new google.maps.LatLng(_latitude, _longitude);
  var mapOptions = {
    zoom: 16,
    minZoom: 8,
    center: mapCenter,
    disableDefaultUI: true,
    scrollwheel: false,
    styles: mapStyles,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.BOTTOM_CENTER
    },
    panControl: false,
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.LARGE,
      position: google.maps.ControlPosition.RIGHT_BOTTOM
    }
  };

  var mapElement = document.getElementById('map');
  var map = new google.maps.Map(mapElement, mapOptions);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        map.setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setCookie("lat", position.coords.latitude);
        setCookie("lon", position.coords.longitude);

        setUserLoactionMaker(position.coords.latitude, position.coords.longitude);
      },
      function() {
        $$.getJSON("http://ip-api.com/json/?callback=?", function(data) {
          console.log("geoip loc=>", data);
          map.setCenter({
            lat: data.lat,
            lng: data.lon
          });

          setUserLoactionMaker(data.lat, data.lon);

          // save location for future usages.
          setCookie("lat", data.lat);
          setCookie("lon", data.lon);
        });
      }, {
        enableHighAccuracy: true,
        timeout: 2500,
        maximumAge: 2500
      }
    );
  }

  function setUserLoactionMaker(lat, lon) {
    console.log("map center=>", lat, lon);
    var hereInfowindow = new google.maps.InfoWindow({
      content: "You are here"
    });
    var hereImg = "./img/map_marker_user_current_location.png";
    var hereMarker = new google.maps.Marker({
      // position: new google.maps.LatLng(parseFloat(lat) - 0.0035, lon),
      position: new google.maps.LatLng(lat, lon),
      map: map,
      icon: hereImg,
      animation: google.maps.Animation.DROP,
    });
    hereMarker.addListener('click', function() {
      hereInfowindow.open(map, hereMarker);
    });

    var hereCircle = new google.maps.Circle({
      strokeColor: '#3889dd',
      strokeOpacity: 0.5,
      strokeWeight: 2,
      fillColor: '#3889dd',
      fillOpacity: 0.1,
      map: map,
      center: {
        lat: lat,
        lng: lon
      },
      radius: 370
    });
  }

  var inforBoxArray = [];

  for (var i = 0; i < json.data.length; i++) {
    // console.log(json.data[i]);
    var img = "/img/map_marker_red.png";
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(json.data[i].latitude, json.data[i].longitude),
      map: map,
      icon: img,
      title: json.data[i].title,
      animation: google.maps.Animation.DROP,
    });

    var content = '<div class="infoContent" data-id="' + json.data[i].id + '">' +
      '<h1>' + json.data[i].title + '</h1>' +
      '<div class="bodyContent">' +
      '<p>' + json.data[i].price + '</p>' +
      '<img class="img-square" src="' + json.data[i].gallery[0] + '">' +
      '</div>' +
      '</div>';

    var infowindow = new google.maps.InfoWindow();
    inforBoxArray.push(infowindow);

    google.maps.event.addListener(marker, 'click', (function(marker, content, infowindow) {
      return function() {
        // animation on
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
        // animation off
        setTimeout(function() {
          marker.setAnimation(null);
        }, 2000);

        for (var i = 0; i < inforBoxArray.length; i++) {
          inforBoxArray[i].close();
        }
        infowindow.setContent(content);
        infowindow.open(map, marker);
      };
    })(marker, content, infowindow));

  }

  google.maps.event.addListener(map, "click", function(event) {
    for (var i = 0; i < inforBoxArray.length; i++) {
      inforBoxArray[i].close();
    }
  });

  google.maps.event.addListener(map, "drag", function(event) {
    for (var i = 0; i < inforBoxArray.length; i++) {
      inforBoxArray[i].close();
    }
  });

}
