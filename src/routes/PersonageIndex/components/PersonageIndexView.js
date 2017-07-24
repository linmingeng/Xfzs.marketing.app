import React from 'react'
import './PersonageIndexView.scss'
import shop from './assets/shop.png'
import canvass from './assets/canvass.png'
import Lottery from './assets/Lottery.png'
import RedEnvelop from './assets/RedEnvelop.png'
import Nav from 'components/Nav'

class IndexView extends React.Component {
    static propTypes = {
    }

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    // componentDidMount() {
    //     const { getServiceCategory } = this.props
    //     getServiceCategory()
    //     // console.log(serviceList)
    // }

    render() {
        console.log(this.props)
        const query = location.href.split('?')[1] || ''

        const icons = [{
            icon: < img src={shop} />,
            label: '蜂币商城',
            onClick: () => { location.href = 'http://shop.hxzcgf.cn?' + query }
            // http://shop.hxzcgf.cn?l=15927678095&p=fe35c6a960bf8a2560c237cc9b516dcf
        },
        {
            icon: < img src={Lottery} />,
            label: '蜂狂抽奖',
            onClick: () => { location.href = 'http://vote.hxzcgf.cn/lottery/index?' + query }
            // http://vote.hxzcgf.cn/lottery/index?id=9616469a-e26d-45e1-a7aa-53b22f4f53dc");
        },
        {
            icon: < img src={RedEnvelop} />,
            label: '蜂抢红包',
            onClick: () => { location.href = 'http://vote.hxzcgf.cn/rd/topic/1' }
        },
        {
            icon: < img src={canvass} />,
            label: '蜂拥拉票',
            onClick: () => { location.href = 'http://vote.hxzcgf.cn?' + query }
            // http://vote.hxzcgf.cn?id=9e74e4de-35b3-4b2e-9701-69ae7f9fc1ca");
        }
        ]

        return (<div className="index-view">
            <img className="banner" src="http://api.shop.hxzcgf.cn/Assets/upload/2016/11/10/赚蜂币，抢豪礼1478770496.png" />
            <div className="navs-wapper">
                <Nav navs={[...icons]} />
            </div >
        </div>
        )
    }
}

export default IndexView
