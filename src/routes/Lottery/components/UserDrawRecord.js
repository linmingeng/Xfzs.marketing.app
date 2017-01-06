import React from 'react'
import { Icon } from 'react-weui'
import './UserDrawRecord.scss'

export const UserDrawRecord = ({ drawRecord, onSetAddress }) => {
    const rednerOper = (dr) => {
        if (dr.isPointsProduct) {
            return <span className="icon-txt"><Icon value="success-circle" />已领取</span>
        } else {
            if (dr.isShip) {
                return <span className="icon-txt"><Icon value="success-circle" />已发货</span>
            } else {
                if (dr.shippingAddress) {
                    return <span className="icon-txt"><Icon value="waiting-circle" />等待发货</span>
                } else {
                    return <span className="icon-txt"><Icon value="warn" />点击设置地址</span>
                }
            }
        }
    }

    const handleClick = (dr) => {
        return () => {
            if ((!dr.isPointsProduct) && (!dr.shippingAddress)) {
                onSetAddress(dr)
            }
        }
    }

    return <div className="user-draw-record" id="userDrawRecord">
        <label className="label-bg">我的中奖</label>
        <ul>
            {
                drawRecord.map((dr, index) => <li key={dr.id}>
                    <p>{
                        dr.creationTime.replace('T', ' ').split(':')[0] +
                        ':' +
                        dr.creationTime.replace('T', ' ').split(':')[1]
                    }&nbsp;</p>
                    <p>奖品:<b>{dr.productName}</b></p>
                    <p className="oper" onClick={handleClick(dr)}>{rednerOper(dr)}</p>
                </li>)
            }
        </ul>
    </div>
}

UserDrawRecord.propTypes = {
    drawRecord: React.PropTypes.array.isRequired,
    onSetAddress: React.PropTypes.func.isRequired
}

export default UserDrawRecord
