import React, { Component, PropTypes } from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'

import wxSdk from 'services/wxSdk'

class AppContainer extends Component {
    static propTypes = {
        routes: PropTypes.array.isRequired,
        store: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props)

        if (/micromessenger/.test(navigator.userAgent.toLowerCase())) {
            wxSdk.hideAllNonBaseMenuItem()
        }
    }

    shouldComponentUpdate() {
        return false
    }

    render() {
        const { routes, store } = this.props
        return (
            <Provider store={store}>
                <div style={{ height: '100%' }}>
                    <Router history={browserHistory} children={routes} />
                </div>
            </Provider>
        )
    }
}

export default AppContainer
