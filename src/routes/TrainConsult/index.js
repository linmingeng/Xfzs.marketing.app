import NProgress from 'nprogress'
import { injectReducer } from '../../store/reducers'

export default (store) => ({
    path: 'train/consult',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            const Container = require('./containers/TrainConsultContainer').default
            const reducer = require('./modules/trainconsult').default

            injectReducer(store, { key: 'trainconsult', reducer })

            cb(null, Container)

            NProgress.done()
        }, 'trainconsult')
    },
    onEnter: () => {
        NProgress.start()
    }
})