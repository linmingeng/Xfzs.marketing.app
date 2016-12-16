import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Toast } from 'react-weui'
import './Share.scss'
import wxSdk from 'services/wxSdk'

class Share extends React.Component {
    static propTypes = {
        show: React.PropTypes.bool,
        voter: React.PropTypes.object,
        onHide: React.PropTypes.func.isRequired
    }

    state = {
        showLoading: false,
        showShareBg: false
    }

    constructor(props) {
        super(props)

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.handleShare = this.handleShare.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        const { show, voter } = nextProps

        if (show) {
            this.handleShare(show, voter)
        } else {
            this.setState({ showShareBg: false })
        }
    }

    render() {
        return (
            <div>
                {this.state.showShareBg && <div className="weui-mask share-bg" onClick={this.props.onHide} />}
                <Toast icon="loading" show={this.state.showLoading}>加载中</Toast>
            </div>
        )
    }

    handleShare(show, voter) {
        this.setState({
            showLoading: show
        })

        wxSdk.share(
            '支持我得千元约会现金',
            voter ? voter.desc : '支持我得千元约会现金',
            voter
                ? `http://${window.location.host}/topic/voter/${voter.id}`
                : `http://${window.location.host}/`,
            voter.headerimage,
            () => {
                this.setState({
                    showShareBg: true,
                    showLoading: false
                })
            },
            (msg) => { },
            () => this.setState({ showShareBg: false })
        )
    }
}

export default Share
