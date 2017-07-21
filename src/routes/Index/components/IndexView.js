import React from 'react'
import './IndexView.scss'
import Nav from 'components/Nav'
import shop from './assets/shop.png'
import { api } from 'services/fetch'

class IndexView extends React.Component {
    static propTypes = {
        serviceList: React.PropTypes.array.isRequired,
        getServiceCategory: React.PropTypes.func.isRequired
    }

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    componentDidMount() {
        const { getServiceCategory } = this.props
        getServiceCategory()
        // console.log(serviceList)
    }

    render() {
        console.log(this.props)
        const query = location.href.split('?')[1] || ''
        const { serviceList } = this.props
        
        // const icons = [{
        //     icon: < img src={shop} />,
        //     label: '蜂币商城',
        //     onClick: () => { location.href = 'http://shop.hxzcgf.cn/?' + query }
        // },
        // {
        //     icon: < img src={shop} />,
        //     label: '蜂币商城2',
        //     onClick: () => this.context.router.push('train/index/?id=' + '5')
        // }]

        for (let i = 0; i < serviceList.length; i++) {
            switch (i) {
                case 0:
                    serviceList[i].onClick = () => { location.href = 'http://shop.hxzcgf.cn/?' + query }
                    break
                case 1:
                    serviceList[i].onClick = () => { location.href = 'http://shop.hxzcgf.cn/?' + query }
                    break
                case 2:
                    serviceList[i].onClick = () => { location.href = 'http://shop.hxzcgf.cn/?' + query }
                    break
                case 3:
                    serviceList[i].onClick = () => { location.href = 'http://shop.hxzcgf.cn/?' + query }
                    break
                case 4:
                    serviceList[i].onClick = () => this.context.router.push('train/index/?id=' + '5')
                    break
                case 5:
                    serviceList[i].onClick = () => this.context.router.push('train/index/?id=' + '2')
                    break
                case 6:
                    serviceList[i].onClick = () => this.context.router.push('train/index/?id=' + '5')
                    break
                default:
                    serviceList[i].onClick = () => this.context.router.push('train/index/?id=' + '7')
            }
        }

        return (<div className="index-view">
            <img className="banner" src="http://api.shop.hxzcgf.cn/Assets/upload/2016/11/10/赚蜂币，抢豪礼1478770496.png" />
            <div className="navs-wapper">
                {/* <Nav navs={[...icons]} /> */}
                <div className="navs">
                    {
                        serviceList.map((service) => this.renderRankingRow(service))
                    }
                </div>
            </div >
        </div>
        )
    }
    renderRankingRow(service) {
        return <a className="nav" key={service.name} href="javascript:void(0);" onClick={service.onClick}>
            <div className="nav-icon">
                <img src={`${api.imgHost}/${service.icon}`} />
            </div>
            <p className="nav-label">
                {service.name}
            </p>
        </a>
    }
}

export default IndexView
