<script>
import Vue from "../../../../../node_modules/vue/dist/vue.esm";
import { mapGetters } from "vuex";

export default {
    name: "OnePlaylistEditList",

    computed: {
        ...mapGetters([
            "getVideos"
        ]),
    },

    template: require("./one-playlist-edit-list-tmpl.pug").toString()
};
</script>
