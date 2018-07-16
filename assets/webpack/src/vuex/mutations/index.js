import * as consts from "../constants";
import Vue from "../../../../../node_modules/vue/dist/vue.esm";

export default {
    
    //Playlists

    //+++Load Playlists
    //load indicator
    [consts.PLAYLISTS_LOAD_INDICATOR](state, isLoading) {
        state.playlistsIndicator=isLoading;
    },

    //load success
    [consts.PLAYLISTS_LOAD_SUCCESS](state, playlists) {
        state.playlists=playlists;
    },
    //---Load Playlists



    //+++Add Playlist
    //add indicator
    [consts.PLAYLISTS_ADD_INDICATOR](state, isAdding) {
        state.playlistsAddIndicator=isAdding;
    },

    //add success
    [consts.PLAYLISTS_ADD_SUCCESS](state, playlist) {
        Vue.set(state.playlists,state.playlists.length,playlist);
    },
    //---Add Playlist


    
    //+++Edit Playlist
    //edit indicator
    [consts.PLAYLISTS_EDIT_INDICATOR](state, isEditing) {
        state.playlistsEditIndicator=isEditing;
    },

    //edit success
    [consts.PLAYLISTS_EDIT_SUCCESS](state, playlist) {
        var found=state.playlists.filter(el=>el.idpl==playlist.id);
        if(found.length>0) 
            found[0].nam=playlist.nam;
    },
    //---Save Playlist
    


    //+++Remove Playlist
    //remove indicator
    [consts.PLAYLISTS_REMOVE_INDICATOR](state, isRemoving) {
        state.playlistsRemoveIndicator=isRemoving;
    },

    //remove success
    [consts.PLAYLISTS_REMOVE_SUCCESS](state, ids) {
        for(var j=0;j<ids.length;j++) 
            for(var i=state.playlists.length-1;i>=0;i--) 
                if(ids[j]==state.playlists[i].id) 
                    state.playlists.splice(i,1);
    },
    //---Remove Playlist    



    //+++Remove All Playlists
    //remove all indicator
    [consts.PLAYLISTS_REMOVEALL_INDICATOR](state, isRemoving) {
        state.playlistsRemoveIndicator=isRemoving;
    },

    //remove all success
    [consts.PLAYLISTS_REMOVEALL_SUCCESS](state) {
        state.playlists=[];
        state.videos=[];
    },
    //---Remove All Playlists




    //+++Move Playlist
    //Move Playlist Up/Dw indicator
    [consts.PLAYLIST_MOVE_INDICATOR](state, isMoving) {
        state.playlistsMoveIndicator=isMoving;
    },

    //Move Playlist Up/Dw success
    [consts.PLAYLIST_MOVE_SUCCESS](state, params) {
        var oldObj=state.playlists.filter(el => el.id==params.idold);
        var newObj=state.playlists.filter(el => el.id==params.idnew);
        if(oldObj.length>0 && newObj.length>0) {
            var num=oldObj[0].num;
            oldObj[0].num=newObj[0].num;
            newObj[0].num=num;
        }
    },
    //---Move Playlist


    //Video edit
    [consts.VIDEO_EDIT_SUCCESS](state, video) {
        var found=state.videos.filter(itm=>itm.id==video.id);
        if(found.length>0) {
            found[0].title=video.title;
            found[0].vid=video.vid;
            found[0].imgurl=video.imgurl;
        }
    },
    


    //+++Move Video
    //Move Video Up/Dw indicator
    [consts.VIDEO_MOVE_INDICATOR](state, isVideoMoving) {
        state.videosMoveIndicator=isVideoMoving;
    },

    //Move Video Up/Dw success
    [consts.VIDEO_MOVE_SUCCESS](state, params) {
        var oldObj=state.videos.filter(el => el.id==params.idold);
        var newObj=state.videos.filter(el => el.id==params.idnew);
        if(oldObj.length>0 && newObj.length>0) {
            var num=oldObj[0].num;
            oldObj[0].num=newObj[0].num;
            newObj[0].num=num;
        }
    },
    //---Move Video
    


    //+++Remove Video
    //Remove Video
    [consts.VIDEO_REMOVE_INDICATOR](state, isRemoving) {
        state.videoRemoveIndicator=isRemoving;
    },

    //Remove video
    [consts.VIDEO_REMOVE_SUCCESS](state, ids) {
        for(var j=0;j<ids.length;j++) 
            for(var i=state.videos.length-1;i>=0;i--) 
                if(ids[j]==state.videos[i].id) 
                    state.videos.splice(i,1);
    },

    //Remove all videos indicator
    [consts.VIDEO_REMOVEALL_INDICATOR](state, isRemoving) {
        state.videoRemoveIndicator=isRemoving;
    },

    //Remove all videos
    [consts.VIDEO_REMOVEALL_SUCCESS](state) {
        state.videos=[];
    },
    //---Remove Video
    

    
    //Youtube search indicator
    [consts.VIDEO_YTSEARCH_INDICATOR](state, isSearching) {
        state.videoYTSearching=isSearching;
    },

    //Youtube search success
    [consts.VIDEO_YTSEARCH_SUCCESS](state, vidObj) {
        //При уходе очистить
        //При получении сравнить сслыки дальше и текущую ссылку дальше перенести в старые
        //Пополнить список видео уникальными ссылками
        console.log(vidObj.videosYT);
        console.log(vidObj.nextUrls);
        console.log(vidObj.nextUrl);

        //next search
        if(vidObj.nextUrl!="") {

            //Add new unique videos
            for(var i=0;i<vidObj.videosYT.length;i++) {
                var found=state.videosYT.filter(
                    itmOld => itmOld.href == vidObj.videosYT[i].href
                );
                if(found.lenght==0) 
                    Vue.set(state.videosYT,state.videosYT.length,vidObj.videosYT[i]);
            }


            //Remove used new URL from actual list
            for(var i=0;i<state.videosYTNext.length;i++) {
                if(state.videosYTNext[i]==vidObj.nextUrl) {
                    state.videosYTNext.splice(i,1);
                    break;
                }
            }

            //Add to old list
            Vue.set(
                state.videosYTLoaded,
                state.videosYTLoaded.length,
                vidObj.nextUrl
            );
            
            //Add new next urls
            //Check it in old and new lists
            for(var i=0;i<vidObj.nextUrls.length;i++) {
                var foundCur=state.videosYTNext.filter(
                    itm => itm == vidObj.nextUrls[i]
                );
                
                var foundOld=state.videosYTLoaded.filter(
                    itm => itm == vidObj.nextUrls[i]
                );

                if(foundCur.length==0 && foundOld.length==0) {
                    Vue.set(
                        state.videosYTNext,
                        state.videosYTNext.length,
                        vidObj.nextUrls[i]
                    );
                }
            }
            
        }
        else {
            state.videosYTNext=vidObj.nextUrls;
            state.videosYT=vidObj.videosYT;
        }

        console.log("===");
        console.log(state.videosYT);
        console.log(state.videosYTNext);
        console.log(state.videosYTLoaded);

    },




    //Set Playlist Find Mode
    [consts.PLAYLIST_FIND_MODE](state, params) {
        state.playlistTextToFind=params.txt;
        state.playlistsFindMode=params.bFind;
    },


    //Set video Find Mode
    [consts.VIDEO_FIND_MODE](state, params) {
        state.videoTextToFind=params.txt;
        state.videoFindMode=params.bFind;
    },
    
    

    //check playlist
    [consts.PLAYLIST_CHECK](state, obj) {
        var found=state.playlists.filter(el=>el.id==obj.id);
        if(found.length>0)
            found[0].chk=!found[0].chk;
    },


    //check video
    [consts.VIDEO_CHECK](state, obj) {
        var found=state.videos.filter(el => el.id==obj.id);
        if(found.length>0)
            found[0].chk=!found[0].chk;
    },
    



    //+++One playlist
    //onePlaylist load indicator
    [consts.ONE_PLAYLIST_LOAD_INDICATOR](state, isLoading) {
        state.onePlaylistLoading=isLoading;
    },

    //onePlaylist load success
    [consts.ONE_PLAYLIST_LOAD_SUCCESS](state, videos) {
        state.videos=videos;
    },



    //onePlaylist add indicator
    [consts.VIDEO_ADD_INDICATOR](state, isAdding) {
        state.onePlaylistAddIndicator=isAdding;
    },

    //onePlaylist add success
    [consts.VIDEO_ADD_SUCCESS](state, video) {
        Vue.set(state.videos,state.videos.length,video);
    },

    //onePlaylist edit success
    [consts.VIDEO_EDIT_INDICATOR](state, isEditing) {
        state.onePlaylistEditIndicator=isEditing;
    },
    
    //---One playlist





    //Settings load success
    [consts.GET_SETTINGS_SUCCESS](state, settings) {
        Vue.set(state,'settings',settings)
        Vue.set(state,'settingsLoaded',true)
    },

    //Settings load error
    [consts.GET_SETTINGS_FAIL](state, error) {
        console.log(error);
    },

    //Settings set loading flag
    [consts.GET_SETTINGS_INDICATOR](state, isLoading) {
        state.settingsLoadingFlag=isLoading;
    },






    //+++Player
    //play indicator
    [consts.PLAYER_PLAY_INDICATOR](state, isPlaying) {
        state.playerPlayIndicator=isPlaying;
    },

    //play success
    [consts.PLAYER_PLAY_SUCCESS](state, obj) {
        state.player={
            id:obj.id,
            idpl:obj.idpl,
            isplay:true
        };
    },
    


    //stop indicator
    [consts.PLAYER_STOP_INDICATOR](state, isStopping) {
        state.playerStopIndicator=isStopping;
    },

    //stop success
    [consts.PLAYER_STOP_SUCCESS](state, obj) {
        state.player={
            id:obj.id,
            idpl:obj.idpl,
            isplay:false
        };
    },


    
    //rewind indicator
    [consts.PLAYER_REWIND_INDICATOR](state, isRewind) {
        state.playerRewindIndicator=isRewind;
    },

    //rewind success
    [consts.PLAYER_REWIND_SUCCESS](state, obj) {
        state.player={
            id:obj.id,
            idpl:obj.idpl,
            isplay:true
        };
    },
    //---Player



   
    
};
