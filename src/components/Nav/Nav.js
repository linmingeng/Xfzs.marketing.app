import React from 'react'
import './Nav.scss'
import index from './assets/index.png'
import topicDate from './assets/topic-date.png'
import topicDesc from './assets/topic-desc.png'
import ranking from './assets/ranking.png'
import search from './assets/search.png'
import singup from './assets/singup.png'
import usercenter from './assets/usercenter.png'
import share from './assets/share.png'
import auth from 'services/auth'

export const Nav = ({ onSearch, onShowTopicDate }, context) => {
    const navs = [
        { icon: <img src={index} />, label: '投票评选', onClick: () => context.router.push('/') },
        { icon: <img src={topicDate} />, label: '活动日期', onClick: onShowTopicDate },
        { icon: <img src={topicDesc} />, label: '活动介绍', onClick: () => context.router.push('/topic/desc') },
        { icon: <img src={ranking} />, label: '实时排名', onClick: () => context.router.push('/topic/ranking') },
        { icon: <img src={singup} />, label: '我要报名', onClick: () => context.router.push('/topic/signup') },
        { icon: <img src={search} />, label: '投票搜索', onClick: onSearch },
        { icon: <img src={share} />, label: '分享拉票', onClick: () => context.router.push('/topic/signup') },
        {
            icon: <img src={usercenter} />,
            label: '注销登录',
            onClick: () => { auth.loggOut(); context.router.push('/login') }
        }
    ]

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
    onShowTopicDate: React.PropTypes.func.isRequired,
    onSearch: React.PropTypes.func.isRequired
}

Nav.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default Nav
