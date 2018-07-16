// Video
module.exports = {
	attributes: {

		vidid: { 
			description: 'Youtube Video-ID',
			example: 'ABCABC',

			type: 'string', 
			required: true,
		},

		vid: { 
			description: 'Youtube Video full url',
			example: 'ABCABC',

			type: 'string', 
			required: true,
		},

		tmstart: { 
			description: 'Time start',
			example: '1s',

			type: 'string'
		},

		fullscr: { 
			description: 'FullScreen',
			example: '1',

			type: 'number' 
		},

		w: { 
			description: 'Width',
			example: '1',

			type: 'number', 
			defaultsTo: -1,
			example: '100',
		},

		h: { 
			description: 'Height',
			example: '1',

			type: 'number', 
			defaultsTo: -1,
			example: '100',
		},

		quality: { 
			description: 'Video Quality',
			example: '1',

			type: 'number', 
			defaultsTo: 0 
		},

		autoplay: { 
			description: 'Autostart video on open',
			example: '1',

			type: 'number', 
			defaultsTo: 1 
		},

		speed: { 
			description: 'Speed video',
			example: '0',

			type: 'number', 
			defaultsTo: 0 
		},

		title: {
			description: 'Video title',
			example: 'Alizee',

			type: 'string'
		},

		imgurl: {
			description: 'image url or empty',
			example: 'http://image.jpg',
			
			type: 'string'
		},

		num: {
			description: 'Number in playlist',
			example: '0',

			type: 'number'
		},

		idpl:{
			model: 'playlist'
		}
	},
};