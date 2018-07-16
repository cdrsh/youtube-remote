// PlayList Item
module.exports = {
	attributes: {
		//Playlist ID (1)
		//id: { type: 'number',required: true },

		//Number in list of playlists
		num: { type: 'number', required: true },

		//Name of playlist
		nam: { type: 'string'},

		//Array of Video objects
		//obj: VideoArray
		videos: {
			collection: 'Video',
			via: 'idpl',
		}
		
	},
};
