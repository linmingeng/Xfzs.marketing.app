import NProgress from 'nprogress'
import { injectReducer } from '../../store/reducers'

export default (store) => ({
    path: 'register',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            const Container = require('./containers/RegisterContainer').default
            const reducer = require('./modules/register').default

            injectReducer(store, { key: 'register', reducer })

            cb(null, Container)

            NProgress.done()
        }, 'register')
    },
    onEnter: () => {
        NProgress.start()
    }
})
