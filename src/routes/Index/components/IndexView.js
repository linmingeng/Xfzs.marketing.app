import React from 'react'
import './IndexView.scss'
import { api } from 'services/fetch'
import { Dialog } from 'react-weui'

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
        // console.log(serviceList)
    }

    render() {
        // const query = location.href.split('?')[1] || ''
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
                    serviceList[i].onClick = () => this.context.router.push('train/index/?id=' + '5')
                    break
                case 1:
                    serviceList[i].onClick = () => this.setState({ showIOS1: true })
                    break
                case 2:
                    serviceList[i].onClick = () => this.setState({ showIOS1: true })
                    break
                case 3:
                    serviceList[i].onClick = () => this.setState({ showIOS1: true })
                    break
                case 4:
                    serviceList[i].onClick = () => this.setState({ showIOS1: true })
                    break
                case 5:
                    serviceList[i].onClick = () => this.setState({ showIOS1: true })
                    break
                case 6:
                    serviceList[i].onClick = () => this.setState({ showIOS1: true })
                    break
                case 7:
                    serviceList[i].onClick = () => this.setState({ showIOS1: true })
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
