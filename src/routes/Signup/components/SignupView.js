import React from 'react'
import TopicContainer from 'components/TopicContainer'
import RegionTitle from 'components/RegionTitle'
import './SignupView.scss'
import SignupForm from './SignupForm'

export const SignupView = (props) => {
    const { topic, signup, getSignup, submitSingup, upload } = props

    const handleOnSubmit = (signup, cb) => {
        signup.topicId = topic.id
        submitSingup(signup, cb)
    }

    const bindGeSignup = () => getSignup(topic.id)

    return (
        <TopicContainer {...props}>
            <div className="region signup-view">
                <RegionTitle title={`${signup.id ? '已报名' : '报名中心'}`} />
                <SignupForm
                    onUpload={upload}
                    onSubmit={handleOnSubmit}
                    signup={signup}
                    getSignup={bindGeSignup} />
            </div>
        </TopicContainer>
    )
}

SignupView.propTypes = {
    topic: React.PropTypes.object.isRequired,
    signup: React.PropTypes.object,
    upload: React.PropTypes.func.isRequired,
    submitSingup: React.PropTypes.func.isRequired,
    getSignup: React.PropTypes.func.isRequired
}

export default SignupView
