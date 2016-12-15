import { api, fetchJson } from './fetch'

export default {
    loggin(userName, pass, cb) {
        fetchJson(api.login, { usernameOrEmailAddress: userName, password: pass })
            .then(({ json }) => {
                if (json.success) {
                    localStorage.token = `Bearer ${json.result.token}`
                    localStorage.name = json.result.user.name

                    cb({
                        authenticated: true
                    })

                    this.fetchAntiForgery()
                } else {
                    cb({
                        authenticated: false,
                        message: `${json.error.message}:${json.error.details}`
                    })
                }
            })
    },

    register(userInfo) {
        return fetchJson(api.register, userInfo).then(({ json }) => json)
    },

    sendVcode(phoneNumber) {
        return fetchJson(api.sms, { phoneNumber }).then(({ json }) => json)
    },

    loggedIn() {
        return localStorage.token !== '' && localStorage.token !== undefined
    },

    loggOut() {
        localStorage.token = ''
        localStorage.name = ''
        localStorage.XSRFTOKEN = ''
    },

    fetchAntiForgery() {
        fetchJson(api.antiForgery, {}, 'get')
            .then(({ json }) => { localStorage.XSRFTOKEN = json })
    },

    getCurrentUserName() {
        return localStorage.name
    },

    getCurrentUserToken() {
        return localStorage.token
    },

    getAntiForgeryToken() {
        return localStorage.XSRFTOKEN || ''
    }
}
