Framework7.prototype.plugins.pageEventCatcher = function(app, params) {
  // exit if not enabled
  if (!params) return;

  var tag = {
    name: 'Event',
    color: 1
  };
  pluginLog(tag, 'plugin `pageEventCatcher` loaded');

  return {
    hooks: {
      appInit: function() {
        var msg = "[appInit] ";
        pluginLog(tag, msg);
      },
      navbarInit: function(navbar, pageData) {
        var msg = "[navbarInit] " + pageData.name;
        pluginLog(tag, msg, {
          navbar:navbar,
          pageData:pageData
        });
      },
      pageInit: function(pageData) {
        var msg = "[pageInit] " + pageData.name;
        pluginLog(tag, msg, {
          pageData:pageData
        });
      },
      pageBeforeInit: function(pageData) {
        var msg = "[pageBeforeInit] " + pageData.name;
        pluginLog(tag, msg, {
          pageData:pageData
        });
      },
      pageBeforeAnimation: function(pageData) {
        var msg = "[pageBeforeAnimation] " + pageData.name;
        pluginLog(tag, msg, {
          pageData:pageData
        });
      },
      pageAfterAnimation: function(pageData) {
        var msg = "[pageAfterAnimation] " + pageData.name;
        pluginLog(tag, msg, {
          pageData:pageData
        });
      },
      pageBeforeRemove: function(pageData) {
        var msg = "[pageBeforeRemove] " + pageData.name;
        pluginLog(tag, msg, {
          pageData:pageData
        });
      },
      addView: function(view) {
        var msg = "[addView] ";
        pluginLog(tag, msg, {
          view:view
        });
      },
      loadPage: function(view, url, content) {
        var msg = "[loadPage] url:" + url;
        pluginLog(tag, msg, {
          view:view,
          url:url,
          content:content
        });
      },
      goBack: function(view, url, preloadOnly) {
        var msg = "[goBack] url:" + url;
        pluginLog(tag, msg, {
          view:view,
          url:url,
          preloadOnly:preloadOnly
        });
      },
      swipePanelSetTransform: function(views, panel, percentage) {
        var msg = "[swipePanelSetTransform] ";
        pluginLog(tag, msg, {
          views:views,
          panel:panel,
          percentage:percentage
        });
      },
      ajaxStart: function(xhr) {
        var msg = "[ajaxStart] ";
        pluginLog(tag, msg, {
          xhr:xhr
        });
      },
      ajaxComplete: function(xhr) {
        var msg = "[ajaxComplete] ";
        pluginLog(tag, msg, {
          xhr:xhr
        });
      },
    } // end hooks
  };
};
