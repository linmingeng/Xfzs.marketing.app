import { connect } from 'react-redux'
import * as actions from '../modules/redEnvelopTopic'
import RedEnvelopTopicView from '../components/RedEnvelopTopicView'

const mapDispatchToProps = {
    ...actions
}

const mapStateToProps = ({ redEnvelopTopic }, ownProps) => {
    const { redEnvelops, redEnvelopsPagination } = redEnvelopTopic

    return {
        params: ownProps.params,
        topic: redEnvelopTopic.topic,
        redEnvelopList: redEnvelopsPagination.ids.map(id => redEnvelops[id])
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RedEnvelopTopicView)
