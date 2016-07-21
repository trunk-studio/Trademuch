module.exports = function (grunt) {
	grunt.registerTask('linkAssets', [
		'sails-linker:devJs',
		'sails-linker:devStyles',
		'sails-linker:devTpl',
		'sails-linker:devJsJade',
		'sails-linker:devMapJsJade',
		'sails-linker:devStylesJade',
		'sails-linker:devMapStylesJade',
		'sails-linker:devTplJade'
	]);
};
