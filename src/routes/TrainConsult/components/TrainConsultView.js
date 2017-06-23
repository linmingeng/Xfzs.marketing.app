import React from 'react'
import './TrainConsultView.scss'
import { Button ,ButtonArea} from 'react-weui'

class TrainConsultView extends React.PureComponent {
    constructor(props) {
            super(props)
    }
    render(){
        return(
              <div>
                            <div className="topContant ">
                                <span>服务：</span>
                                <h1>小狮子资源救治集团内部精英成员训练营内部精英成员</h1>
                            </div>
                            <div className="consultContant ">
                                <div className="inputName con">
                                    <span>姓名</span>
                                    <input type="text"  name="username"/>
                                </div>
                                <div className="inputPhone con">
                                    <span>电话</span>
                                    <input type="text"  name="userphone"/>
                                </div>
                                <div className="inputFirm con">
                                    <span>公司</span>
                                    <input type="text"  name="userfirm"/>
                                </div>
                                <div className="inputConsult con">
                                    <span className="consult">咨询</span>
                                    <textarea name="userconsult" id="" cols="30" rows="10"></textarea>
                                </div>
                            </div>
                            <div>
                                <ButtonArea direction="horizontal">
                                    <Button className="weui-btn_xf weui-btn_xf_mini ">
                                        提交
                                    </Button>
                                </ButtonArea>
                            </div>
                        </div>
        )
    }
}

export default TrainConsultView