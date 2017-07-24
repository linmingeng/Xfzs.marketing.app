import NProgress from 'nprogress'
import { injectReducer } from '../../store/reducers'

export default (store) => ({
    path: 'train/index',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            const Container = require('./containers/TrainContainer').default
            const reducer = require('./modules/train').default

            injectReducer(store, { key: 'train', reducer })
            cb(null, Container)
            NProgress.done()
        }, 'train')
    },
    onEnter: () => {
        NProgress.start()
    }
})
