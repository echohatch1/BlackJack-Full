module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{png,xml,ico,ttf,jpg,html,svg,js,webmanifest,css}'
	],
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	swDest: 'sw.js'
};