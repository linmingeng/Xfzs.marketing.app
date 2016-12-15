import NProgress from 'nprogress'
import { injectReducer } from '../../store/reducers'

export default (store) => ({
    path: 'topic/voter/:id',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            const Container = require('./containers/VoterContainer').default
            const reducer = require('./modules/voter').default

            injectReducer(store, { key: 'voter', reducer })

            cb(null, Container)

            NProgress.done()
        }, 'voter')
    },
    onEnter: () => {
        NProgress.start()
    }
})
