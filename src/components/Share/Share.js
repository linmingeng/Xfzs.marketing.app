import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {
    Toast,
    Popup,
    PopupHeader,
    Flex,
    FlexItem,
    Dialog,
    Input
} from 'react-weui'
import './Share.scss'
import wxSdk from 'services/wxSdk'
import wxIcon from './assets/wx.png'
import qqIcon from './assets/qq.png'
import qqsIcon from './assets/qqs.png'
import weboIcon from './assets/webo.png'
import linkIcon from './assets/link.png'

class Share extends React.Component {
    static propTypes = {
        show: React.PropTypes.bool,
        content: React.PropTypes.object,
        onHide: React.PropTypes.func.isRequired
    }

    state = {
        showLoading: false,
        showShareBg: false,
        showCat: false,
        isWx: /micromessenger/.test(navigator.userAgent.toLowerCase())
    }

    constructor(props) {
        super(props)

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.handleShare = this.handleShare.bind(this)
        this.renderWxShare = this.renderWxShare.bind(this)
        this.renderWebShare = this.renderWebShare.bind(this)
        this.handleSwitchCatDialog = this.handleSwitchCatDialog.bind(this)
    }

    componentDidMount() {
        const { show, content } = this.props

        if (show) {
            this.state.isWx ? this.handleShare(show, content) : this.setState({ showShareBg: true })
        }
    }

    componentWillReceiveProps(nextProps) {
        const { show, content } = nextProps

        if (show) {
            this.state.isWx ? this.handleShare(show, content) : this.setState({ showShareBg: true })
        } else {
            this.setState({ showShareBg: false })
        }
    }

    render() {
        const { content } = this.props
        const children = this.state.isWx ? this.renderWxShare() : this.renderWebShare(content.title)

        return (
            <div>
                <Dialog
                    title="复制链接"
                    show={this.state.showCat}
                    buttons={[{ type: 'default', label: '确定', onClick: this.handleSwitchCatDialog }]}>
                    <Input defaultValue={content.link} className="cat-input" />
                </Dialog>
                {children}
            </div>
        )
    }

    renderWxShare() {
        return (
            <div>
                {this.state.showShareBg && <div className="weui-mask share-bg" onClick={this.props.onHide} />}
                <Toast icon="loading" show={this.state.showLoading}>加载中</Toast>
            </div>
        )
    }

    renderWebShare(title) {
        const joinLink = (webid) =>
            `http://www.jiathis.com/send/?webid=${webid}&url=${window.location.href}&title=${title}`

        return (
            <Popup
                show={this.state.showShareBg}
                onRequestClose={this.props.onHide}>
                <PopupHeader
                    right="确定"
                    rightOnClick={this.props.onHide}
                    />
                <div className="share-web">
                    <Flex>
                        <FlexItem>
                            <div>
                                <a href={joinLink('tsina')}>
                                    <img src={weboIcon} />
                                    <p>新浪微博</p>
                                </a>
                            </div>
                        </FlexItem>
                        <FlexItem>
                            <div>
                                <a href={joinLink('qzone')}>
                                    <img src={qqsIcon} />
                                    <p>QQ空间</p>
                                </a>
                            </div>
                        </FlexItem>
                        <FlexItem>
                            <div>
                                <a href={joinLink('weixin')}>
                                    <img src={wxIcon} />
                                    <p>微信朋友圈</p>
                                </a>
                            </div>
                        </FlexItem>
                        <FlexItem>
                            <div>
                                <a href={joinLink('cqq')}>
                                    <img src={qqIcon} />
                                    <p>QQ</p>
                                </a>
                            </div>
                        </FlexItem>
                        <FlexItem onClick={this.handleSwitchCatDialog}>
                            <div>
                                <img src={linkIcon} />
                                <p>复制链接</p>
                            </div>
                        </FlexItem>
                    </Flex>
                </div>
            </Popup >
        )
    }

    handleShare(show, content) {
        this.setState({
            showLoading: show
        })

        wxSdk.share(
            content.title,
            content.desc,
            content.link,
            content.headerimage,
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

    handleSwitchCatDialog() {
        this.setState({ showCat: !this.state.showCat })
    }
}

export default Share
