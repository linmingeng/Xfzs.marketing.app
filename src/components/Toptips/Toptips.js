import React from 'react'
import './Toptips.scss'
import { Toast } from 'react-weui'

export const Toptips = ({ show, text }) => (
    <Toast icon="" iconSize="small" show={show} className="toast-error">{text}</Toast>
)

Toptips.propTypes = {
    show: React.PropTypes.bool.isRequired,
    text: React.PropTypes.string.isRequired
}

export default Toptips
