
const sortPlaylist=function (a, b) {
    if (a.num > b.num) return 1;
    if (a.num < b.num) return -1;
    return 0;
};

export default {
    //Get playlists
    getPlaylists: state => bUseSearch => {
        if(state.playlistsFindMode && bUseSearch) 
            return [...state.playlists.filter(
                itm=>itm.nam.indexOf(state.playlistTextToFind)!==-1)
            ].sort(sortPlaylist);
        return [...state.playlists].sort(sortPlaylist);
    },

    //Get videos of the one playlist
    getVideos: state => bUseSearch => {
        if(state.videoFindMode && bUseSearch) 
            return [...state.videos.filter(
                itm=>itm.title.indexOf(state.videoTextToFind)!==-1)
            ].sort(sortPlaylist);
        return [...state.videos].sort(sortPlaylist);
    },

    //Get playlist by id
    getPlaylistName: state => idpl => {
        var res=state.playlists.filter(el=>el.id==idpl);
        if(res.length==0) return "";
        return res[0].nam;
    },

    //Get edit playlist by id
    getEditPlaylist: state => id => {
        var res=state.playlists.filter(el=>el.id==id);
        if(res.length==0) return {nam:'', id:-1, idpl:-1};
        return res[0];
    },

    //Get video to edit
    getEditVideo: state => id => {
        var res=state.videos.filter(el=>el.id==id);
        if(res.length==0) return {vid:'', id:-1, idpl:-1, title:''};
        return res[0];
    },

    //Get youtube found videos
    getYTVideos: state => [...state.videosYT].sort(sortPlaylist),
    

    //Get next url to youtube preload search
    getVideosYTNextUrl: state => {
        if(state.videosYTNext.length==0) return '';
        return state.videosYTNext[0];
    },
    


    //Get played video id
    getPlayerID: state => state.player.id,

    //Get video state
    getPlayerState: state => state.player.isplay,

    //Get played video id
    getPlayerIDPL: state => state.player.idpl,




    
    //Get settings loaded flag
    getSettingsLoaded: state => state.settingsLoaded,

    //Get settings loading flag
    getSettingsLoadingFlag: state => state.settingsLoadingFlag,

    //Get settings
    getSettings: state => state.settings,

    //Get all languages
    getLangs: state => state.langs,
};
