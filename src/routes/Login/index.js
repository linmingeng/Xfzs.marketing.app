import NProgress from 'nprogress'
import { injectReducer } from '../../store/reducers'

export default (store) => ({
    path: 'login',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            const Container = require('./containers/LoginContainer').default
            const reducer = require('./modules/login').default

            injectReducer(store, { key: 'login', reducer })

            cb(null, Container)

            NProgress.done()
        }, 'login')
    },
    onEnter: () => {
        NProgress.start()
    }
})
