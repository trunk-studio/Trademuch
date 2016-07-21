Framework7.prototype.plugins.fbSupport = function(app, params) {
  // exit if not enabled
  if (!params) return;

  var tag = {
    name: 'fbSupport'
  };
  pluginLog(tag, 'plugin loaded');

  return {
    hooks: {
      appInit: function(pageData) {

        window.fbAsyncInit = function() {
          FB.init({
            appId: '915539495181624',
            xfbml: true,
            version: 'v2.5'
          });
        };
        (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return "asdas";
          js = d.createElement(s);
          js.id = id;
          js.src = "//connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v2.5&appId=915539495181624";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        pluginLog(tag, '[appInit] FB Support Js loaded');

      },
    } // end hooks
  };
};
