<script>
import Vue from "../../../../../node_modules/vue/dist/vue.esm";
import { mapGetters } from "vuex";

export default {
    name: "PlaylistsAdd",

    data() {
        return {
            nam:""
        };
    },

    methods:{
        onAdd:function() {
            this.$store.dispatch("addPlaylist", {nam:this.nam,r:this.$router});
        }
    },

    template: require("./playlists-add-tmpl.pug").toString()
};
</script>
