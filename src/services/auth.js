import { api, fetchJson } from './fetch'

export default {
    loggin(userName, pass, cb) {
        fetchJson(api.login, { usernameOrEmailAddress: userName, password: pass })
            .then(({ json }) => {
                if (json.success) {
                    sessionStorage.token = `Bearer ${json.result.token}`
                    sessionStorage.name = json.result.user.name

                    cb({
                        authenticated: true
                    })

                    fetchJson(api.antiForgery, {}, 'get')
                        .then(({ json }) => { sessionStorage.XSRFTOKEN = json })
                } else {
                    cb({
                        authenticated: false,
                        message: `${json.error.message}:${json.error.details}`
                    })
                }
            })
    },

    loggedIn() {
        return sessionStorage.token !== '' && sessionStorage.token !== undefined
    },

    loggOut() {
        sessionStorage.token = ''
        sessionStorage.name = ''
    },

    getCurrentUserName() {
        return sessionStorage.name
    },

    getCurrentUserToken() {
        return sessionStorage.token
    },

    getAntiForgeryToken() {
        return sessionStorage.XSRFTOKEN || ''
    }
}
