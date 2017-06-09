import React from 'react'
import { Dialog } from 'react-weui'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Nav from 'components/Nav'
import TrafficCount from 'components/TrafficCount'
import MiniSearch from 'components/MiniSearch'
import './TopicContainer.scss'
import { api } from 'services/fetch'
import index from './assets/index.png'
import topicDate from './assets/topic-date.png'
import topicDesc from './assets/topic-desc.png'
import ranking from './assets/ranking.png'
import search from './assets/search.png'
import singup from './assets/signup.png'
import usercenter from './assets/usercenter.png'
import share from './assets/share.png'
import auth from 'services/auth'

class TopicContainer extends React.Component {
    static propTypes = {
        topic: React.PropTypes.object.isRequired,
        getTopic: React.PropTypes.func.isRequired,
        children: React.PropTypes.any
    }

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    state = {
        showTopicDate: false,
        showSearch: false
    }

    constructor(props) {
        super(props)

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.ShowTopicDate = this.ShowTopicDate.bind(this)
        this.hideShowTopicDate = this.hideShowTopicDate.bind(this)
        this.handleShowSearch = this.handleShowSearch.bind(this)
        this.handleCancelSearch = this.handleCancelSearch.bind(this)
        this.handleSubmitSearch = this.handleSubmitSearch.bind(this)
        this.handleChangeSearch = this.handleChangeSearch.bind(this)
    }

    componentDidMount() {
        if (!this.props.topic.desc) {
            this.props.getTopic(this.props.topic.id)
        }
    }

    render() {
        const { topic, children } = this.props

        const navs = [
            { icon: <img src={index} />, label: '投票首页', onClick: () => this.context.router.push('/') },
            { icon: <img src={topicDate} />, label: '活动日期', onClick: this.ShowTopicDate },
            { icon: <img src={topicDesc} />, label: '活动介绍', onClick: () => this.context.router.push('/topic/desc') },
            { icon: <img src={ranking} />, label: '实时排名', onClick: () => this.context.router.push('/topic/ranking') },
            { icon: <img src={singup} />, label: '我要报名', onClick: () => this.context.router.push('/topic/signup') },
            { icon: <img src={search} />, label: '投票搜索', onClick: this.handleShowSearch },
            { icon: <img src={share} />, label: '分享拉票', onClick: () => this.context.router.push('/topic/signup') },
            {
                icon: <img src={usercenter} />,
                label: '注销登录',
                onClick: auth.logout
            }
        ]

        return (
            <div className="container">
                {
                    topic.focus && <img src={`${api.imgHost}/414_100_w/${topic.focus}`} className="banner" />
                }
                <div className="region">
                    <TrafficCount
                        {...topic} />
                    <Nav navs={navs} />
                    <Dialog
                        title="活动日期"
                        buttons={[{ label: '确定', onClick: this.hideShowTopicDate }]}
                        show={this.state.showTopicDate}>
                        <p>{topic.voteTime.startTime.replace('T', ' ')}</p>
                        <p>至</p>
                        <p>{topic.voteTime.endTime.replace('T', ' ')}</p>
                    </Dialog>
                </div>
                <MiniSearch
                    show={this.state.showSearch}
                    onSubmit={this.handleSubmitSearch}
                    onCancel={this.handleCancelSearch}
                    onChange={this.handleChangeSearch}
                />
                {children}
            </div>
        )
    }

    ShowTopicDate() {
        this.setState({ showTopicDate: true })
    }

    hideShowTopicDate() {
        this.setState({ showTopicDate: false })
    }

    handleShowSearch() {
        this.setState({ showSearch: true })
    }

    handleCancelSearch() {
        this.setState({ showSearch: false })
    }

    handleSubmitSearch() {
        this.setState({ showSearch: false })
        this.context.router.push('/?q=' + this.state.search)
    }

    handleChangeSearch(text) {
        this.setState({ search: text })
    }
}

export default TopicContainer
