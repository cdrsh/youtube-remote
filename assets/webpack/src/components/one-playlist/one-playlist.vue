<script>
import Vue from "../../../../../node_modules/vue/dist/vue.esm";
import { mapGetters } from "vuex";

export default {
    name: "OnePlaylist",

    data() {
        return {
            playListName:"",
            bSearch:false,
            menuToggled:false,
            txt:''
        };
    },

    methods:{

        doSearch() {
            this.$store.dispatch("setVideoFindMode",{
                bFind:this.bSearch,
                txt:this.txt
            });
        },

        toggleSearch() {
            this.bSearch=!this.bSearch;
            if(!this.bSearch) {
                this.txt="";
                this.$store.dispatch("setVideoFindMode",{
                    bFind:this.bSearch,
                    txt:this.txt
                });
            }
            this.menuToggled=false;
        },

        onMenuToggle() {
            this.menuToggled=!this.menuToggled;
        },

        onPlayVideo(id) {
            this.$store.dispatch("playVideo",{id:id});
        },

        onStopVideo(id) {
            this.$store.dispatch("stopVideo",{id:id});
        },
    },

    computed: {
        ...mapGetters([
            "getVideos",
            "getPlaylistName",
            "getPlayerID",
            "getPlayerState",
        ]),
    },

    created: function() {
        this.$store.dispatch("loadOnePlaylist",{idpl:this.$route.params.idpl});

        if(this.getPlaylistName(this.$route.params.idpl)=="") {
            this.$store.dispatch("loadPlaylists");
        }

        this.$store.dispatch("setVideoFindMode",{
            bFind:false,
            txt:''
        });
    },

    template: require("./one-playlist-tmpl.pug").toString()
};
</script>
