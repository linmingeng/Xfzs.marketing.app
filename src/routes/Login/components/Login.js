import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { message } from 'antd'
import Footer from 'components/Footer'
import LoginForm from './LoginForm'
import auth from 'services/auth'

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    state = {
        loading: false
    }

    render() {
        return (<div className="ant-layout-aside ant-login-layout-aside">
            <div className="ant-layout-main ant-login-layout-main">
                <div className="ant-layout-breadcrumb" />
                <div className="ant-layout-container" style={{ height: document.body.clientHeight - 20 }}>
                    <div className="ant-layout-content">
                        <h2>积分商城管理后台</h2>
                        <LoginForm onSubmit={this.handleSubmit} loading={this.state.loading} />
                    </div>
                </div>
                <Footer />
            </div>
        </div>)
    }

    handleSubmit(username, password) {
        this.setState({ loading: true })
        auth.loggin(username, password, (result) => {
            this.setState({ loading: false })

            if (result.authenticated) {
                this.context.router.push('/')
            } else {
                message.error(result.message)
            }
        })
    }
}

export default Login
