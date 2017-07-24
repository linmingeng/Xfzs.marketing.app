import NProgress from 'nprogress'
import { injectReducer } from '../../store/reducers'

export default (store) => ({
    path: '/personageIndex',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            const Container = require('./containers/personageIndexContainer').default
            const reducer = require('./modules/personageIndex').default

            injectReducer(store, { key: 'personageIndex', reducer })
            cb(null, Container)
            NProgress.done()
        }, 'personageIndex')
    },
    onEnter: () => {
        NProgress.start()
    }
})
