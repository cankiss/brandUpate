/*
ios-android-发现模块-指令对照

goLogin                   （登录）
goZhiTou                  （会员俱乐部-去升级）
goMemberPointsDetails     （会员俱乐部-看明细）
goInvitRecord             （邀请好友-查看我的邀请记录）
goWechatShare             （邀请好友-分享按钮）
goSecretary               （投标小讲堂-投标小秘书-立即设置）
goZT                      （投标小讲堂-亿宝智投-立即出借）
goYX                      （投标小讲堂-亿宝优选-立即出借）
goXSB                     （投标小讲堂-新手标升级啦-立即出借）
*/

//ios和android与h5交互桥
let appBridge = {

    //ios桥
    ios: {

        //ios，创建桥，仅提供给appBridge.ios.getData和appBridge.ios.sendData调用
        setupWebViewJavascriptBridge(callback) {
            if (window['WebViewJavascriptBridge']) {
                return callback(window['WebViewJavascriptBridge']);
            }
            if (window['WVJBCallbacks']) {
                return window['WVJBCallbacks'].push(callback);
            }
            window['WVJBCallbacks'] = [callback];
            let WVJBIframe = document.createElement('iframe');
            WVJBIframe.style.display = 'none';
            WVJBIframe.src = 'https://__bridge_loaded__';
            document.documentElement.appendChild(WVJBIframe);
            setTimeout(() => {
                document.documentElement.removeChild(WVJBIframe);
            }, 0);
        },

        //ios，从APP获取数据
        getData(callback) {
            appBridge.ios.setupWebViewJavascriptBridge(bridge => {
                bridge.registerHandler('getDataFromNative', (data, responseCallback) => {
                    callback(data);
                });
            });
        },

        //ios，向APP发送指令和数据
        sendData(data) {
            appBridge.ios.setupWebViewJavascriptBridge(bridge => {
                bridge.callHandler('sendTitleToNative', data, (response) => {});
            });
        }

    },

    //android桥
    android: {

        //android，从APP获取数据
        getData(callBack) {
            callBack(JSON.parse(window.js.getUserInfo()));
        },

        //android，向APP发送指令和数据的方法集合
        sendData: {

            goLogin(data) {
                data ? window.js.goLogin(data.redirect) : window.js.goLogin();
            },

            goZhiTou() {
                window.js.goZhiTou();
            },

            goMemberPointsDetails() {
                window.js.goMemberPointsDetails();
            },

            goInvitRecord() {
                window.js.goInvitRecord();
            },

            goWechatShare(data) {
                data ? window.js.goWechatShare(data.shareUrl) : window.js.goWechatShare();
            },

            goSecretary() {
                window.js.goSecretary();
            },

            goZT() {
                window.js.goZT();
            },

            goYX() {
                window.js.goYX();
            },

            goXSB() {
                window.js.goXSB();
            },

            goRegister() {
                window.js.toRegister();
            },

            goZTXSBDetail() {
                window.js.goZTXSBDetail();
            }

        }

    },

    /*
     * sendData
     * ios和android公用发送指令和数据的方法
     * appBridge.sendData(sbType, directiveName, [data])
     * sbType:必传(1:ios, 2:android)
     * directiveName:必传(指令名称)
     * data:非必传({keyName: keyValue})
     * */
    sendData(sbType, directiveName, data) {

        let param = {
            code: '200',
            msg: '',
            model: {
                directiveName: directiveName,
                data: ''
            }
        };

        if (sbType == '1') {
            data && (param.model.data = data);
            appBridge.ios.sendData(param);
            return
        }

        if (sbType == '2') {
            appBridge.android.sendData[directiveName](data ? data : '');
            return
        }

        console.log(`未知的sbType: ${sbType}`);
        return

    }

};

export default appBridge;