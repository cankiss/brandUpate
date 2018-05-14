import Vue from "vue";
import Vuex from "vuex";
import fly, { _post, _userId } from "@/config/ajax";

import coupon from "./modules/coupon";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        coupon: coupon
    }
});


store.registerModule("vuxLoading", {
    state: {
        isLoading: false
    },
    mutations: {
        updateLoadingStatus(state, payload) {
            state.isLoading = payload.isLoading;
        }
    }
});

store.registerModule("routerState", {
    state: {
        position: 0 //0表示默认 1表示当前位于团标的散标详情
    },
    getters: {
        getPos: state => state.position
    },
    mutations: {
        updatePosStatus(state, _pos) {
            state.position = _pos
        }
    }
});

export default store;