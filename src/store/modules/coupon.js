/*
 * @Author: hesy
 * @Date: 2017-11-18 16:22:30
 * @Feature: 公共的红包
 */
import fly, { _post, _userId } from "@/config/ajax";

export default {
    state: {
        couponList: [],
        checkedCoupon: {

        }
    },
    getters: {
        getcouponList: state => state.couponList,
        getCheckedCoupon: state => {
            if (state.checkedCoupon.couponId) {
                return state.checkedCoupon
            } else {
                return JSON.parse(sessionStorage.getItem("checkedCoupon"));
            }
        }
    },
    mutations: {
        changeCouponList(state, payload) {
            state.couponList = payload.couponList
        },
        changeCoupon(state, payload) {
            state.checkedCoupon = payload
            sessionStorage.setItem("checkedCoupon", JSON.stringify(payload))
        }
    },
    actions: {
        changeCouponList({ commit }, couponParams) {
            return _post('coupon/selectCoupon', couponParams)
        },
        checkCouponListZT({ commit }, couponParams) {
            return _userId('coupon/chooseCouponZT', couponParams)
        },
        checkCouponList({ commit }, couponParams) {
            return _userId('coupon/chooseCoupon', couponParams)
        }
    }
}