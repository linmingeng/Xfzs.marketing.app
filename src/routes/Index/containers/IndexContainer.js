import { connect } from 'react-redux'
import IndexView from '../components/IndexView'
import * as actions from '../modules/index'

const mapDispatchToProps = {
    ...actions
}

const mapStateToProps = ({ index }) => {
    const { serviceCategorys, servicePagination } = index
    return {
        serviceList: servicePagination.ids.map(id => serviceCategorys[id]) || []
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexView)
