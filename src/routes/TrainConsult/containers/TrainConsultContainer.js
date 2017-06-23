import { connect } from 'react-redux'
import TrainConsultView from '../components/TrainConsultView'

const mapDispatchToProps = {
   
}

const mapStateToProps = ({ home }) => {
    const { voters, voterPagination } = home

    return {
       topic: home.topic
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrainConsultView)
