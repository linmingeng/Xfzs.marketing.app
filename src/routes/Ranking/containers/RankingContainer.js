import { connect } from 'react-redux'
import { getTopic, getVoters } from '../../Home/modules/home'

import RankingView from '../components/RankingView'

const mapDispatchToProps = {
    getTopic,
    getVoters
}

const mapStateToProps = ({ home }) => {
    const { voters, voterPagination } = home
    console.log(home)
    return {
        topic: home.topic,
        voters: voterPagination.ids.map(id => voters[id]) || []
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RankingView)
