// load page
function jsLoad(href) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", href, false);
  xmlhttp.send();
  return xmlhttp.responseText;
}

//
function getCookie(name) {
  var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
  if (arr != null) return unescape(arr[2]);
  return null;
}

//
function setCookie(name, value, days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + date.toGMTString();
  } else var expires = "";
  document.cookie = name + "=" + value + expires + "; path=/";
}

//
function removeCookie(name) {
  setCookie(name, "", -1);
}

// console print debug messages
function pluginLog(tag, msg, obj) {
  if (myApp.params.log) {
    var name = tag.name;
    var color = tag.color;
    switch (color) {
      case 0:
        color = 'background:#323131; color: #3eb4ff';
        break;
      case 1:
        color = 'background:#323131; color: #ec9500';
        break;
      case 2:
        color = 'background:#000000; color: #c354f0';
        break;
      case 3:
        color = 'background:#323131; color: #3eff46';
        break;
      case 4:
        color = 'background:#FFF; color: #d60707';
        break;
      case 5:
        color = 'background:#323131; color: #d0ff12';
        break;
      case 6:
        color = 'background:#323131; color: #097178';
        break;
      case 7:
        color = 'background:#323131; color: #5e12ff';
        break;
      default:
        color = 'background:#323131; color: #fbfbfb';
    }
    if (obj)
      console.log(" | %c`%s`%c: %s.", color, name, 'color: #000000', msg, obj);
    else
      console.log(" | %c`%s`%c: %s.", color, name, 'color: #000000', msg);
  }
}
