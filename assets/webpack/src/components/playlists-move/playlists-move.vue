<script>
import Vue from "../../../../../node_modules/vue/dist/vue.esm";
import { mapGetters } from "vuex";

export default {
    name: "PlaylistsMove",

    methods:{
        moveUp(obj) {
            this.$store.dispatch("movePlaylist", {...obj,dir:1});
        },

        moveDw(obj) {
            this.$store.dispatch("movePlaylist", {...obj,dir:2});
        },
    },

    computed: {
        ...mapGetters([
            "getPlaylists",
        ]),
    },

    created: function() {
        this.$store.dispatch("loadPlaylists");
    },

    template: require("./playlists-move-tmpl.pug").toString()
};
</script>
