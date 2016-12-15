import { connect } from 'react-redux'
import { getTopic, voting } from '../../Home/modules/home'
import { getVoterDetail } from '..//modules/voter'

import VoterView from '../components/VoterView'

const mapDispatchToProps = {
    getTopic,
    getVoterDetail,
    voting
}

const mapStateToProps = (state, ownProps) => {
    const { home, voter } = state
    return {
        topic: home.topic,
        id: ownProps.params.id,
        voter
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VoterView)
