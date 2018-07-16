<script>
import Vue from "../../../../../node_modules/vue/dist/vue.esm";
import { mapGetters } from "vuex";

export default {
    name: "OnePlaylistRemove",

    data() {
        return {
            ids:[]
        };
    },

    methods:{
        //Video checked
        onCheck(obj) {
            if(obj.chk) {
                for(var i=this.ids.length;i>=0;i--) 
                    if(this.ids[i]==obj.id) 
                        this.ids.splice(i,1);
            }
            else 
                this.ids.push(obj.id);
            this.$store.dispatch("checkVideoItem",obj);
        },

        //Remove selected playlists
        onRemoveSelected() {
            this.$store.dispatch("removeVideos",{
                ids:this.ids,
                r:this.$router
            });
        },

        //Remove one playlist
        onRemoveOne(id) {
            for(var i=this.ids.length;i>=0;i--) 
                if(this.ids[i]==id) 
                    this.ids.splice(i,1);
            this.$store.dispatch("removeVideos",{
                ids:[id],
                r:this.$router
            });
        }
    },

    computed: {
        ...mapGetters([
            "getVideos"
        ]),
    },

    template: require("./one-playlist-remove-tmpl.pug").toString()
};
</script>
