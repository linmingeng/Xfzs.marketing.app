import { connect } from 'react-redux'
import IndexView from '../components/IndexView'
import { getServiceCategory } from '../modules/index'

const mapDispatchToProps = {
    getServiceCategory
}

const mapStateToProps = ({ index }) => {
    // console.log(index)
    const { serviceCategorys, servicePagination } = index
    return {
        serviceList: servicePagination.map(id => serviceCategorys[id]) || []
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexView)

