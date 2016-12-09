import fetch from 'isomorphic-fetch'
import auth from './auth'

// const baseUrl = 'http://localhost:62114'
const baseUrl = 'http://api.dev.shop.hxzcgf.cn'
// const baseUrl = 'http://api.shop.hxzcgf.cn'

export const api = {
    goods: baseUrl + '/api/services/boss/goods',

    category: baseUrl + '/api/services/boss/category',

    ad: baseUrl + '/api/services/boss/ad',

    order: baseUrl + '/api/services/boss/order',

    delivery: baseUrl + '/api/services/boss/delivery',

    distributor: baseUrl + '/api/services/boss/distributor',

    fans: baseUrl + '/api/services/boss/distributor',

    coupon: baseUrl + '/api/services/boss/coupon',

    article: baseUrl + '/api/services/boss/article',

    tenant: baseUrl + '/api/services/boss/session',

    login: baseUrl + '/api/boss/account',

    uploadFile: baseUrl + '/api/file',

    antiForgery: baseUrl + '/api/antiForgery',

    vendor: baseUrl + '/api/services/boss/vendor'
}

function isNotConent(response) {
    return (response == null || response.status === 204)
        ? Promise.resolve({ json: {}, response: { ok: true } })
        : response.json().then(json => ({ json, response }))
}

export function fetchJson(url, data, method) {
    var request = {
        method: method || 'post',
        headers: {
            'Authorization': auth.getCurrentUserToken(),
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': auth.getAntiForgeryToken()
        },
        credentials: 'include'
    }

    if (request.method === 'post') {
        request.body = JSON.stringify(data)
    }

    if ((request.method === 'get' || request.method === 'delete') && data) {
        var esc = encodeURIComponent
        var query = Object.keys(data)
            .map(k => esc(k) + '=' + esc(data[k]))
            .join('&')

        url += `?${query}`
    }

    return fetch(url, request).then(response => isNotConent(response))
}
