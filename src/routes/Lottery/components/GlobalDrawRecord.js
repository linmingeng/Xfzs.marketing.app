import React from 'react'
import './GlobalDrawRecord.scss'

export const GlobalDrawRecord = ({ drawRecords }) => {
    return <div className="global-draw-record">
        <label className="label-bg">中奖名单</label>
        <div className="global-draw-record-warp">
            <ul>
                {
                    drawRecords.map(dr => <li key={dr.id}>
                        {`${dr.userName}刚刚获得${dr.productName}奖品`}
                    </li>)
                }
            </ul>
        </div>
    </div>
}

GlobalDrawRecord.propTypes = {
    drawRecords: React.PropTypes.array.isRequired
}

export default GlobalDrawRecord
