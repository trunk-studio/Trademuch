/**
 * Concatenate files.
 *
 * ---------------------------------------------------------------
 *
 * Concatenates files javascript and css from a defined array. Creates concatenated files in
 * .tmp/public/contact directory
 * [concat](https://github.com/gruntjs/grunt-contrib-concat)
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-concat
 */
module.exports = function(grunt) {

	grunt.config.set('concat', {
		js: {
			src: require('../pipeline').jsFilesToInject,
			dest: '.tmp/public/concat/production.js'
		},
		mapJs:{
			src: require('../pipeline').mapJsFilesToInject,
			dest: '.tmp/public/concat/map.production.js'
		},
		css: {
			src: require('../pipeline').cssFilesToInject,
			dest: '.tmp/public/concat/production.css'
		},
		mapCss: {
			src: require('../pipeline').mapCssFilesToInject,
			dest: '.tmp/public/concat/map.production.css'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
};
