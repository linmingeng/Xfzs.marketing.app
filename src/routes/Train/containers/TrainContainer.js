import { connect } from 'react-redux'
import { getService } from '../modules/train'
import TrainView from '../components/TrainView'

const mapDispatchToProps = {
    getService
}

const mapStateToProps = ({ train }) => {
    const { services, servicePagination } = train
    // console.log(train)
    return {
        services: servicePagination.ids.map(id => services[id]) || []
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrainView)
