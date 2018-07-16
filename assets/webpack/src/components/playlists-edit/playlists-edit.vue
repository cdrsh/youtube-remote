<script>
import Vue from "../../../../../node_modules/vue/dist/vue.esm";
import { mapGetters } from "vuex";

export default {
    name: "PlaylistsEdit",

    data() {
        return {
            playlist:{
                id:-1, 
                nam:''
            }
        };
    },

    methods:{
        onSave:function() {
            this.$store.dispatch("editPlaylist",{
                ...this.playlist, 
                r:this.$router
            });
        }
    },

    created:function() {
        var pl=this.$store.getters.getEditPlaylist(this.$route.params.id);
        this.playlist.id=pl.id;
        this.playlist.nam=pl.nam;
    },
    
    template: require("./playlists-edit-tmpl.pug").toString()
};
</script>
