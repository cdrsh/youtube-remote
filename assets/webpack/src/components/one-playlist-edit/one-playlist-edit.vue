<script>
import Vue from "../../../../../node_modules/vue/dist/vue.esm";
import { mapGetters } from "vuex";

export default {
    name: "OnePlaylistEdit",

    data() {
        return {
            url:'',
            id:-1
        };
    },

    methods:{
        onEditVideo:function() {
            this.$store.dispatch("editVideo",{
                url:this.url,
                r:this.$router,
                idpl:this.$route.params.idpl,
                id:this.$route.params.id
            });
        }
    },

    created: function() {
        var vid=this.$store.getters.getEditVideo(this.$route.params.id);
        this.url=vid.vid;
        this.id=vid.id;
    },
    

    template: require("./one-playlist-edit-tmpl.pug").toString()
};
</script>
