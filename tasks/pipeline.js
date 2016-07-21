/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files, and the ! prefix for excluding files.)
 */

// Path to public folder
var tmpPath = '.tmp/public/';

// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFilesToInject = [
  'bower/framework7/css/framework7.ios.colors.css',
  'bower/framework7/css/my-app.css',
  '/fonts/font-awesome.css',
  'styles/**/*.css',
  '!styles/mapCss/**/*.css',
  '!styles/importer.css',
  '!styles/landing/**/*.css',
  "!/styles/bootstrap/css/bootstrap.min.css"
];


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [

  // Load sails.io before everything else
  // Dependencies like jQuery, or Angular are brought in here
  // 'js/dependencies/**/*.js',
  // Use the "exclude" operator to ignore files
  // '!js/ignore/these/files/*.js'
  'bower/**/*.js',
  'js/dependencies/*.js',
  'js/includes/utils.js',
  'js/includes/*.js',
  'js/plugins/*.js',
  'js/views/includes/*.js',
  'js/views/*.js',
  'js/*.js',
  'js/pages/includes/*.js',
  'js/pages/*.js',
  '!/bower/jquery/jquery.js',
  "!/bower/bootstrap-sass/bootstrap.js",
  "!/bower/bootstrap/bootstrap.js",
  '!bower/framework7/js/*.js',
  '!bower/framework7/js/my-app.js',
  '!/bower/sails.io.js',
  '!/bower/sails.io.js/sails.io.js',
  '!js/map/*.js',
  '!js/landing/*.js'
];

var mapCssFilesToInject = [
  'styles/bootstrap/css/bootstrap.min.css',
  'styles/mapCss/bootstrap-select.min.css',
  'styles/mapCss/owl.carousel.css',
  'styles/mapCss/jquery.mCustomScrollbar.css',
  'styles/mapCss/style.css',
  'styles/mapCss/colors/blue.css',
  '!styles/mapCss/user.style.css',
  'styles/mapCss/index.css',
];

var mapJsFilesToInject = [
  'js/map/jquery-2.1.0.min.js',
  'js/map/before.load.js',
  'js/map/jquery-migrate-1.2.1.min.js',
  '/styles/bootstrap/js/bootstrap.min.js',
  '!js/map/smoothscroll.js',
  'js/map/bootstrap-select.min.js',
  '!js/map/jquery.hotkeys.js',
  '!js/map/jquery.nouislider.all.min.js',
  '!js/map/jquery.mCustomScrollbar.concat.min.js',
  // removed sensor paramate to avoid warring.
  'js/map/infobox.js',
  'js/map/richmarker-compiled.js',
  'js/map/markerclusterer.js',
  'js/map/custom.js',
  'js/map/maps.js',
  'js/map/mapControl.js',
  '!js/favbox.js',
  '!js/app.js',
];


// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
  'templates/**/*.html'
];



// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(transformPath);
module.exports.jsFilesToInject = jsFilesToInject.map(transformPath);
module.exports.mapCssFilesToInject = mapCssFilesToInject.map(transformPath);
module.exports.mapJsFilesToInject = mapJsFilesToInject.map(transformPath);
module.exports.templateFilesToInject = templateFilesToInject.map(transformPath);

// Transform paths relative to the "assets" folder to be relative to the public
// folder, preserving "exclude" operators.
function transformPath(path) {
  return (path.substring(0, 1) == '!') ? ('!' + tmpPath + path.substring(1)) : (tmpPath + path);
}
