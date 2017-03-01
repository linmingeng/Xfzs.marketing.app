import React from 'react'
import { Link } from 'react-router'
import { api } from 'services/fetch'
import './RedEnvelopTakeView.scss'
import Countdown from './Countdown'
import Share from 'components/Share'
import ResultModal from './ResultModal'
import { Toast } from 'react-weui'

class RedEnvelopTakeView extends React.PureComponent {
    static propTypes = {
        params: React.PropTypes.object.isRequired,
        redEnvelopList: React.PropTypes.array.isRequired,
        topic: React.PropTypes.object.isRequired,
        getCanTakeRedEnvelopList: React.PropTypes.func.isRequired,
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
        const { getCanTakeRedEnvelopList, getRedEnvelopTopic, params, topic } = this.props
        const topicId = params.id

        if (!topic.id) {
            getRedEnvelopTopic(topicId)
        }

        getCanTakeRedEnvelopList(topicId)

        this.handleShareCode(topicId)
    }

    render() {
        return (
            <div className="red-envelop-take-container">
                {this.renderMerchants()}
                <div className="take-warp">
                    <a href="javascript:void(0)" className="take-btn" onClick={this.handleTake} />
                    <p className="my-has-take-number">剩余次数:{this.props.topic.currentUserCanReceiveTimes}次</p>
                    <Link to={`/rd/record/${this.props.topic.id}`} className="take-records-btn">我的领取记录</Link>
                </div>
                <Countdown redEnvelopList={this.props.redEnvelopList} />
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
            </div>
        )
    }

    renderMerchants() {
        const redEnvelop = this.getCurrentCanTakeRedEnvelop()

        return (
            <div className="merchants-warp">
                <p className="name">{redEnvelop ? redEnvelop.senderName : '目前没有红包'}</p>
                <p className="number">红包总数:{redEnvelop ? redEnvelop.number : 0}个</p>
            </div>
        )
    }

    getCurrentCanTakeRedEnvelop() {
        const { redEnvelopList } = this.props
        const hasTakeRedEnvelop = redEnvelopList.length > 0
            ? (new Date(redEnvelopList[0].canTakeTime.replace('T', ' ').replace(/-/g, '/')).getTime() -
                new Date().getTime() < 0)
            : false

        return hasTakeRedEnvelop ? redEnvelopList[0] : null
    }

    handleHideShare() {
        this.setState({ showShare: false })
    }

    handleShowShare() {
        const { getShareCode, topic } = this.props

        if (this.state.shareContent.link.indexOf('?') > -1) {
            this.setState({ showShare: true })
        } else {
            getShareCode({ id: topic.id }).then(({ json }) => {
                const redEnvelop = this.getCurrentCanTakeRedEnvelop()
                if (redEnvelop) {
                    this.state.shareContent.desc = `${redEnvelop.senderName}邀请您领取红包【小蜂找事】`
                } else {
                    this.state.shareContent.desc = '小蜂找事邀请您领取红包'
                }

                this.state.shareContent.link = this.state.shareContent.link + '?c=' + json.result
                console.log(this.state.shareContent)
                this.setState({
                    showShare: true,
                    shareContent: { ...this.state.shareContent }
                })
            })
        }
    }

    handleTake() {
        let retries = 10
        const redEnvelop = this.getCurrentCanTakeRedEnvelop()
        const { getTakeResult, takeRedEnvelop } = this.props

        this.setState({ loading: true })

        const getTakeResultLoop = (backend) => {
            getTakeResult(redEnvelop.id, backend, ({ result }) => {
                if (result.status > 0) {
                    result.face = redEnvelop.senderFace
                    this.setState({ loading: false, showResult: true, result })
                } else if (retries > 0) {
                    getTakeResultLoop(backend)
                    retries--
                } else {
                    this.setState({
                        showResult: true,
                        loading: false,
                        status: 0,
                        face: redEnvelop.senderFace
                    })
                }
            })
        }

        if (redEnvelop) {
            takeRedEnvelop(redEnvelop.id, (json) => {
                getTakeResultLoop(json.backend)
            })
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
