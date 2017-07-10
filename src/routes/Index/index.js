import NProgress from 'nprogress'
import { injectReducer } from '../../store/reducers'

export default (store) => ({
    path: '/index',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            const Container = require('./containers/IndexContainer').default
            const reducer = require('./modules/index').default

            injectReducer(store, { key: 'index', reducer })
            cb(null, Container)
            NProgress.done()
        }, 'index')
    },
    onEnter: () => {
        NProgress.start()
    }
})
