import React from 'react'
import { Link } from 'react-router'
import { Menu, Icon } from 'antd'
import createRoutes from 'routes/index'
import './Nav.scss'

export const Nav = ({ pathname }) => {
    const routes = createRoutes(null)
    let matchName = routes[0].name

    const renderSingle = (route) => {
        if (route.path === pathname) {
            matchName = route.name
        }

        return (<Menu.Item key={route.name}>
            <Link to={route.path}>{route.name}</Link>
        </Menu.Item>)
    }

    const rendrChildren = (route) => {
        if (route.path === pathname) {
            matchName = route.name
        }

        return (
            <Menu.SubMenu
                key={route.name}
                title={<span><Icon type="laptop" />{route.name}</span>}
                children={[route.childRoutes.filter(c => c.show).map(renderSingle.bind(this))]} />)
    }

    const renderAll = routes[0].childRoutes.map(r => {
        return (r.childRoutes ? rendrChildren(r) : renderSingle(r))
    })
    
    return (
        <Menu mode="inline" theme="dark"
            defaultSelectedKeys={[matchName]}>
            {
                renderSingle(routes[0])
            }
            {renderAll}
        </Menu>
    )
}

Nav.propTypes = {
    pathname: React.PropTypes.string.isRequired
}

export default Nav
