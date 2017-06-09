import React from 'react'
import './Nav.scss'

export const Nav = ({ navs }) => {
    return (
        <div className="navs">
            {
                navs.map(n => <a className="nav" key={n.label} href="javascript:void(0);" onClick={n.onClick}>
                    <div className="nav-icon">
                        {n.icon}
                    </div>
                    <p className="nav-label">
                        {n.label}
                    </p>
                </a>)
            }
        </div >
    )
}

Nav.propTypes = {
    navs: React.PropTypes.array.isRequired
}

export default Nav
