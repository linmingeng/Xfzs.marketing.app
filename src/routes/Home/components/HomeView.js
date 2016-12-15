import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Masonry from 'react-masonry-component'
import './HomeView.scss'
import TopicContainer from 'components/TopicContainer'
import VoterList from 'components/VoterList'
import VoterItem from 'components/VoterItem'

class HomeView extends React.Component {
    static propTypes = {
        topic: React.PropTypes.object.isRequired,
        voters: React.PropTypes.array.isRequired,
        getTopic: React.PropTypes.func.isRequired,
        getVoters: React.PropTypes.func.isRequired,
        voting: React.PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    componentDidMount() {
        const { topic, getVoters } = this.props

        getVoters(topic.id, 1)
    }

    render() {
        const { voters, voting } = this.props
        const options = { transitionDuration: 0 }

        return (
            <TopicContainer {...this.props}>
                <VoterList>
                    <Masonry options={options}>
                        {voters.map(v => <VoterItem key={v.id} voter={v} onVoting={voting} />)}
                    </Masonry>
                </VoterList>
            </TopicContainer>
        )
    }
}

export default HomeView
