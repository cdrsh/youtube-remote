<script>
import Vue from "../../../../../node_modules/vue/dist/vue.esm";
import VueNotifications from 'vue-notifications';
import { mapGetters } from "vuex";

export default {
    name: "OnePlaylistMove",

    data() {
        return {

        };
    },

    methods:{
        moveUp(obj) {
            this.$store.dispatch("moveVideo", {...obj,dir:1});
        },

        moveDw(obj) {
            this.$store.dispatch("moveVideo", {...obj,dir:2});
        },
    },

    computed: {
        ...mapGetters([
            "getVideos"
        ]),
    },

    created: function() {
        this.$store.dispatch("loadOnePlaylist",{
            idpl:this.$route.params.idpl
        });
    },

    template: require("./one-playlist-move-tmpl.pug").toString()
};
</script>
