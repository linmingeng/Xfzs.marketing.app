import { connect } from 'react-redux'
import IndexView from '../components/IndexView'
import { getServiceCategoryList } from '../modules/index'

const mapDispatchToProps = {
    getServiceCategoryList
}

const mapStateToProps = (service) => {
    console.log(serviceCategory)
    const { serviceCategory, serviceCategoryPagination } = service
    return {
        // topic: serviceCategory.topic
        // serviceCategory: serviceCategoryPagination.ids.map(id => serviceCategory[id]) || []
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexView)
