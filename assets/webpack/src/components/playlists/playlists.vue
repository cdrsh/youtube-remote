<script>
import Vue from "../../../../../node_modules/vue/dist/vue.esm";
import VueNotifications from 'vue-notifications';
import { mapGetters } from "vuex";

export default {
    name: "Playlists",

    data() {
        return {
            bSearch:false,
            menuToggled:false,
            txt:''
        };
    },

    methods:{

        doSearch() {
            this.$store.dispatch("setPlaylistFindMode",{
                bFind:this.bSearch,
                txt:this.txt
            });
        },

        toggleSearch() {
            this.bSearch=!this.bSearch;
            if(!this.bSearch) {
                this.txt="";
                this.$store.dispatch("setPlaylistFindMode",{
                    bFind:this.bSearch,
                    txt:this.txt
                });
            }
            this.menuToggled=false;
        },

        onMenuToggle() {
            this.menuToggled=!this.menuToggled;
        },

        onRewindVideo(idpl) {
            this.$store.dispatch("rewindVideo",{idpl:idpl});
        },

        onPlayVideo(idpl) {
            this.$store.dispatch("playVideo",{idpl:idpl});
        },

        onStopVideo(idpl) {
            this.$store.dispatch("stopVideo",{idpl:idpl});
        },
    },

    computed: {
        ...mapGetters([
            "getPlaylists",
            "getPlayerIDPL",
            "getPlayerState"
        ]),
    },

    created: function() {
        this.$store.dispatch("loadPlaylists");
        this.$store.dispatch("setPlaylistFindMode",{
            bFind:false,
            txt:''
        });
    },

    template: require("./playlists-tmpl.pug").toString()
};
</script>
