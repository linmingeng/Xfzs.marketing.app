import { connect } from 'react-redux'
import { actions, getShareCode, trySaveShareRecords } from '../modules/redEnvelopTake'
import { getRedEnvelopTopic } from '../../RedEnvelopTopic/modules/redEnvelopTopic'

import RedEnvelopTakeView from '../components/RedEnvelopTakeView'

const mapDispatchToProps = {
    ...actions,
    getRedEnvelopTopic
}

const mapStateToProps = ({ redEnvelopTake, redEnvelopTopic }, ownProps) => {
    const { redEnvelop } = redEnvelopTake
    const { topic } = redEnvelopTopic

    return {
        params: ownProps.params,
        redEnvelop,
        topic,
        getShareCode,
        trySaveShareRecords
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RedEnvelopTakeView)
