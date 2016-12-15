import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {
    ButtonArea,
    Button,
    CellsTitle,
    CellHeader,
    CellBody,
    CellFooter,
    Form,
    FormCell,
    Input,
    Label,
    Toast,
    Toptips
} from 'react-weui'
import auth from 'services/auth'

class RegisterForm extends React.Component {
    constructor(props) {
        super(props)

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.handleSendVcode = this.handleSendVcode.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    state = {
        nickname: '',
        phoneNumber: '',
        vcode: '',
        password: '',
        vcodeSecnod: 0,
        laoding: false
    }

    componentWillUnmount() {
        this.vcodeTimer && clearTimeout(this.vcodeTimer)
        this.warnTimer && clearTimeout(this.warnTimer)
    }

    render() {
        const nickNameField = this.setField('nickname')
        const phoneNumberField = this.setField('phoneNumber')
        const vcodeField = this.setField('vcode')
        const passwordField = this.setField('password')

        return (
            <div>
                <CellsTitle>小蜂找事用户注册</CellsTitle>
                <Form>
                    <FormCell>
                        <CellHeader>
                            <Label>昵称</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="请输入您的姓名或昵称" {...nickNameField} />
                        </CellBody>
                    </FormCell>
                    <FormCell vcode>
                        <CellHeader>
                            <Label>手机号</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="tel" placeholder="请输入您的手机号" {...phoneNumberField} />
                        </CellBody>
                        <CellFooter>
                            <Button type="vcode" onClick={this.handleSendVcode}>
                                {this.state.vcodeSecnod === 0 ? '发送验证码' : `${this.state.vcodeSecnod}秒`}
                            </Button>
                        </CellFooter>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label>密码</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="password" placeholder="请输入您的密码" {...passwordField} />
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label>验证码</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="tel" placeholder="请输入您收到的短信验证码" {...vcodeField} />
                        </CellBody>
                    </FormCell>
                </Form>
                <ButtonArea>
                    <Button className="weui-btn_xf" onClick={this.handleSubmit}>
                        立即注册
                    </Button>
                </ButtonArea>
                <Toptips type="default" show={this.state.showWarn}>{this.state.showWarnText}</Toptips>
                <Toast icon="loading" show={this.state.laoding}>加载中</Toast>
            </div>
        )
    }

    setField(key) {
        return {
            value: this.state[key],
            onChange: (e) => {
                this.setState({ [key]: e.target.value })
            }
        }
    }

    showWarn(text) {
        this.setState({ showWarn: true, showWarnText: text })

        this.warnTimer = setTimeout(() => {
            this.setState({ showWarn: false })
        }, 2000)
    }

    handleSubmit() {
        if (this.state.nickname !== '' &&
            this.state.phoneNumber !== '' &&
            this.state.vcode !== '' &&
            this.state.password !== '') {
            this.setState({ laoding: true })
            auth.register({
                phoneNumber: this.state.phoneNumber,
                sms: this.state.vcode,
                nickname: this.state.nickname,
                password: this.state.password
            }).then((json) => {
                if (json.success) {
                    auth.loggin(this.state.phoneNumber, this.state.password, (result) => {
                        if (result.authenticated) {
                            this.context.router.push('/')
                        } else {
                            this.setState({ laoding: false })
                            this.showWarn(result.message)
                        }
                    })
                } else {
                    this.setState({ laoding: false })
                    this.showWarn(json.error.message)
                }
            })
        } else {
            this.showWarn('您输入的注册信息不完整')
        }
    }

    handleSendVcode() {
        if (this.state.phoneNumber && this.state.vcodeSecnod === 0) {
            auth.sendVcode(this.state.phoneNumber)
                .then(json => {
                    if (json.success) {
                        this.setState({ vcodeSecnod: 60 })
                        this.vcodeTimer = setInterval(() => {
                            const scencod = this.state.vcodeSecnod
                            if (scencod === 0) {
                                clearTimeout(this.vcodeTimer)
                            } else {
                                this.setState({ vcodeSecnod: (scencod - 1) })
                            }
                        }, 1000)
                    } else {
                        this.showWarn(json.error.message)
                    }
                })
        }
    }
}

export default RegisterForm
