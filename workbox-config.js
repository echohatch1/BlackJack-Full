module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{png,ico,ttf,jpg,html,svg,js,css}'
	],
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	swDest: 'sw.js'
};