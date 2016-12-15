import NProgress from 'nprogress'
// import { injectReducer } from '../../store/reducers'

export default (store) => ({
    path: 'topic/ranking',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            const Container = require('./containers/RankingContainer').default
            // const reducer = require('./modules/signup').default

            // injectReducer(store, { key: 'signup', reducer })

            cb(null, Container)

            NProgress.done()
        }, 'ranking')
    },
    onEnter: () => {
        NProgress.start()
    }
})
