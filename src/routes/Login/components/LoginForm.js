import React from 'react'
import { Form, Input, Button } from 'antd'

export const LoginForm = (props) => {
    const { form, loading, onSubmit } = props
    const { getFieldDecorator } = form

    const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 }
    }

    const formButtonLayout = {
        wrapperCol: { span: 18, offset: 4 }
    }

    const usernameProps = getFieldDecorator('username', {
        valuePropName: '',
        rules: [{ required: true, message: '请填写用户名' }]
    })

    const passwordProps = getFieldDecorator('passwd', {
        valuePropName: '',
        rules: [{ required: true, message: '请填写密码' }]
    })

    const required = () => {
        form.validateFields((errors) => {
            if (errors) {
                return
            }

            onSubmit(
                form.getFieldValue('username'),
                form.getFieldValue('passwd')
            )
        })
    }

    return (
        <Form horizontal>
            <Form.Item
                {...formItemLayout}
                hasFeedback
                label="用户名：">
                {usernameProps(
                    <Input type="text" autoComplete="off" />
                )}
            </Form.Item>
            <Form.Item
                {...formItemLayout}
                hasFeedback
                label="密码：">
                {passwordProps(
                    <Input type="password" autoComplete="off" />
                )}
            </Form.Item>
            <Form.Item
                {...formButtonLayout}>
                <Button type="primary" loading={loading} onClick={required}>
                    登录
                </Button>
            </Form.Item>
        </Form>
    )
}

LoginForm.propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool.isRequired,
    form: React.PropTypes.object.isRequired
}

export default Form.create()(LoginForm)
