import { CALL_API } from 'redux-api-middleware'
import { normalize } from 'normalizr'
import fetch from 'isomorphic-fetch'
import auth from './auth'

export const DEFAULT_FAILURE = 'FAILURE'
export const LOADING = 'LOADING'
export const CLEART_ERROR = 'CLEART_ERROR'

const baseUrl = 'http://api.dev.shop.hxzcgf.cn'

const imageUrl = 'http://img.hxzcgf.com'

const queueUrl = 'http://mk.queue.hxzcgf.cn'

export const api = {
    passport: 'http://passport.dev.hxzcgf.cn',

    passportApi: 'http://passport.api.dev.hxzcgf.cn',

    upload: imageUrl + '/api/upload/base64',

    antiForgery: baseUrl + '/api/antiForgery',

    wxSdk: baseUrl + '/api/wx/jssdk',

    topic: baseUrl + '/api/services/app/vote',

    log: baseUrl + '/api/app/log',

    imgHost: imageUrl,

    lottery: baseUrl + '/api/services/app/lottery',

    order: baseUrl + '/api/services/app/order',

    delivery: baseUrl + '/api/services/app/delivery',

    redEnvelop: baseUrl + '/api/services/app/redEnvelop',

    redEnvelopQueue: queueUrl + '/api/queue',
    
    companyService: baseUrl + '/api/services/app/companyService'

}

function isNotConent(response) {
    if (response !== null && response.status === 401) {
        auth.login()
        return
    }

    return (response === null || response.status === 204)
        ? Promise.resolve({ json: {}, response: { ok: true } })
        : response.json().then(json => ({ json, response }))
}

function defaultOptions() {
    return {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': auth.getAntiForgeryToken()
        },
        credentials: 'include'
    }
}

export function fetchJson(url, data, method) {
    var request = {
        method: method || 'post',
        headers: defaultOptions().headers,
        credentials: 'include'
    }

    if (request.method === 'post' || request.method === 'put') {
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

export const injectApi = (options) => {
    const { schema, onSuccess, body } = options
    delete options.schema
    delete options.onSuccess

    if (options.method === 'post' || options.method === 'put') {
        options.body = JSON.stringify(options.body)
    }

    if ((options.method === 'get' || options.method === 'delete') && options.body) {
        var esc = encodeURIComponent
        var query = Object.keys(options.body)
            .map(k => esc(k) + '=' + esc(options.body[k]))
            .join('&')

        options.endpoint += `?${query}`

        delete options.body
    }

    return {
        [CALL_API]: Object.assign({}, defaultOptions(), options, {
            types: [
                options.types[0],
                {
                    type: options.types[1],
                    payload: (action, state, res) => {
                        const contentType = res.headers.get('Content-Type')
                        if (contentType && contentType.indexOf('json')) {
                            return res.json().then((json) => {
                                if (typeof onSuccess === 'function') {
                                    onSuccess(json)
                                }

                                var convertResult = {}
                                if (schema) {
                                    convertResult = json.result.items
                                        ? listConvert(json, schema, body)
                                        : entityConvert(json, schema)
                                } else {
                                    convertResult.json = json
                                }

                                convertResult.body = body

                                return convertResult
                            })
                        }
                    }
                },
                options.types[2]
            ]
        })
    }
}

function listConvert(json, schema, body) {
    if (body) {
        const total = json.result.total

        const entitys = normalize(json.result.items, schema)
        entitys.pagination = {
            ids: entitys.result,
            total: total % body.pageSize === 0 ? total / body.pageSize : parseInt(total / body.pageSize) + 1,
            current: body.current,
            pageSize: body.pageSize
        }

        delete entitys.result

        return entitys
    } else {
        return normalize(json.result.items, schema)
    }
}

function entityConvert(json, schema) {
    return schema ? normalize(json.result, schema) : json
}
