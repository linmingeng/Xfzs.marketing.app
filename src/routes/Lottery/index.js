import NProgress from 'nprogress'
import { injectReducer } from '../../store/reducers'

export default (store) => ({
    path: 'lottery/index',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            const Container = require('./containers/LotteryContainer').default
            const reducer = require('./modules/lottery').default

            injectReducer(store, { key: 'lottery', reducer })

            cb(null, Container)

            NProgress.done()
        }, 'lottery')
    },
    onEnter: () => {
        NProgress.start()
    }
})
