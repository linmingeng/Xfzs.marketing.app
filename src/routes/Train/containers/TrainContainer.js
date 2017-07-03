import { connect } from 'react-redux'
import * as actions from '../modules/train'
import TrainView from '../components/TrainView'

const mapDispatchToProps = {
    ...actions
}

const mapStateToProps = ({ train }, ownProps) => {
    const { takeRecord, takeRecordPagination } = train

    return {
        params: ownProps.params,
        takeRecordList: takeRecordPagination.ids.map(id => takeRecord[id])
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrainView)
