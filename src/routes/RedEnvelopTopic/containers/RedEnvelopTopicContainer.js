import { connect } from 'react-redux'
import * as actions from '../modules/redEnvelopTopic'
import { getCanTakeRedEnvelopList } from '../../RedEnvelopTake/modules/redEnvelopTake'
import RedEnvelopTopicView from '../components/RedEnvelopTopicView'

const mapDispatchToProps = {
    ...actions,
    getCanTakeRedEnvelopList
}

const mapStateToProps = ({ redEnvelopTopic, redEnvelopTake }, ownProps) => {
    return {
        params: ownProps.params,
        topic: redEnvelopTopic.topic,
        redEnvelopList: redEnvelopTake.redEnvelopPagination.ids.map(id => redEnvelopTake.redEnvelop[id])
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RedEnvelopTopicView)
