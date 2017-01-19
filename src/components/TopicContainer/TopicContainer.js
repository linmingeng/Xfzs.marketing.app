import React from 'react'
import { Dialog } from 'react-weui'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Nav from 'components/Nav'
import TrafficCount from 'components/TrafficCount'
import MiniSearch from 'components/MiniSearch'
import './TopicContainer.scss'
import { api } from 'services/fetch'

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

        return (
            <div className="container">
                {
                    topic.focus && <img src={`${api.imgHost}/414_100_w/${topic.focus}`} className="banner" />
                }
                <div className="region">
                    <TrafficCount
                        {...topic} />
                    <Nav
                        onSearch={this.handleShowSearch}
                        onShowTopicDate={this.ShowTopicDate} />
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
