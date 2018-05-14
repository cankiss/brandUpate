import {querystring} from 'vux';

let wechat = {

  //判断是否在微信中打开
  isWechatPlatform() {
    let ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      return true;
    } else {
      return false;
    }
  },

  //生成向微信发送授权请求的url
  getWechatAuthUrl(state) {
    //state值说明(autoLogin+{redirectURL}-路由守卫请求code，2-判断用户是否绑定微信时请求code，3-绑定微信账号时请求code，4-解绑微信账号时请求code)
    let strUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?';
    let params = {
      //appid: 'wx95c407259ab0d1ad', //线上公众号
      appid: 'wx131c5cd2fe78e3f7', //本地开发者测试号
      redirect_uri: WECHAT_CALLBACK_URL,
      response_type: 'code',
      scope: 'snsapi_base',
      state: state
    };
    return strUrl + querystring.stringify(params) + '#wechat_redirect';
  }

};

export default wechat
