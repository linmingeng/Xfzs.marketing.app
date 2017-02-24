import { connect } from 'react-redux'
import { actions } from '../modules/redEnvelopRecord'

import RedEnvelopRecordView from '../components/RedEnvelopRecordView'

const mapDispatchToProps = {
    ...actions
}

const mapStateToProps = ({ redEnvelopRecord }, ownProps) => {
    const { takeRecord, takeRecordPagination } = redEnvelopRecord

    return {
        params: ownProps.params,
        takeRecordList: takeRecordPagination.ids.map(id => takeRecord[id])
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RedEnvelopRecordView)
