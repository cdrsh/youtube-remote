<script>
import Vue from "../../../../../node_modules/vue/dist/vue.esm";
import { mapGetters } from "vuex";

export default {
    name: "OnePlaylistRemoveAll",

    methods:{
        onRemoveAllVideos:function() {
            this.$store.dispatch("removeAllVideos",{r:this.$router,idpl:this.$route.params.idpl});
        },

    },

    template: require("./one-playlist-removeall-tmpl.pug").toString()
};
</script>
