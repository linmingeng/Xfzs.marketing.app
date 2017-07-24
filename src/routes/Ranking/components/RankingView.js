import React from 'react'
import { Link } from 'react-router'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './RankingView.scss'
import TopicContainer from 'components/TopicContainer'
import RegionTitle from 'components/RegionTitle'
import { api } from 'services/fetch'

class RankingView extends React.Component {
    static propTypes = {
        topic: React.PropTypes.object.isRequired,
        voters: React.PropTypes.array.isRequired,
        getVoters: React.PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    componentDidMount() {
        // console.log(this.props)
        // console.log(topic.id)
        const { topic, getVoters } = this.props

        getVoters(topic.id)
    }

    render() {
        const { voters } = this.props

        return <TopicContainer {...this.props}>
            <div className="region ranking-view">
                <RegionTitle title="实时排名" />
                <ul className="ranking-list">
                    <li className="row title">
                        <span className="col">排名</span>
                        <span className="col voter">参与人</span>
                        <span className="col">票数</span>
                    </li>
                    {
                        voters.map((voter, index) => this.renderRankingRow(voter, index))
                    }
                </ul>
            </div>
        </TopicContainer>
    }

    renderRankingRow(voter, index) {
        const cls = 'col ' + this.renderClass(index + 1)
        return <li className="row" key={voter.id}>
            <div className={cls}>{index + 1}</div>
            <div className="col voter">
                <Link to={`/topic/voter/${voter.id}`}>
                    <img src={`${api.imgHost}/50x50_w/${voter.faceDescription.image}`} className="voter-headerimage" />
                    <div className="voter-desc">
                        <p>NO.{voter.number}</p>
                        <p>{voter.name}</p>
                    </div>
                </Link>
            </div>
            <div className="col">{voter.numberOfVotes}票</div>
        </li>
    }

    renderClass(top) {
        switch (top) {
            case 1: return 'ranking-top-1'
            case 2: return 'ranking-top-2'
            case 3: return 'ranking-top-3'
            default: return 'ranking-top-other'
        }
    }
}

export default RankingView
