import { connect } from 'react-redux'
import { getTopic } from '../../Home/modules/home'

import TopicDescView from '../components/TopicDescView'

const mapDispatchToProps = {
    getTopic
}

const mapStateToProps = ({ home }) => {
    return {
        topic: home.topic
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicDescView)
