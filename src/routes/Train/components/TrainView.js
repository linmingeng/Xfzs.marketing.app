import React from 'react'
import './TrainView.scss'
import pic1 from './assets/pic1.png'
import Down from './assets/down.png'
import Up from './assets/up.png'
import './animate.css'
import { Button, ButtonArea } from 'react-weui'
import { Link } from 'react-router'

class TrainView extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state={
            display:'none',
            text:'查看详情',
            image:{Down},
            class_name:'show_conatant'
        }
    }
    show() {
        this.setState({
            display:this.state.display=='block' ? 'none':'block',
            text:this.state.display=='block' ? '查看详情' : '收起内容',
            image:this.state.display=='block' ? {Down}:{Up},
            class_name:this.state.display=='block' ? 'show_conatant animated fadeOut' :'show_conatant animated fadeIn'
          })
    }

    render() {
        return (
            <div>
                <div className="allContant">
                    <div className="traincontain">
                        <div className="leftcontant">
                            <img src= {pic1} alt=""/>
                        </div>
                        <div className="rightcontant">
                            <h1>小狮子支援救治集团内部精英成员训练营</h1>
                            <h3>￥200+1200蜂币</h3>
                            <span>福州天瑞人力资源有限公司</span>
                            <ButtonArea direction="horizontal">
                                <Button className="weui-btn_xf weui-btn_xf_mini left_btn">
                                            购买
                                </Button>
                                        
                                <Link to={`/train/consult`}>
                                    <Button type="default" plain className="weui-btn_xf_mini right_btn">
                                                咨询
                                            </Button>
                                </Link>
                            </ButtonArea>
                        </div>
                    </div>
                    <div className={this.state.class_name} style={{display:this.state.display}}>
                        <h1>活动详情</h1>
                        <div>
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;6月22日，习近平总书记在太原考察了两家企业。太原重工轨道交通设备有限公司车轮车间机声隆隆，
                                        热轧生产线上钢坯烧得通红。总书记沿着高空走廊察看高铁车轮生产流程，了解企业提升轨道交通装备研发、设计、制造能力的情况。
                                        习近平还考察了盾构机生产装备情况，观看了山西省自主创新成果展示。在山西钢科碳材料有限公司，总书记同职工亲切交流，
                                        勉励他们发扬工匠精神，为“中国制造”作出更大贡献。
                            </span>
                        </div>

                    </div>
                    <div className="buttomContant" onClick={this.show.bind(this)}>
                               
                        <h1>{this.state.text}<span><img src={Down} alt=""/></span></h1>
                    </div>
                </div>




                        <div className="allContant">
                            <div className="traincontain">
                                <div className="leftcontant">
                                    <img src={pic1} alt=""/>
                                </div>
                                <div className="rightcontant">
                                    <h1>小狮子支援救治集团内部精英成员训练营</h1>
                                    <h3>￥200+1200蜂币</h3>
                                    <span>福州天瑞人力资源有限公司</span>
                                     <ButtonArea direction="horizontal">
                                        <Button className="weui-btn_xf weui-btn_xf_mini left_btn">
                                            购买
                                        </Button>
                                        <Link to={`/train/consult`}>
                                            <Button type="default" plain className="weui-btn_xf_mini right_btn">
                                                咨询
                                            </Button>
                                        </Link>
                                    </ButtonArea>
                                </div>
                            </div>
                            <div className="buttomContant ">
                               <h1>查看详情<span><img src={Down} alt=""/></span></h1>
                            </div>
                        </div>

                        <div className="allContant">
                            <div className="traincontain">
                                <div className="leftcontant">
                                    <img src={pic1} alt=""/>
                                </div>
                                <div className="rightcontant">
                                    <h1>小狮子支援救治集团内部精英成员训练营</h1>
                                    <h3>￥200+1200蜂币</h3>
                                    <span>福州天瑞人力资源有限公司</span>
                                     <ButtonArea direction="horizontal" className="train_btn_area" >
                                        <Button className="weui-btn_xf weui-btn_xf_mini left_btn">
                                            购买
                                        </Button>
                                         <Link to={`/train/consult`}>
                                            <Button type="default" plain className="weui-btn_xf_mini right_btn">
                                                咨询
                                            </Button>
                                        </Link>
                                    </ButtonArea>
                                </div>
                            </div>
                            <div className="buttomContant">
                               <h1>查看详情<span><img src={Down} alt=""/></span></h1>
                            </div>
                        </div>
                    </div>
        )
    }
}

export default TrainView