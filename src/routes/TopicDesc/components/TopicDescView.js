import React from 'react'
import TopicContainer from 'components/TopicContainer'
// import RegionTitle from 'components/RegionTitle'
import './TopicDescView.scss'

export const TopicDescView = (props) => {
    return (
        <TopicContainer {...props}>
            <div className="region topic-desc-view">
                <img src={props.topic.desc} />
            </div>
        </TopicContainer>
    )
}

TopicDescView.propTypes = {
    topic: React.PropTypes.object.isRequired,
    getTopic: React.PropTypes.func.isRequired
}

export default TopicDescView
