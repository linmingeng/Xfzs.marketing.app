import React from 'react'
import { connect } from 'react-redux'
import { Toast } from 'react-weui'
import Footer from '../../components/Footer'
import './CoreLayout.scss'

export const CoreLayout = (props) => {
    const contentMinHeightCls = {
        minHeight: document.documentElement.clientHeight - 24 + 'px'
    }

    return (
        <div>
            <div style={contentMinHeightCls}>
                {props.children}
            </div>
            <Footer />
            <Toast icon="loading" show={props.loading}>加载中</Toast>
            <Toast icon="" iconSize="small" show={!!props.error} className="toast-error">{props.error}</Toast>
        </div >
    )
}

CoreLayout.propTypes = {
    children: React.PropTypes.element.isRequired,
    location: React.PropTypes.object.isRequired,
    loading: React.PropTypes.bool,
    error: React.PropTypes.string
}

const mapStateToProps = (state) => ({
    loading: state.home.loading || false,
    error: state.home.error || ''
})

export default connect(mapStateToProps, {})(CoreLayout)
