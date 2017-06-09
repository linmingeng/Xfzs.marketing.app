import NProgress from 'nprogress'

export default (store) => ({
    path: '/index',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            const Container = require('./containers/IndexContainer').default
            cb(null, Container)

            NProgress.done()
        }, 'index')
    },
    onEnter: () => {
        NProgress.start()
    }
})
