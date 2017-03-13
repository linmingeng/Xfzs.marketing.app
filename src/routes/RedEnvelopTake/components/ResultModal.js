import React from 'react'
import './ResultModal.scss'
import { Dialog } from 'react-weui'
import { api } from 'services/fetch'
import win from './assets/win.png'
import lose from './assets/lose.png'

export const ResultModal = ({ show, result, onClose }) => (
    <Dialog type="ios" show={show} className="result-modal">
        <p className="close" onClick={onClose}>&nbsp;</p>
        <div className="content">
            <img src={result.status === 1 ? win : lose} className="status" />
            <div className="bg">
                <p className="text">{result.status === 1
                    ? `获得${result.type === 1 ? '现金' : '蜂币'}${result.value}${result.type === 1 ? '元' : '个'}`
                    : '很遗憾~没有抢到'}
                </p>
                <p>红包由以下企业赞助</p>
                <a href={result.link}><img src={`${api.imgHost}/${result.face}`} className="face" /></a>
                {
                    result.status === 1 && <a href={result.link} className="link">领取</a>
                }
            </div>
        </div>
    </Dialog>
)

ResultModal.propTypes = {
    show: React.PropTypes.bool.isRequired,
    result: React.PropTypes.object.isRequired,
    onClose: React.PropTypes.func.isRequired
}

export default ResultModal
