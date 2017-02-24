import { connect } from 'react-redux'
import * as actions from '../modules/redEnvelopTopic'

import RedEnvelopTopicView from '../components/RedEnvelopTopicView'

const mapDispatchToProps = {
    ...actions
}

const mapStateToProps = ({ redEnvelopTopic }, ownProps) => {
    return {
        params: ownProps.params,
        topic: redEnvelopTopic.topic
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RedEnvelopTopicView)
