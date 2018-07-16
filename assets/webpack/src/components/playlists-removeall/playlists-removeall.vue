<script>
import Vue from "../../../../../node_modules/vue/dist/vue.esm";
import { mapGetters } from "vuex";

export default {
    name: "PlaylistsRemoveAll",

    methods:{
        onRemoveAllPlaylists() {
            this.$store.dispatch("removeAllPlaylists",{r:this.$router});
        }
    },

    template: require("./playlists-removeall-tmpl.pug").toString()
};
</script>
