import './style.css';

//Vue with template compiler
import Vue from "../../../node_modules/vue/dist/vue.esm";

//Bulma.io
import '../../../node_modules/bulma/css/bulma.min.css';

//Font-awesome
import "../../../node_modules/font-awesome/css/font-awesome.min.css";

//Vuex
import Vuex from "vuex";
Vue.use(Vuex);

//App
import App from "./App.vue";

//i18n
import VueI18n from "vue-i18n";
Vue.use(VueI18n);
import messages from "./langs";
const i18n = new VueI18n({
    locale: "en",
    messages
});

//Form validator
import VeeValidate from "vee-validate";
Vue.use(VeeValidate);

//Popup notifications
import VueNotifications from "vue-notifications";
import VueToasted from "vue-toasted";
function toast({ title, message, type, timeout, cb }) {
    if (type === VueNotifications.types.warn) type = "show";
    return Vue.toasted[type](message, { duration: 3000 });
}
Vue.use(VueToasted);
Vue.use(VueNotifications, {
    success: toast,
    error: toast,
    info: toast,
    warn: toast
});

//Create store
import { store } from "./vuex/store";

//VueRouter
import VueRouter from "vue-router";
Vue.use(VueRouter);
import router from "./router";

//Production
Vue.config.productionTip = false;

//Create app
new Vue({
    el: "#app",
    store,
    router,
    template: "<App/>",
    i18n,
    components: { App }
});
