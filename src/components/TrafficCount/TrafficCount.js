import React from 'react'
import './TrafficCount.scss'

export const TrafficCount = ({ voterSum, numberOfVoteSum, viewSum }) => (
    <div className="traffic-count">
        <div className="count">
            <p>统计参与者</p>
            <p>{voterSum}</p>
        </div>
        <div className="line"><p /></div>
        <div className="count">
            <p>统计投票数</p>
            <p>{numberOfVoteSum}</p>
        </div>
        <div className="line"><p /></div>
        <div className="count">
            <p>统计访问量</p>
            <p>{viewSum}</p>
        </div>
    </div>
)

TrafficCount.propTypes = {
    voterSum: React.PropTypes.number.isRequired,
    numberOfVoteSum: React.PropTypes.number.isRequired,
    viewSum: React.PropTypes.number.isRequired
}

export default TrafficCount
