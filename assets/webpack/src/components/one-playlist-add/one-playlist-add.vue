<script>
import Vue from "../../../../../node_modules/vue/dist/vue.esm";
import { mapGetters } from "vuex";

export default {
    name: "OnePlaylistAdd",

    data() {
        return {
            url:'',
            title:''
        };
    },

    methods:{
        onAddVideo:function() {
            this.$store.dispatch("addVideo",{
                url:this.url,
                r:this.$router,
                idpl:this.$route.params.idpl
            });
        },

        onYoutubeSearch:function() {
            this.$store.dispatch("youtubeSearch",{
                title:this.title,
                r:this.$router,
                idpl:this.$route.params.idpl
            });
        }
    },

    template: require("./one-playlist-add-tmpl.pug").toString()
};
</script>
