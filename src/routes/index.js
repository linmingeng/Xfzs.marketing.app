// We only need to import the modules necessary for initial render
import NProgress from 'nprogress'
import { injectReducer } from '../store/reducers'
import auth from '../services/auth'
import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Home from './Home'
import TopicDescRoute from './TopicDesc'
import SignupRoute from './Signup'
import RankingRoute from './Ranking'
import VoterRoute from './Voter'
import CounterRoute from './Counter'
import LoginRoute from './Login'
import RegisterRoute from './Register'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ([
    {
        path: '/',
        name: '首页',
        getComponent: (nextState, cb) => {
            NProgress.start()

            const reducer = require('./Home/modules/home').default
            injectReducer(store, { key: 'home', reducer })

            cb(null, CoreLayout)

            NProgress.done()
        },
        indexRoute: Home(store),
        childRoutes: [
            CounterRoute(store),
            TopicDescRoute(store),
            SignupRoute(store),
            RankingRoute(store),
            VoterRoute(store)
        ],
        onEnter: (nextState, replace) => {
            // const nextPathname = nextState.location.pathname
            // if (!auth.loggedIn() && nextPathname !== '/login') {
            //     replace({
            //         pathname: '/login',
            //         state: { nextPathname }
            //     })
            // }
        }
    },
    LoginRoute(store),
    RegisterRoute(store)
])

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
