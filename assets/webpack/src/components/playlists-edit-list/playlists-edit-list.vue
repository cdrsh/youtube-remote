<script>
import Vue from "../../../../../node_modules/vue/dist/vue.esm";
import { mapGetters } from "vuex";

export default {
    name: "PlaylistsEditList",

    computed: {
        ...mapGetters([
            "getPlaylists",
        ]),
    },

    created: function() {
        //Load message from server
        this.$store.dispatch("loadPlaylists");
    },

    template: require("./playlists-edit-list-tmpl.pug").toString()
};
</script>
