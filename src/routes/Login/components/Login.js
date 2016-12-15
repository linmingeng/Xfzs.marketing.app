import React from 'react'
import { Link } from 'react-router'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Footer from 'components/Footer'
import { ButtonArea, Toast } from 'react-weui'
import LoginForm from './LoginForm'
import auth from 'services/auth'
import './Login.scss'
import loginFoucsImage from './assets/login-focus.png'

class Login extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    static propTypes = {
        location: React.PropTypes.object
    }

    state = {
        loading: false,
        password: '',
        phoneNumber: ''
    }

    constructor(props) {
        super(props)

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangePhoneNumber = this.handleChangePhoneNumber.bind(this)
        this.handleChangePassowrd = this.handleChangePassowrd.bind(this)
    }

    render() {
        return (
            <div>
                <img src={loginFoucsImage} className="logo-focus" />
                <LoginForm
                    onSubmit={this.handleSubmit}
                    onChangePassowrd={this.handleChangePassowrd}
                    onChangePhoneNumber={this.handleChangePhoneNumber}
                    loading={this.state.loading}
                    phoneNumber={this.state.phoneNumber}
                    password={this.state.password} />
                <ButtonArea>
                    <Link to="/register" className="register-link">没有账号? 立即注册</Link>
                </ButtonArea>
                <Toast icon="loading" show={this.state.loading}>加载中</Toast>
                <Footer />
            </div>
        )
    }

    handleSubmit() {
        const { location } = this.props
        const { phoneNumber, password } = this.state

        if (phoneNumber === '' || password === '') {
            return
        }

        this.setState({ loading: true })
        auth.loggin(phoneNumber, password, (result) => {
            this.setState({ loading: false })

            if (result.authenticated) {
                this.context.router.push(
                    location
                        ? (location.state ? location.state.nextPathname : '/') : '/')
            } else {
                alert('错误' + result.message)
            }
        })
    }

    handleChangePhoneNumber(e) {
        this.setState({ phoneNumber: e.target.value })
    }

    handleChangePassowrd(e) {
        this.setState({ password: e.target.value })
    }
}

export default Login
