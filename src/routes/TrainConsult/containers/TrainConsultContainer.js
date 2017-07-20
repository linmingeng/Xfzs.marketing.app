import { connect } from 'react-redux'
import { saveWorkOrder } from '../modules/trainconsult'
import TrainConsultView from '../components/TrainConsultView'

const mapDispatchToProps = {
    saveWorkOrder
}

const mapStateToProps = ({ trainconsult }) => {
    const { workOrder, workOrderPagination } = trainconsult

    return {
        workOrder: workOrderPagination.ids.map(id => workOrder[id]) || []
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrainConsultView)
