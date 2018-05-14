/*
 * @Author: wzc0x0@gmail.com
 * @Date: 2017-11-15 17:22:29
 * @Feature: using for fetch which user select in mine/investDetail
 * @已废弃！
 */

export default {
    state: { //init status
        zhitouStatus: 1,
        optiStatus: 2, // default 未起息
        sanBiaoStatus: 2
    },
    mutations: {
        SETZHITOU(state, payload) {
            state.zhitouStatus = payload.zhitouStatus
        },
        SETOPTI(state, payload) {
            state.optiStatus = payload.optiStatus
        },
        SETSANBIAO(state, payload) {
            state.sanBiaoStatus = payload.sanBiaoStatus
        }
    },
    actions: {
        zhitou({ commit }, context) {
            commit('SETZHITOU', context);
        },
        opti({ commit }, context) {
            commit('SETOPTI', context);
        },
        sanbiao({ commit }, context) {
            commit('SETSANBIAO', context);
        }
    }
}