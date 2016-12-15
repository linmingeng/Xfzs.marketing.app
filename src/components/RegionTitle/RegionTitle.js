import React from 'react'
import './RegionTitle.scss'

export const RegionTitle = ({ title }) => {
    return (
        <div className="region-title">
            <p>{title}</p>
        </div >
    )
}

RegionTitle.propTypes = {
    title: React.PropTypes.string.isRequired
}

export default RegionTitle
