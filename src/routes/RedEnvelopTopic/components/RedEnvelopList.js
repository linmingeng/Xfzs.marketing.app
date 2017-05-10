import React from 'react'
import { Link } from 'react-router'
import { api } from 'services/fetch'
import './RedEnvelopList.scss'

const RedEnvelopList = ({ data }) => (
    < ul className="red-envelop-list" >
        {
            data.map((value, index) => <li key={index} className={index % 2 === 0 ? 'item' : 'item high-bg'}>
                <div>
                    <img src={`${api.imgHost}/50_50_w/${value.senderFace}`} />
                </div>
                <div>
                    <h3>{value.senderName}</h3>
                    <p>红包总数:{value.number}个</p>
                    <p>{value.canTakeTime.replace('T', ' ')}</p>
                </div>
                <div>
                    <Link className="link" to={`/rd/take/${value.topicId}/${value.id}`}>{
                        (new Date(value.canTakeTime.replace('T', ' ').replace(/-/g, '/')).getTime() -
                            new Date().getTime() < 0)
                            ? '蜂抢红包'
                            : '立即分享'
                    }</Link>
                </div>
            </li>)
        }
        {
            data.length === 0 && <li className="item">
                <span className="link">敬请期待</span>
            </li>
        }
    </ul >
)

RedEnvelopList.propTypes = {
    data: React.PropTypes.array.isRequired
}

export default RedEnvelopList
