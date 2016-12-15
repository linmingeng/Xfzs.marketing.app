import { connect } from 'react-redux'
import { getTopic } from '../../Home/modules/home'
import { upload, submitSingup, getSignup } from '../modules/signup'

import SignupView from '../components/SignupView'

const mapDispatchToProps = {
    getTopic,
    submitSingup,
    getSignup
}

const mapStateToProps = ({ home, signup }) => {
    return {
        topic: home.topic,
        signup,
        upload
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupView)
