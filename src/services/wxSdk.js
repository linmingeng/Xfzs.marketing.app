import { api, fetchJson } from './fetch'

export const wxSdk = {
    fetchCfg(currentUrl) {
        return fetchJson(api.wxSdk, { url: currentUrl }, 'get')
    },

    share(title, desc, link, icon, success, error, close) {
        if (!wxSdk.currentUrl) {
            wxSdk.currentUrl = window.location.href
        }

        this.fetchCfg(wxSdk.currentUrl).then(({ json }) => {
            if (json.success) {
                const cfg = json.result
                const wx = window.wx

                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: cfg.appId, // 必填，公众号的唯一标识
                    timestamp: cfg.timestamp, // 必填，生成签名的时间戳
                    nonceStr: cfg.nonceStr, // 必填，生成签名的随机串
                    signature: cfg.signature, // 必填，签名，见附录1
                    jsApiList: [
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                        'onMenuShareQZone'
                    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                })

                wx.error(function (res) {
                    if (res.errMsg === 'config:invalid signature') {
                        // 值从services/log.js来
                        wxSdk.currentUrl = sessionStorage['first-url']
                        wxSdk.share(title, desc, link.icon, success, error, close)
                    }
                })

                wx.ready(function () {
                    const shareCfg = {
                        title, // 分享标题
                        desc, // 分享描述
                        link: link, // 分享链接
                        imgUrl: icon, // 分享图标
                        type: 'link', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: close,
                        cancel: close
                    }

                    wx.onMenuShareTimeline(shareCfg)
                    wx.onMenuShareAppMessage(shareCfg)
                    wx.onMenuShareQQ(shareCfg)
                    wx.onMenuShareWeibo(shareCfg)
                    wx.onMenuShareQZone(shareCfg)

                    success()
                })
            } else {
                error(json.error.message)
            }
        })
    }
}

export default wxSdk
