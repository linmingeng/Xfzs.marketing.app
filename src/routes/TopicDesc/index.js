import NProgress from 'nprogress'
import { injectReducer } from '../../store/reducers'

export default (store) => ({
    path: 'topic/desc',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            const Container = require('./containers/TopicDescContainer').default
            const reducer = require('../Home/modules/home').default

            injectReducer(store, { key: 'home', reducer })

            cb(null, Container)

            NProgress.done()
        }, 'topicDesc')
    },
    onEnter: () => {
        NProgress.start()
    }
})
