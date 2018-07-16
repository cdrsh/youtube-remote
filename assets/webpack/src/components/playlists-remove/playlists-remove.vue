<script>
import Vue from "../../../../../node_modules/vue/dist/vue.esm";
import { mapGetters } from "vuex";

export default {
    name: "PlaylistsRemove",

    data() {
        return {
            ids:[]
        };
    },

    methods:{

        //Remove selected playlists
        onRemoveSelected() {
            this.$store.dispatch("removePlaylist",{
                ids:this.ids,
                r:this.$router
            });
        },

        //Playlist checked
        onCheck(obj) {
            if(obj.chk) {
                for(var i=this.ids.length;i>=0;i--) 
                    if(this.ids[i]==obj.id) 
                        this.ids.splice(i,1);
            }
            else 
                this.ids.push(obj.id);
            this.$store.dispatch("checkPlaylistItem",obj);
        },

        //Remove one playlist
        onRemoveOne(id) {
            for(var i=this.ids.length;i>=0;i--) 
                if(this.ids[i]==id) 
                    this.ids.splice(i,1);
            this.$store.dispatch("removePlaylist",{
                ids:[id],
                r:this.$router
            });
        }
    },

    computed: {
        ...mapGetters([
            "getPlaylists",
        ]),
    },

    created: function() {
        this.$store.dispatch("loadPlaylists");
    },

    template: require("./playlists-remove-tmpl.pug").toString()
};
</script>
