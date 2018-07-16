import * as consts from "../constants";
import Vue from "../../../../../node_modules/vue/dist/vue.esm";
import VueNotifications from "vue-notifications";


//parse
export default {
    
    //Youtube search
    youtubeSearch({commit},params) {

        return new Promise((resolve, reject) => {

            var nextUrl=this.getters.getVideosYTNextUrl;
            console.log(nextUrl);
            commit(consts.VIDEO_YTSEARCH_INDICATOR, true);
            io.socket.get(
                '/video/search',
                {title:params.title, nextUrl:nextUrl},
                function gotResponse(data) {
                    console.log(data)
                    if(data.status==1)
                        commit(consts.VIDEO_YTSEARCH_SUCCESS,{
                            ...data,
                            nextUrl:nextUrl
                        });
                    commit(consts.VIDEO_YTSEARCH_INDICATOR, false);
                });
            resolve(true);
            
        });
    },

    //Set video find mode
    setVideoFindMode({commit},params) {
        commit(consts.VIDEO_FIND_MODE, params);
    },

    //Remove all videos
    removeAllVideos({ commit },params) {
        return new Promise((resolve, reject) => {

            commit(consts.VIDEO_REMOVEALL_INDICATOR, true);
            io.socket.get(
                '/video/removeall',
                {idpl:params.idpl},
                function gotResponse(data) {
                    commit(consts.VIDEO_REMOVEALL_SUCCESS);
                    commit(consts.VIDEO_REMOVEALL_INDICATOR, false);
                    params.r.push({ name: 'OnePlaylist', params:{idpl:params.idpl} });
                    VueNotifications.success({
                        message:'All videos remove success'
                    });
                });
            resolve(true);
            
        });
    },    

    //Remove video
    removeVideos({ commit },params) {        
        return new Promise((resolve, reject) => {

            commit(consts.VIDEO_REMOVE_INDICATOR, true);
            io.socket.get(
                '/video/remove',
                {ids:params.ids},
                function gotResponse(data) {
                    commit(consts.VIDEO_REMOVE_SUCCESS, params.ids);
                    commit(consts.VIDEO_REMOVE_INDICATOR, false);
                    VueNotifications.success({
                        message:'Playlists remove success'
                    });
                });
            resolve(true);
            
        });
    },


    //Move video
    moveVideo({ commit },params) {
        return new Promise((resolve, reject) => {

            commit(consts.VIDEO_MOVE_INDICATOR, true);
            io.socket.get(
                '/video/move',
                {...params},//dir=1 - move up
                (data) => {

                    if(data.status==1) {
                        commit(consts.VIDEO_MOVE_SUCCESS,{
                            idold:params.id,
                            idnew:data.idnew
                        });
                    }

                    commit(consts.VIDEO_MOVE_INDICATOR, false);
                });
            resolve(true);
            
        });
    },

    //Edit video
    editVideo({ commit },params) {
        return new Promise((resolve, reject) => {

            commit(consts.VIDEO_EDIT_INDICATOR, true);
            io.socket.get(
                '/video/edit',
                {
                    url:params.url,
                    id:params.id,
                },
                (data) => {
                    if(data.status==1) {
                        commit(consts.VIDEO_EDIT_SUCCESS,data.video);
                        params.r.push({ 
                            name: 'OnePlaylistEditList', 
                            params:{idpl:params.idpl} 
                        });
                    }
                    commit(consts.VIDEO_EDIT_INDICATOR, false);
                });
            resolve(true);
            
        });
    },

    //add video
    addVideo({ commit },params) {
        return new Promise((resolve, reject) => {

            commit(consts.VIDEO_ADD_INDICATOR, true);
            io.socket.get(
                '/video/add',
                {
                    url:params.url,
                    idpl:params.idpl
                },
                (data) => {
                    if(data.status==1) {
                        params.r.push({ name: 'OnePlaylist', params:{idpl:params.idpl} });
                    }
                    commit(consts.VIDEO_ADD_INDICATOR, false);
                });
            resolve(true);
            
        });
    },
   
    //Set Playlist find mode
    setPlaylistFindMode({commit},params) {
        commit(consts.PLAYLIST_FIND_MODE, params);
    },

    //Move playlist
    movePlaylist({ commit },params) {
        return new Promise((resolve, reject) => {

            commit(consts.PLAYLIST_MOVE_INDICATOR, true);
            io.socket.get(
                '/playlists/move',
                {...params},//dir=1 - move up
                (data) => {
                    if(data.status==1) {
                        commit(consts.PLAYLIST_MOVE_SUCCESS,{
                            idold:params.id,
                            idnew:data.idnew
                        });
                    }
                    commit(consts.PLAYLIST_MOVE_INDICATOR, false);
                });
            resolve(true);
            
        });
    },



    //Remove all playlists
    removeAllPlaylists({ commit },params) {
        return new Promise((resolve, reject) => {

            commit(consts.PLAYLISTS_REMOVEALL_INDICATOR, true);
            io.socket.get(
                '/playlists/removeall',
                function gotResponse(data) {
                    commit(consts.PLAYLISTS_REMOVEALL_SUCCESS);
                    commit(consts.PLAYLISTS_REMOVEALL_INDICATOR, false);
                    params.r.push("/playlists");
                    VueNotifications.success({
                        message:'All playlists remove success'
                    });
                });
            resolve(true);
            
        });
    },


    //Remove playlist
    removePlaylist({ commit },params) {
        
        return new Promise((resolve, reject) => {

            commit(consts.PLAYLISTS_REMOVE_INDICATOR, true);
            io.socket.get(
                '/playlists/remove',
                {ids:params.ids},
                function gotResponse(data) {
                    commit(consts.PLAYLISTS_REMOVE_SUCCESS, params.ids);
                    commit(consts.PLAYLISTS_REMOVE_INDICATOR, false);
                    //params.r.push("/playlists");
                    VueNotifications.success({
                        message:'Playlists remove success'
                    });
                });
            resolve(true);
            
        });

    },


    //Check playlist
    checkPlaylistItem({ commit }, obj) {
        commit(consts.PLAYLIST_CHECK, obj);
    },

    //Check video
    checkVideoItem({ commit }, obj) {
        commit(consts.VIDEO_CHECK, obj);
    },

    //Edit playlist
    editPlaylist({ commit },params) {
        
        return new Promise((resolve, reject) => {

            commit(consts.PLAYLISTS_EDIT_INDICATOR, true);
            io.socket.get(
                '/playlists/edit',
                {nam:params.nam, idpl:params.id},
                function gotResponse(data) {
                    commit(consts.PLAYLISTS_EDIT_SUCCESS, data.playlist);
                    commit(consts.PLAYLISTS_EDIT_INDICATOR, false);
                    params.r.push("/playlists/edit/list");
                    VueNotifications.success({
                        message:'Playlist '+params.nam+' save success'
                    });
                });
            resolve(true);
            
        });

    },


    //Add playlist
    addPlaylist({ commit },params) {

        return new Promise((resolve, reject) => {
            commit(consts.PLAYLISTS_ADD_INDICATOR, true);
            io.socket.get(
                '/playlists/add', 
                {nam:params.nam},
                function gotResponse(data) {
                    commit(consts.PLAYLISTS_ADD_SUCCESS, data.playlist);
                    commit(consts.PLAYLISTS_ADD_INDICATOR, false);
                    params.r.push("/playlists");
                    VueNotifications.success({
                        message:'Playlist '+params.nam+' add success'
                    });
                });
            resolve(true);
        });

    }, 



    //Load all playlists
    loadPlaylists({ commit }) {

        return new Promise((resolve, reject) => {
            commit(consts.PLAYLISTS_LOAD_INDICATOR, true);
            io.socket.get(
                '/playlists/getall', 
                function gotResponse(data) {
                    data.playlists.map(itm=>{itm.chk=false;});
                    commit(consts.PLAYLISTS_LOAD_SUCCESS, data.playlists);
                    commit(consts.PLAYLISTS_LOAD_INDICATOR, false);
                });
            resolve(true);
        });

    }, 



    //Load one playlist
    loadOnePlaylist({ commit },params) {

        return new Promise((resolve, reject) => {
            commit(consts.ONE_PLAYLIST_LOAD_INDICATOR, true);
            io.socket.get(
                '/video/getoneplaylist',
                {idpl:params.idpl}, 
                function gotResponse(data) {
                    data.videos.map(itm=>{itm.chk=false;});
                    commit(consts.ONE_PLAYLIST_LOAD_SUCCESS, data.videos);
                    commit(consts.ONE_PLAYLIST_LOAD_INDICATOR, false);
                });
            resolve(true);
        });

    },


    //load Settings
    loadSettings({ commit }, params) {

    },




    //Play video
    playVideo({commit},params) {

        return new Promise((resolve, reject) => {

            commit(consts.PLAYER_PLAY_INDICATOR, true);
            io.socket.get(
                '/player/play',
                params,
                function gotResponse(data) {
                    if(data.status==1) {
                        params.id=data.id;
                        params.idpl=data.idpl;
                        commit(consts.PLAYER_PLAY_SUCCESS, params);
                    }
                    commit(consts.PLAYER_PLAY_INDICATOR, false);
                });
            resolve(true);
            
        });
    },



    //Stop video
    stopVideo({commit},params) {

        return new Promise((resolve, reject) => {

            commit(consts.PLAYER_STOP_INDICATOR, true);
            io.socket.get(
                '/player/stop',
                params,
                function gotResponse(data) {
                    if(data.status==1) {
                        params.id=data.id;
                        params.idpl=data.idpl;
                        commit(consts.PLAYER_STOP_SUCCESS, params);
                    }
                    commit(consts.PLAYER_STOP_INDICATOR, false);
                });
            resolve(true);
            
        });
    },



    //Rewind video
    rewindVideo({commit},params) {

        return new Promise((resolve, reject) => {

            commit(consts.PLAYER_REWIND_INDICATOR, true);
            io.socket.get(
                '/player/rewind',
                params,
                function gotResponse(data) {
                    if(data.status==1) {
                        params.id=data.id;
                        params.idpl=data.idpl;
                        commit(consts.PLAYER_REWIND_SUCCESS, params);
                    }
                    commit(consts.PLAYER_REWIND_INDICATOR, false);
                });
            resolve(true);
            
        });
    },



    //setActive Player
    setActivePlayer({commit},params) {

        return new Promise((resolve, reject) => {

            commit(consts.PLAYER_PLAY_SUCCESS, params);
            resolve(true);
            
        });
    },
};
