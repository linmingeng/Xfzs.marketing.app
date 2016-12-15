import React from 'react'
import {
    ButtonArea,
    Button,
    CellHeader,
    CellBody,
    Form,
    FormCell,
    Input,
    Label
} from 'react-weui'

export const LoginForm = ({ onSubmit, onChangePhoneNumber, onChangePassowrd, loading, phoneNumber, password }) => {
    return (
        <div>
            <Form>
                <FormCell>
                    <CellHeader>
                        <Label>手机号</Label>
                    </CellHeader>
                    <CellBody>
                        <Input type="tel" placeholder="请输入您的手机号" value={phoneNumber} onChange={onChangePhoneNumber} />
                    </CellBody>
                </FormCell>
                <FormCell>
                    <CellHeader>
                        <Label>密码</Label>
                    </CellHeader>
                    <CellBody>
                        <Input type="password" placeholder="请输入您的密码" required="required"
                            value={password} onChange={onChangePassowrd} />
                    </CellBody>
                </FormCell>
            </Form>
            <ButtonArea>
                <Button onClick={onSubmit} className="weui-btn_xf">
                    {loading ? '登录中...' : '登录'}
                </Button>
            </ButtonArea>
        </div>
    )
}

LoginForm.propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    onChangePassowrd: React.PropTypes.func.isRequired,
    onChangePhoneNumber: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool.isRequired,
    phoneNumber: React.PropTypes.string,
    password: React.PropTypes.string
}

export default LoginForm
