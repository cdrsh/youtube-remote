module.exports.routes = {

  //Root url
  '/': { view: 'layouts/layout' },

  //Root url control center
  '/playlists':'/',

  //Fill demo data to db
  '/filldemo': 'DemoController.filldemo',

  //Playlists

  //get
  '/playlists/getall': 'PlayListController.getall',

  //add
  '/playlists/add': 'PlayListController.addPlaylist',

  //edit
  '/playlists/edit': 'PlayListController.editPlaylist',

  //remove
  '/playlists/remove': 'PlayListController.removePlaylist',

  //removeAll
  '/playlists/removeall': 'PlayListController.removeAllPlaylists',

  //move
  '/playlists/move': 'PlayListController.movePlaylist',

  //import
  '/playlists/import': 'PlayListController.importPlaylist',

  //export
  '/playlists/export': 'PlayListController.exportPlaylist',



  //One playlist

  //Load videos of the one playlist
  '/video/getoneplaylist': 'PlayListController.getOnePlaylist',

  //Add video
  '/video/add': 'PlayListController.addVideo',

  //Edit Video
  '/video/edit': 'PlayListController.editVideo',

  //Remove Video
  '/video/remove': 'PlayListController.removeVideo',

  //RemoveAll Video
  '/video/removeall': 'PlayListController.removeAllVideos',

  //Move Video
  '/video/move': 'PlayListController.moveVideo',

  //Youtube search
  '/video/search': 'PlayListController.youtubeSearch',



  //Player

  //Play
  '/player/play': 'PlayListController.play',

  //Stop
  '/player/stop': 'PlayListController.stop',

  //Rewind playlist
  '/player/rewind': 'PlayListController.rewind',

  //Get next video
  '/player/nextvideo': 'PlayListController.nextvideo',
  
};
