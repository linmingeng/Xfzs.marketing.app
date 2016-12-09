import React from 'react'
import Header from '../../components/Header'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import 'antd/dist/antd.css'
import 'nprogress/nprogress.css'
import './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = (props) => {
    const contentMinHeightCls = {
        minHeight: (document.body.offsetHeight || document.documentElement.clientHeight) - 104 + 'px'
    }

    return (
        <div className="ant-layout-aside">
            <aside className="ant-layout-sider">
                <div className="ant-layout-logo" />
                <Nav pathname={props.location.pathname} />
            </aside>
            <div className="ant-layout-main">
                <Header />
                <div className="ant-layout-container">
                    <div className="ant-layout-content" style={contentMinHeightCls}>
                        {props.children}
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

CoreLayout.propTypes = {
    children: React.PropTypes.element.isRequired,
    location: React.PropTypes.object.isRequired
}

export default CoreLayout
