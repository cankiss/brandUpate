/*
 * @Author: wzc0x0@gmail.com
 * @Date: 2017-11-27 16:22:35
 * @Feature: Global api interface configuration by npm script `-- params`
 * @Example:When you command `npm run dev -- sit` will be found `api[sit]` config
 */
let api = {
    pro: {
        BASEURL: "https://www.001bank.com/llapi/v1/api/",
        IMAGEURL: "https://www.001bank.com/llapi/picCode?",
        CodeImg: "https://www.001bank.com/llapi/kaptcha?phone_num=",
        ACTIVITYURL: "https://www.001bank.com/backactivity/v1/api/",
        ACTIVIVITYURL: "https://www.001bank.com/backactivity/vi/api/",
        PlatformData: "https://www.001bank.com/backactivity/info/",
        lxyurlone: "https://newcash.001bank.com:18080/cash/v1/api/",
        lxyurltwo: "https://106.14.171.95:8081/thirdaccess/api/",
        WECHAT_CALLBACK_URL: "https://fly.001bank.com/#/wechat/callback",
        INVIT_URL: "https://fly.001bank.com/html/activity"
    },
    sit: {
        BASEURL: "https://sit.001bank.com/llapi/v1/api/",
        IMAGEURL: "https://sit.001bank.com/llapi/picCode?",
        CodeImg: "https://sit.001bank.com/llapi/kaptcha?phone_num=",
        ACTIVITYURL: "https://192.168.188.134:8086/activity/v1/api/",
        ACTIVIVITYURL: "https://192.168.188.134:8086/activity/vi/api/",
        PlatformData: "https://192.168.188.134:8086/activity/info/",
        lxyurlone: "https://210.22.155.235:18080/cash/v1/api/",
        lxyurltwo: "https://thirdaccess.sit.001bank.com:8081/thirdaccess/api/",
        WECHAT_CALLBACK_URL: "https://sit.001bank.com/h5/#/wechat/callback",
        INVIT_URL: "https://sit.001bank.com/h5/html/activity"
    },
    dev: {
        BASEURL: "http://192.168.10.228:9090/shanlin/v1/api",
        IMAGEURL: "http://sit.001bank.com/llapi/picCode?",
        CodeImg: "http://sit.001bank.com/llapi/kaptcha?phone_num=",
        ACTIVITYURL: "http://192.168.188.134:8086/activity/v1/api/",
        ACTIVIVITYURL: "http://192.168.188.134:8086/activity/vi/api/",
        PlatformData: "http://192.168.188.225:8080/activity/info/",
        lxyurlone: "http://210.22.155.235:18080/cash/v1/api/",
        lxyurltwo: "http://thirdaccess.sit.001bank.com:8081/thirdaccess/api/",
        WECHAT_CALLBACK_URL: "http://192.168.10.161:8080/#/wechat/callback",
        INVIT_URL: "http://192.168.10.161:8080/html/activity"
    },
    dev2: {
        BASEURL: "http://llapi.dev2.001bank.com/llapi/v1/api",
        IMAGEURL: "http://llapi.dev2.001bank.com/llapi/picCode?",
        CodeImg: "http://llapi.dev2.001bank.com/llapi/kaptcha?phone_num=",
        ACTIVITYURL: "http://192.168.188.134:8086/activity/v1/api/",
        ACTIVIVITYURL: "http://192.168.188.134:8086/activity/vi/api/",
        PlatformData: "http://192.168.188.134:8086/activity/info/",
        lxyurlone: "http://210.22.155.235:18080/cash/v1/api/",
        lxyurltwo: "http://thirdaccess.sit.001bank.com:8081/thirdaccess/api/",
        WECHAT_CALLBACK_URL: "http://192.168.10.161:8080/#/wechat/callback",
        INVIT_URL: "http://192.168.10.161:8080/html/activity"
    },
    sit2: {
        BASEURL: "http://sit2.001bank.com/llapi/v1/api",
        IMAGEURL: "http://sit2.001bank.com/llapi/picCode?",
        CodeImg: "http://sit2.001bank.com/llapi/kaptcha?phone_num=",
        ACTIVITYURL: "http://192.168.188.225:8080/activity/v1/api/",
        ACTIVIVITYURL: "http://192.168.188.134:8086/activity/vi/api/",
        PlatformData: "http://192.168.188.225:8080/activity/info/",
        lxyurlone: "http://210.22.155.235:18080/cash/v1/api/",
        lxyurltwo: "http://thirdaccess.sit.001bank.com:8081/thirdaccess/api/",
        WECHAT_CALLBACK_URL: "http://sit2.001bank.com/h5/#/wechat/callback",
        INVIT_URL: "http://sit2.001bank.com/h5/html/activity"
    }
};

//handle all value to be "''" , I forget `Object.values()`, oh my god!
Object.keys(api).forEach(item => {
    Object.keys(api[item]).forEach(apis => {
        api[item][apis] = JSON.stringify(api[item][apis]);
    })
})

//get params by process.argv
const isEnv = process.argv.filter(item => api[item] && item)

module.exports = isEnv.length > 0 ? api[isEnv[0]] : api['sit']