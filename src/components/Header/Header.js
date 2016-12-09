import React from 'react'
import { Icon, Row, Col } from 'antd'
import './Header.scss'
import auth from '../../services/auth'

export const Header = (props, context) => {
    const loggOut = () => {
        auth.loggOut()
        context.router.push('/login')
    }

    return (
        <div className="ant-layout-header">
            <Row type="flex" justify="end">
                <Col span="3">
                    <span><Icon type="user" /> {auth.getCurrentUserName()}</span>
                </Col>
                <Col span="1">
                    <a href="javascript:;" onClick={loggOut}>注销</a>
                </Col>
            </Row>
        </div>
    )
}

Header.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default Header
