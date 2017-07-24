import { connect } from 'react-redux'
import PersonageIndexView from '../components/PersonageIndexView'

const mapDispatchToProps = {

}

const mapStateToProps = ({ index }) => {
    // // console.log(index)
    // const { serviceCategorys, servicePagination } = index
    // return {
    //     serviceList: servicePagination.map(id => serviceCategorys[id]) || []
    // }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonageIndexView)
