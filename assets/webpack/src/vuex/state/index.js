export default {

    playlistsIndicator:false,
    playlists:[],

    playlistsAddIndicator:false,
    playlistsEditIndicator:false,
    playlistsRemoveIndicator:false,
    playlistsMoveIndicator:false,
    playlistsFindMode:false,
    videosMoveIndicator:false,
    videoRemoveIndicator:false,
    playlistTextToFind:'',
    
    
    onePlaylistLoading:false,
    videos:[],
    onePlaylistAddIndicator:false,
    onePlaylistEditIndicator:false,
    videoFindMode:false,
    videoTextToFind:'',
    
    playerPlayIndicator:false,
    playerStopIndicator:false,
    playerRewindIndicator:false,

    player:{
        id:-1,
        idpl:-1,
        isplay:false
    },

    settings: {},
    settingsLoaded: false,
    settingsLoadingFlag:false,

    //YT search
    videosYT:[],
    videosYTNext:[],
    videosYTLoaded:[],

    langs:[
        {id:1, code:'en',nam:'English'},
        {id:2, code:'de',nam:'German'},
        {id:3, code:'ru',nam:'Russian'},
    ]
};
