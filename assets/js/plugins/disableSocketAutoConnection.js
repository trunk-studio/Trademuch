Framework7.prototype.plugins.disableSocketAutoConnection = function(app, params) {
  // exit if not enabled
  if (!params) return;

  var tag = {
    name: 'disableSocketAutoConnection'
  };
  pluginLog(tag, 'plugin loaded');

  return {
    hooks: {
      appInit: function() {
        // disabl autoConnect to avoid error 400.
        if (typeof io.sails != 'undefinded') {
          io.sails.autoConnect = false;
          pluginLog(tag, 'disable io.sails.autoConnect.');
        }
      },
    } // end hooks
  };
};
