import { connect } from 'react-redux'
import { saveWorkOrder, getService } from '../modules/trainconsult'
// import { getService } from '../../Train/modules/train'
import TrainConsultView from '../components/TrainConsultView'

const mapDispatchToProps = {
    saveWorkOrder,
    getService
}

const mapStateToProps = ({ trainconsult }) => {
    const { workOrder, workOrderPagination, services, servicePagination } = trainconsult

    return {
        uid:trainconsult.uid,
        workOrder: workOrderPagination.ids.map(id => workOrder[id]) || [],
        params:trainconsult.params,
        services: servicePagination.ids.map(id => services[id]) || []
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrainConsultView)
