import React from 'react'
import { PopupHeader, Popup, SearchBar } from 'react-weui'
import './MiniSearch.scss'

export const MiniSearch = ({ show, onSubmit, onCancel, onChange }) => (
    <Popup
        show={show}
        onRequestClose={onCancel}>
        <PopupHeader
            left="取消"
            right="确定"
            leftOnClick={onCancel}
            rightOnClick={onSubmit} />
        <div className="mini-search">
            <SearchBar onChange={onChange} placeholder="请输入编号或昵称" />
        </div>
    </Popup>
)

MiniSearch.propTypes = {
    show: React.PropTypes.bool.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired
}

export default MiniSearch
