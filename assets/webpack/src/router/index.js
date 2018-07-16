import Vue from "../../../../node_modules/vue/dist/vue.esm";
import VueRouter from "vue-router";

import Playlists from "../components/playlists/playlists";
import PlaylistsAdd from "../components/playlists-add/playlists-add";
import PlaylistsEditList from "../components/playlists-edit-list/playlists-edit-list";
import PlaylistsEdit from "../components/playlists-edit/playlists-edit";
import PlaylistsMove from "../components/playlists-move/playlists-move";
import PlaylistsRemove from "../components/playlists-remove/playlists-remove";
import PlaylistsRemoveAll from "../components/playlists-removeall/playlists-removeall";
import PlaylistsImport from "../components/playlists-import/playlists-import";
import PlaylistsExport from "../components/playlists-export/playlists-export";

import OnePlaylist from "../components/one-playlist/one-playlist";
import OnePlaylistAdd from "../components/one-playlist-add/one-playlist-add";
import OnePlaylistEditList from "../components/one-playlist-edit-list/one-playlist-edit-list";
import OnePlaylistEdit from "../components/one-playlist-edit/one-playlist-edit";
import OnePlaylistMove from "../components/one-playlist-move/one-playlist-move";
import OnePlaylistRemove from "../components/one-playlist-remove/one-playlist-remove";
import OnePlaylistRemoveAll from "../components/one-playlist-removeall/one-playlist-removeall";
import YoutubeSearch from "../components/youtube-search/youtube-search";

import Settings from "../components/settings/settings";

const NotFound = { template: "<p>Page not found</p>" };

import Vuex from "vuex";
Vue.use(Vuex);
import { store } from "../vuex/store";


export default new VueRouter({
    mode: "history",
    base: "/",
    routes: [
        {
            path: "/",
            name: "Root",
            redirect: { name: "Playlists" }
        },
        {
            path: "/playlists",
            name: "Playlists",
            component: Playlists,
        },
        {
            path: "/playlists/add",
            name: "PlaylistsAdd",
            component: PlaylistsAdd,
        },
        {
            path: "/playlists/edit/list",
            name: "PlaylistsEditList",
            component: PlaylistsEditList,
        },
        {
            path: "/playlists/edit/e/:id",
            name: "PlaylistsEdit",
            component: PlaylistsEdit,
        },
        {
            path: "/playlists/move",
            name: "PlaylistsMove",
            component: PlaylistsMove,
        },
        {
            path: "/playlists/remove",
            name: "PlaylistsRemove",
            component: PlaylistsRemove,
        },
        {
            path: "/playlists/removeall",
            name: "PlaylistsRemoveAll",
            component: PlaylistsRemoveAll,
        },
        {
            path: "/playlists/import",
            name: "PlaylistsImport",
            component: PlaylistsImport,
        },
        {
            path: "/playlists/export",
            name: "PlaylistsExport",
            component: PlaylistsExport,
        },
        
        
        //One playlist
        {
            path: "/oneplaylist/list/:idpl",
            name: "OnePlaylist",
            component: OnePlaylist
        },
        {
            path: "/oneplaylist/add/:idpl",
            name: "OnePlaylistAdd",
            component: OnePlaylistAdd
        },
        {
            path: "/oneplaylist/edit/list/:idpl",
            name: "OnePlaylistEditList",
            component: OnePlaylistEditList
        },
        {
            path: "/oneplaylist/edit/e/:idpl/:id",
            name: "OnePlaylistEdit",
            component: OnePlaylistEdit
        },
        {
            path: "/oneplaylist/move/:idpl",
            name: "OnePlaylistMove",
            component: OnePlaylistMove
        },
        {
            path: "/oneplaylist/remove/:idpl/:id",
            name: "OnePlaylistRemove",
            component: OnePlaylistRemove
        },
        {
            path: "/oneplaylist/removeall/:idpl",
            name: "OnePlaylistRemoveAll",
            component: OnePlaylistRemoveAll
        },
        {
            path: "/oneplaylist/youtubesearch/:idpl",
            name: "YoutubeSearch",
            component: YoutubeSearch
        },
        {
            path: "/settings",
            name: "Settings",
            component: Settings,
        },
        {
            path: "*",
            name: "NotFound",
            component: NotFound
        }
    ]
});
