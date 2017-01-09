import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { ButtonArea, Button } from 'react-weui'
import TopicContainer from 'components/TopicContainer'
import VotingButton from 'components/VotingButton'
import Share from 'components/Share'
import './VoterView.scss'
import { api } from 'services/fetch'

class VoterView extends React.Component {
    static propTypes = {
        id: React.PropTypes.string.isRequired,
        topic: React.PropTypes.object.isRequired,
        voter: React.PropTypes.object.isRequired,
        getTopic: React.PropTypes.func.isRequired,
        getVoterDetail: React.PropTypes.func.isRequired,
        voting: React.PropTypes.func.isRequired
    }

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    state = {
        showShare: false
    }

    constructor(props) {
        super(props)

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.handleToNext = this.handleToNext.bind(this)
        this.handleShare = this.handleShare.bind(this)
        this.handleHideShare = this.handleHideShare.bind(this)
    }

    componentDidMount() {
        const { getVoterDetail, id } = this.props

        getVoterDetail(id)
    }

    componentWillReceiveProps(nextProps) {
        const { id } = nextProps

        if (id && (id !== this.props.id)) {
            this.props.getVoterDetail(id)
        }
    }

    render() {
        const { voter, voting } = this.props

        return (
            <TopicContainer {...this.props}>
                <div className="region voter-view">
                    <div className="voter-warp">
                        <div className="ranking">
                            <p>排名：{voter.ranking}</p>
                            <p>票数：{voter.numberOfVotes}</p>
                        </div>
                        <div className="voter-info">
                            <p>昵称：{voter.name}</p>
                            <p>编号：{voter.number}</p>
                            <p>与上一名差距：{voter.difference}票</p>
                            {
                                voter.descriptions &&
                                voter.descriptions.map(d => <div key={d.id} className="voter-info">
                                    <p className="headerimage">
                                        <img src={`${api.imgHost}/500x500_w/${d.image}`} />
                                    </p>
                                    <p>{d.text}</p>
                                </div>)
                            }
                        </div>
                    </div>
                    <ButtonArea direction="horizontal" className="button-area">
                        <VotingButton voterId={voter.id} onVoting={voting} className="weui-btn_xf" />
                        <Button onClick={this.handleShare}>拉票</Button>
                        <Button type="default" onClick={this.handleToNext}>下一条</Button>
                    </ButtonArea>
                    <Share show={this.state.showShare} voter={voter} onHide={this.handleHideShare} />
                </div>
            </TopicContainer >
        )
    }

    handleToNext() {
        const next = this.props.voter.next

        next && this.context.router.push(`/topic/voter/${next}`)
    }

    handleShare() {
        this.setState({ showShare: true })
    }

    handleHideShare() {
        this.setState({ showShare: false })
    }
}

export default VoterView
