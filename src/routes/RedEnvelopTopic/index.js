import NProgress from 'nprogress'
import { injectReducer } from '../../store/reducers'

export default (store) => ({
    path: 'rd/topic/:id',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            const Container = require('./containers/RedEnvelopTopicContainer').default
            const reducer = require('./modules/redEnvelopTopic').default

            injectReducer(store, { key: 'redEnvelopTopic', reducer })

            cb(null, Container)

            NProgress.done()
        }, 'redEnvelopTopic')
    },
    onEnter: () => {
        NProgress.start()
    }
})
