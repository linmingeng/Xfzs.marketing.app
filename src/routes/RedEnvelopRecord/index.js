import NProgress from 'nprogress'
import { injectReducer } from '../../store/reducers'

export default (store) => ({
    path: 'rd/record/:id',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            const Container = require('./containers/RedEnvelopRecordContainer').default
            const reducer = require('./modules/redEnvelopRecord').default

            injectReducer(store, { key: 'redEnvelopRecord', reducer })

            cb(null, Container)

            NProgress.done()
        }, 'redEnvelopRecord')
    },
    onEnter: () => {
        NProgress.start()
    }
})
