import React from 'react'
import TopicContainer from 'components/TopicContainer'
import './TopicDescView.scss'
import { api } from 'services/fetch'

export const TopicDescView = (props) => {
    return (
        <TopicContainer {...props}>
            <div className="region topic-desc-view">
                <img src={`${api.imgHost}/${props.topic.desc}`} />
            </div>
        </TopicContainer>
    )
}

TopicDescView.propTypes = {
    topic: React.PropTypes.object.isRequired
}

export default TopicDescView
