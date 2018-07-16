<script>
import Vue from "../../../../../node_modules/vue/dist/vue.esm";
import VueNotifications from 'vue-notifications';
import { mapGetters } from "vuex";
const store = require("store");

export default {
    name: "Settings",

    data() {
        return {
            lng: this.$i18n.locale,
        };
    },

    methods:{
        //i18n
        changeLang:function(lngCode) {
            this.lng = lngCode;
        },

        //On set language
        onSelectLanguage:function() {
            this.$i18n.locale = this.lng;
            store.set("curlang", this.lng);
        }
    },

    computed: {
        ...mapGetters([
            "getLangs",
            //"getSettings"
        ]),
    },

    template: require("./settings-tmpl.pug").toString()
};
</script>
