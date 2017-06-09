import React from 'react'
import './IndexView.scss'
import shop from './assets/shop.png'
import Nav from 'components/Nav'

export const IndexView = (props, context) => {
    const query = location.href.split('?')[1] || ''

    const icons = [
        {
            icon: <img src={shop} />,
            label: '蜂币商城',
            onClick: () => { location.href = 'http://shop.hxzcgf.cn/?' + query }
        }
    ]

    return (<div className="index-view">
        <img className="banner" src="http://api.shop.hxzcgf.cn/Assets/upload/2016/11/10/赚蜂币，抢豪礼1478770496.png" />
        <div className="navs-wapper"><Nav navs={icons} /></div>
    </div>)
}

IndexView.propTypes = {}

IndexView.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default IndexView
