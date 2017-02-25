import { api, fetchJson } from './fetch'

window.onerror = function (errorMessage, scriptURI, lineNumber, columnNumber, error) {
    fetchJson(
        api.log,
        {
            message: errorMessage,
            script: scriptURI,
            line: lineNumber,
            column: columnNumber
        },
        'post')
}

// 微信js sdk签名不支持pushstate需要记录下首次进入的地址
sessionStorage['first-url'] = window.location.href
