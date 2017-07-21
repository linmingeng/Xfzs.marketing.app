import NProgress from 'nprogress'
import { injectReducer } from '../../store/reducers'

export default (store) => ({
    path: 'train/consult/:id',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            const Container = require('./containers/TrainConsultContainer').default
            const reducer = require('./modules/trainconsult').default
            injectReducer(store, { key: 'trainconsult', reducer })
            // injectReducer(store, { key: 'train', reducer: require('../Train/modules/train').default })
            const takeReducer = require('../Train/modules/train').default
            injectReducer(store, { key: 'train', reducer: takeReducer })

            cb(null, Container)

            NProgress.done()
        }, 'trainconsult')
    },
    onEnter: () => {
        NProgress.start()
    }
})
