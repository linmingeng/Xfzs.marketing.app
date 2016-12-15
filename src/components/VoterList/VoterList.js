import React from 'react'
import './VoterList.scss'

export const VoterList = ({ children }) => (
    <div className="region voter-list">
        {children}
    </div>
)

VoterList.propTypes = {
    children: React.PropTypes.any
}

export default VoterList
