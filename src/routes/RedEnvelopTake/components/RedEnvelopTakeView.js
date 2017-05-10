import React from 'react'
import { Link } from 'react-router'
import { api } from 'services/fetch'
import './RedEnvelopTakeView.scss'
import Countdown from './Countdown'
import Share from 'components/Share'
import Toptips from 'components/Toptips'
import ResultModal from './ResultModal'
import { Toast } from 'react-weui'

class RedEnvelopTakeView extends React.PureComponent {
    static propTypes = {
        params: React.PropTypes.object.isRequired,
        redEnvelop: React.PropTypes.object.isRequired,
        topic: React.PropTypes.object.isRequired,
        getRedEnvelop: React.PropTypes.func.isRequired,
        getRedEnvelopTopic: React.PropTypes.func.isRequired,
        takeRedEnvelop: React.PropTypes.func.isRequired,
        getTakeResult: React.PropTypes.func.isRequired,
        getShareCode: React.PropTypes.func.isRequired,
        trySaveShareRecords: React.PropTypes.func.isRequired,
        shareCode: React.PropTypes.string
    }

    state = {
        showShare: false,
        showResult: false,
        result: {},
        loading: false,
        error: '',
        shareContent: {
            title: '蜂抢红包',
            desc: '点击领取红包',
            link: window.location.href.replace('take', 'topic'),
            headerimage: `${api.imgHost}/e1/e135988a39a1f307a8eb0995bfc06847.png`
        }
    }

    constructor(props) {
        super(props)

        this.handleHideShare = this.handleHideShare.bind(this)
        this.handleShowShare = this.handleShowShare.bind(this)
        this.handleTake = this.handleTake.bind(this)
    }

    componentDidMount() {
        const { getRedEnvelop, getRedEnvelopTopic, params, topic } = this.props
        const { topicId, id } = params

        if (!topic.id) {
            getRedEnvelopTopic(topicId)
        }

        getRedEnvelop(id)

        this.handleShareCode(topicId)
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    }

    render() {
        return (
            <div className="red-envelop-take-container">
                {this.renderMerchants()}
                <div className="take-warp">
                    <a href="javascript:void(0)" className="take-btn" onClick={this.handleTake} />
                    <p className="my-has-take-number">剩余次数:{this.props.topic.currentUserCanReceiveTimes}次</p>
                    <Link to={`/rd/record/${this.props.params.topicId}`} className="take-records-btn">领取记录</Link>
                    <Link to={`/rd/topic/${this.props.params.topicId}`} className="take-records-btn">更多红包</Link>
                </div>
                <Countdown redEnvelop={this.props.redEnvelop} />
                <a className="share-btn" onClick={this.handleShowShare}>立即分享</a>
                <p className="share-text">分享赢更多抢红包次数</p>
                {
                    this.state.showResult && <ResultModal
                        show={this.state.showResult}
                        result={this.state.result}
                        onClose={() => this.setState({ showResult: false })} />
                }
                <Share
                    show={this.state.showShare}
                    content={this.state.shareContent}
                    onHide={this.handleHideShare} />
                <Toast icon="loading" show={this.state.loading}>加载中</Toast>
                <Toptips show={!!this.state.error} text={this.state.error} />
            </div>
        )
    }

    renderMerchants() {
        const { redEnvelop } = this.props

        return (
            <div className="merchants-warp">
                <p className="name">{redEnvelop.senderName}</p>
                <p className="number">红包总数:
                    {redEnvelop.number}个</p>
            </div>
        )
    }

    handleHideShare() {
        this.setState({ showShare: false })
    }

    handleShowShare() {
        const { getShareCode, topic, redEnvelop } = this.props

        if (this.state.shareContent.link.indexOf('?') > -1) {
            this.setState({ showShare: true })
        } else {
            getShareCode({ id: topic.id }).then(({ json }) => {
                if (redEnvelop) {
                    this.state.shareContent.desc = `${redEnvelop.senderName}邀请您领取红包【小蜂找事】`
                } else {
                    this.state.shareContent.desc = '小蜂找事邀请您领取红包'
                }

                this.state.shareContent.link = this.state.shareContent.link + '?c=' + json.result
                this.setState({
                    showShare: true,
                    shareContent: { ...this.state.shareContent }
                })
            })
        }
    }

    handleTake() {
        const { redEnvelop, getTakeResult, takeRedEnvelop, topic } = this.props

        if (topic.currentUserCanReceiveTimes <= 0) {
            this.setState({ error: '次数不足' })
            this.timer = setTimeout(() => {
                this.setState({ error: '' })
            }, 1000)

            return
        }

        if (new Date(redEnvelop.canTakeTime.replace('T', ' ').replace(/-/g, '/')) < new Date()) {
            this.setState({ error: '红包还未开启' })
            this.timer = setTimeout(() => {
                this.setState({ error: '' })
            }, 1000)

            return
        }

        let retries = 10
        const getTakeResultLoop = (backend) => {
            getTakeResult(redEnvelop.id, backend, ({ result }) => {
                if (result.status > 0) {
                    result.face = redEnvelop.senderFace
                    result.link = redEnvelop.senderLink
                    this.setState({ loading: false, showResult: true, result })
                } else if (retries > 0) {
                    getTakeResultLoop(backend)
                    retries--
                } else {
                    this.setState({
                        showResult: true,
                        loading: false,
                        status: 0,
                        face: redEnvelop.senderFace,
                        link: redEnvelop.senderLink
                    })
                }
            })
        }

        if (redEnvelop) {
            this.setState({ loading: true })
            takeRedEnvelop(redEnvelop.id, (json) => {
                getTakeResultLoop(json.backend)
            })
        } else {
            this.setState({ error: '敬请期待下一轮' })
            this.timer = setTimeout(() => {
                this.setState({ error: '' })
            }, 2000)
        }
    }

    handleShareCode(topicId) {
        setTimeout(() => {
            // 值从RedEnvelopTopicView来
            var code = sessionStorage['red-envelop-share-code']
            if (code) {
                const { trySaveShareRecords } = this.props
                trySaveShareRecords({ topicId, shareCode: code })
                    .then(({ json }) => {
                        json.result && sessionStorage.removeItem('red-envelop-share-code')
                    })
            }
        }, 2000)
    }
}

export default RedEnvelopTakeView
