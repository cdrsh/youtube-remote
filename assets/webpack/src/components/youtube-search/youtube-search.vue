<script>
import Vue from "../../../../../node_modules/vue/dist/vue.esm";
import VueNotifications from 'vue-notifications';
import { mapGetters } from "vuex";

export default {
    name: "YoutubeSearch",

    data() {
        return {
            menuToggled:false,
            title:'Alizee',
            oldTitle:''
        };
    },

    methods:{
        onMenuToggle() {
            this.menuToggled=!this.menuToggled;
        },

        onYoutubeSearch() {
            this.$store.dispatch("youtubeSearch",{title:this.title});
        },

    },

    computed: {
        ...mapGetters([
            "getYTVideos",
        ]),
    },

    template: require("./youtube-search-tmpl.pug").toString()
};
</script>
