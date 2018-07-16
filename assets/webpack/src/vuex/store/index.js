import Vue from "../../../../../node_modules/vue/dist/vue.esm";
import Vuex from "vuex";
Vue.use(Vuex);
import actionsObj from "../actions";
import gettersObj from "../getters";
import mutationsObj from "../mutations";
import stateObj from "../state";

export const store = new Vuex.Store({
    state: stateObj,
    getters: gettersObj,
    mutations: mutationsObj,
    actions: actionsObj,
    strict:true
});
