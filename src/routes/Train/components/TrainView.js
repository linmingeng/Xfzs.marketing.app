import React from 'react'
import './TrainView.scss'
import Down from './assets/down.png'
import Up from './assets/up.png'
import './animate.css'
import { Button, ButtonArea } from 'react-weui'
import { Link } from 'react-router'
import { api } from 'services/fetch'

class TrainView extends React.PureComponent {
    static propTypes = {
        params: React.PropTypes.object.isRequired,
        services: React.PropTypes.array.isRequired,
        getService: React.PropTypes.func.isRequired
    }
    componentDidMount() {
        const { params, getService } = this.props
        getService(params.id)
    }

    constructor(props) {
        super(props)
        this.show = this.show.bind(this)
        this.state = {
            display: 'none',
            text: '查看详情',
            image: { Down },
            class_name: 'show_conatant'
        }
    }
    show() {
        this.setState({
            // display: this.state.display === 'block' ? 'none' : 'block',
            text: this.state.display === 'block' ? '查看详情' : '收起内容',
            image: this.state.display === 'block' ? { Down } : { Up },
            class_name: this.state.display === 'block'
                ? 'show_conatant animated fadeOut'
                : 'show_conatant animated fadeIn'
        })
    }
    render() {
        const { services } = this.props
        for (let i = 0; i < services.length; i++) {
            switch (i) {
                case 0:
                    services[i].onClick = () => this.setState({ image: { Up } })
                    break
                case 1:
                    services[i].onClick = () => console.log(1)
                    break
                case 2:
                    services[i].onClick = () => this.setState({ showIOS1: true })
                    break
                case 3:
                    services[i].onClick = () => this.setState({ showIOS1: true })
                    break
                case 4:
                    services[i].onClick = () => this.setState({ showIOS1: true })
                    break
                case 5:
                    services[i].onClick = () => this.setState({ showIOS1: true })
                    break
                case 6:
                    services[i].onClick = () => this.setState({ showIOS1: true })
                    break
                case 7:
                    services[i].onClick = () => this.setState({ showIOS1: true })
                    break
                default:
                    services[i].onClick = () => this.context.router.push('train/index/?id=' + '7')
            }
        }
        return (
            <div>
                {
                    services.map((service) => this.renderRankingRow(service))
                }
            </div>
        )
    }

    renderRankingRow(service) {
        return <div className="allContant" key={service.id}>
            <div className="traincontain">
                <div className="leftcontant">
                    <img src={`${api.imgHost}/${service.image}`} />
                </div>
                <div className="rightcontant">
                    <h1>{service.title}</h1>
                    <h3>￥{service.cashPrice}+{service.pointPrice}蜂币</h3>
                    <span>{service.provide}</span>
                    <ButtonArea direction="horizontal">
                        <Button className="weui-btn_xf weui-btn_xf_mini left_btn">
                            购买
                        </Button>
                        <Link to={`/train/consult/?id=${service.id}`}>
                            <Button type="default" plain className="weui-btn_xf_mini right_btn">
                                咨询
                            </Button>
                        </Link>
                    </ButtonArea>
                </div>
            </div>
            <div className={this.state.class_name} style={{ display: this.state.display }}>
                <h1>活动详情</h1>
                <div>
                    <span>{service.desc}</span>
                </div>

            </div>
            <div className="buttomContant" onClick={service.onClick}>
                <h1>{this.state.text}<span><img src={Down} alt="" /></span></h1>
            </div>
        </div>
    }
}
export default TrainView
