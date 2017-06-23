import { connect } from 'react-redux'


import TrainView from '../components/TrainView'

const mapDispatchToProps = {
   
}

const mapStateToProps = ({ home }) => {
    const { voters, voterPagination } = home

    return {
       topic: home.topic
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrainView)
