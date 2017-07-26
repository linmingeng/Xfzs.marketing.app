import React from 'react'
import './IndexView.scss'
import { api } from 'services/fetch'
import { Dialog } from 'react-weui'
import shopIcon from './assets/shop.png'
import train from './assets/train.png'

class IndexView extends React.Component {
    static propTypes = {
        serviceList: React.PropTypes.array.isRequired,
        getServiceCategory: React.PropTypes.func.isRequired
    }
    constructor(props) {
        super(props)
        this.show = this.show.bind(this)
    }
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }
    state = {
        showIOS1: false,
        style1: {
            buttons: [
                {
                    label: 'Ok',
                    onClick: this.hideDialog.bind(this)
                }
            ]
        }
    };
    hideDialog() {
        this.setState({
            showIOS1: false
        })
    }

    componentDidMount() {
        const { getServiceCategory } = this.props
        getServiceCategory()
    }

    render() {
        const query = location.href.split('?')[1] || ''
        const { serviceList } = this.props
        const fixServiceList = [{
            icon: shopIcon,
            id: 0,
            name: '蜂币商城',
            sort: 0,
            onClick: () => { location.href = 'http://shop.hxzcgf.cn/?' + query }
        }, {
            icon: train,
            id: 3,
            name: '培训活动',
            sort: 1,
            onClick : () => this.context.router.push('train/index/?id=' + 3)
        }]
        const allServiceList = fixServiceList.concat(
            serviceList.map(s => {
                s.onClick = () => this.context.router.push('train/index/?id=' + s.id)
                return s
            }))

        return (<div className="index-view">
            <img className="banner" src="http://api.shop.hxzcgf.cn/Assets/upload/2016/11/10/赚蜂币，抢豪礼1478770496.png" />
            <div className="navs-wapper">
                <div className="navs">
                    {
                        allServiceList.map((service) => this.renderRankingRow(service))
                    }
                </div>
            </div >
            <Dialog type="ios" title={this.state.style1.title}
                buttons={this.state.style1.buttons} show={this.state.showIOS1}>
                该功能还在开发中.......
            </Dialog>
        </div>
        )
    }
    show() {
        this.setState({ showIOS1: true })
    }
    renderRankingRow(service) {
        return <a
            className="nav"
            key={service.name}
            href="javascript:void(0);"
            onClick={service.onClick}>
            <div className="nav-icon">
                <img src={service.icon.indexOf('data') > -1 ? service.icon : `${api.imgHost}/${service.icon}`} />
            </div>
            <p className="nav-label">
                {service.name}
            </p>
        </a>
    }
}

export default IndexView
