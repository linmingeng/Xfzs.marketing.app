import React from 'react'
import './TrainConsultView.scss'
import {
    Button,
    ButtonArea,
    TextArea,
    Form,
    FormCell,
    CellHeader,
    Label,
    CellBody,
    Input
} from 'react-weui'

class TrainConsultView extends React.PureComponent {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <Form>

                    <div className="topContant ">
                        <span>服务：</span>
                        <h1>小狮子资源救治集团内部精英成员训练营内部精英成员</h1>
                    </div>
                    <FormCell>
                        <CellHeader>
                            <Label className="celllable">姓名</Label>
                        </CellHeader>
                        <CellBody className="cellinput">
                            <Input type="tel" placeholder="请输入名字" />
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label className="celllable">电话</Label>
                        </CellHeader>
                        <CellBody className="cellinput">
                            <Input type="tel" placeholder="请输入名字" />
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label className="celllable">公司</Label>
                        </CellHeader>
                        <CellBody className="cellinput">
                            <Input type="tel" placeholder="请输入名字" />
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label className="celllable">咨询</Label>
                        </CellHeader>
                        <CellBody className="cellinput">
                            <TextArea className="CellTextArea" placeholder="请输入要咨询的内容" rows="5" maxlength="200"></TextArea>
                        </CellBody>
                    </FormCell>
                    {/* <div className="consultContant ">
                        <div className="inputName con">
                            <span>姓名</span>
                            <input type="text" name="username" />
                        </div>
                        <div className="inputPhone con">
                            <span>电话</span>
                            <input type="text" name="userphone" />
                        </div>
                        <div className="inputFirm con">
                            <span>公司</span>
                            <input type="text" name="userfirm" />
                        </div>
                        <div className="inputConsult con">
                            <span className="consult">咨询</span>
                            <TextArea placeholder=" 请输入要咨询的内容" rows="4" maxlength="200"></TextArea>
                        </div>
                    </div> */}
                </Form>
                <div>
                    <ButtonArea direction="horizontal">
                        <Button className="weui-btn_xf weui-btn_xf_mini ">
                            提交
                        </Button>
                    </ButtonArea>
                </div>
            </div >
        )
    }
}

export default TrainConsultView
