import { api, fetchJson } from './fetch'

export default {
    login() {
        window.location.href = `${api.passport}/login?redirectURL=${encodeURIComponent(window.location.href)}`
    },

    logout() {
        window.location.href = `${api.passport}/logout?redirectURL=${encodeURIComponent(window.location.href)}`
    },

    fetchAntiForgery() {
        fetchJson(api.antiForgery, {}, 'get')
            .then(({ json }) => { localStorage.XSRFTOKEN = json })
    },

    getAntiForgeryToken() {
        return localStorage.XSRFTOKEN || ''
    }
}
