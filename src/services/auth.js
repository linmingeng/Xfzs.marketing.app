import { api, fetchJson } from './fetch'

let currentUser = { name: '', code: '' }

export default {
    login() {
        window.location.href =
            `${api.passport}/login?redirectURL=${encodeURIComponent(window.location.href)}&_rc=${sessionStorage['_rc']}`
    },

    logout() {
        window.location.href = `${api.passport}/logout?redirectURL=${encodeURIComponent(window.location.href)}`
    },

    fetchAntiForgery() {
        fetchJson(api.antiForgery, {}, 'get')
            .then(({ json }) => { localStorage.XSRFTOKEN = json })
    },

    fetchUserInfo() {
        fetchJson(`${api.passportApi}/api/app/account/info`, {}, 'get')
            .then(({ json }) => { currentUser = json.result })
    },

    getUserInfo() {
        return currentUser
    },

    getAntiForgeryToken() {
        return localStorage.XSRFTOKEN || ''
    }
}
