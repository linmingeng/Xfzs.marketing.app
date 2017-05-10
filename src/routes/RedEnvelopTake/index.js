import NProgress from 'nprogress'
import { injectReducer } from '../../store/reducers'

export default (store) => ({
    path: 'rd/take/:topicId/:id',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            const Container = require('./containers/RedEnvelopTakeContainer').default
            const reducer = require('./modules/redEnvelopTake').default
            injectReducer(store, { key: 'redEnvelopTake', reducer })

            const topicReducer = require('../RedEnvelopTopic/modules/redEnvelopTopic').default
            injectReducer(store, { key: 'redEnvelopTopic', reducer: topicReducer })

            cb(null, Container)

            NProgress.done()
        }, 'redEnvelopTake')
    },
    onEnter: () => {
        NProgress.start()
    }
})
