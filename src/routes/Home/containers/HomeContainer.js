import { connect } from 'react-redux'
import { getTopic, getVoters, voting } from '../modules/home'

import HomeView from '../components/HomeView'

const mapDispatchToProps = {
    getTopic,
    getVoters,
    voting
}

const mapStateToProps = ({ home }, ownProps) => {
    const { voters, voterPagination } = home
    const { location: { query } } = ownProps

    let allVoters = voterPagination.ids.map(id => voters[id]) || []

    if (query.q) {
        allVoters = allVoters.filter(v => v.number.toString() === query.q || (v.name.indexOf(query.q) > -1))
    }

    return {
        topic: home.topic,
        voters: allVoters
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
