import NProgress from 'nprogress'
import auth from '../../services/auth'
import { injectReducer } from '../../store/reducers'

export default (store) => ({
    path: 'topic/signup',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            const Container = require('./containers/SignupContainer').default
            const reducer = require('./modules/signup').default

            injectReducer(store, { key: 'signup', reducer })

            cb(null, Container)

            NProgress.done()
        }, 'signup')
    },
    onEnter: (nextState, replace) => {
        NProgress.start()
        const nextPathname = nextState.location.pathname
        if (!auth.loggedIn() && nextPathname !== '/login') {
            replace({
                pathname: '/login',
                state: { nextPathname }
            })
        }
    }
})
