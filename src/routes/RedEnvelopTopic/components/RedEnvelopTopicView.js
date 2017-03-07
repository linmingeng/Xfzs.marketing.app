import React from 'react'
import { Link } from 'react-router'
import { api } from 'services/fetch'
import './RedEnvelopTopicView.scss'
import topicHeaer from './assets/topic-heaer.png'
import appQR from './assets/appQR.png'

class RedEnvelopTopicView extends React.PureComponent {
    static propTypes = {
        params: React.PropTypes.object.isRequired,
        location: React.PropTypes.object.isRequired,
        topic: React.PropTypes.object.isRequired,
        getRedEnvelopTopic: React.PropTypes.func.isRequired
    }

    componentDidMount() {
        const { getRedEnvelopTopic, params } = this.props

        getRedEnvelopTopic(params.id)
    }

    constructor(props) {
        super(props)

        if (props.location.query.c) {
            sessionStorage['red-envelop-share-code'] = props.location.query.c
        }
    }

    render() {
        const { topic } = this.props

        return (
            <div className="red-envelop-topic-container">
                <div className="top-bg">
                    <img src={topicHeaer} className="img" />
                </div>
                <Link className="start-btn" to={`/rd/take/${topic.id}`}>蜂抢红包</Link>
                <img src={`${api.imgHost}/${topic.desc}`} className="img" />
                <div className="app-download">
                    <img src={appQR} className="img" />
                    <p>扫码下载App</p>
                </div>
            </div>
        )
    }
}

export default RedEnvelopTopicView
