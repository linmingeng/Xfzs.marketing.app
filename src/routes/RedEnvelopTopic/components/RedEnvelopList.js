import React from 'react'
import { Link } from 'react-router'
import { api } from 'services/fetch'
import './RedEnvelopList.scss'

const RedEnvelopList = ({ data }) => (
    <ul className="red-envelop-list">
        {data.map((value, index) => <li className={index % 2 === 0 ? 'item' : 'item high-bg'}>
            <div>
                <img src={`${api.imgHost}/60_60_w/${value.senderFace}`} />
            </div>
            <div>
                <h3>{value.senderName}</h3>
                <p>红包总数:{value.number}个</p>
                <p>{value.canTakeTime.replace('T', ' ')}</p>
            </div>
            <div>
                {
                    (new Date(value.canTakeTime.replace('T', ' ').replace(/-/g, '/')).getTime() -
                        new Date().getTime() < 0)
                        ? <Link className="link" to={`/rd/take/${value.id}`}>蜂抢红包</Link>
                        : <span className="link">敬请期待</span>
                }
            </div>
        </li>)}
        {
            data.length === 0 && <li className="item">
                <span className="link">敬请期待</span>
            </li>
        }
    </ul>
)

RedEnvelopList.propTypes = {
    data: React.PropTypes.array.isRequired
}

export default RedEnvelopList
