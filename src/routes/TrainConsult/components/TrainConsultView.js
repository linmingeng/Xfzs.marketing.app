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
    Input,
    Dialog
} from 'react-weui'

class TrainConsultView extends React.PureComponent {
    static propTypes = {
        uid: React.PropTypes.object.isRequired,
        params: React.PropTypes.object.isRequired,
        // services: React.PropTypes.array.isRequired,
        getService: React.PropTypes.func.isRequired,
        saveWorkOrder: React.PropTypes.func.isRequired
    }
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    state = {
        editService: { serviceId: null },
        showIOS1: false,
        showIOS2: false,
        style1: {
            buttons: [
                {
                    label: 'Ok',
                    onClick: this.goBack.bind(this)
                }
            ]
        },
        style2: {
            buttons: [
                {
                    label: 'Ok',
                    onClick: this.hideDialog.bind(this)
                }
            ]
        }
    }
    constructor(props) {
        super(props)
        this.handleOnOk = this.handleOnOk.bind(this)
        this.handleChangeForm = this.handleChangeForm.bind(this)
    }
    goBack() {
        const query = location.href.split('//')[1].split('/')[0]
        location.href = `http://${query}/train/index/?id=5`
    }
    hideDialog() {
        this.setState({
            showIOS2: false
        })
    }
    componentDidMount() {
        // console.log(topic.id)
        const { params, getService } = this.props
        // const serviceid = 'serviceid=' + uid.id
        // console.log(params)
        getService(params.id)
        console.log(this.state.editService)
    }
    // handleClick(event) {
    //     // const { id } = event.target
    //     console.log(1)
    // }
    render() {
        // const { services } = this.props
        return (
            <div>
                <Form>
                    <div className="topContant ">
                        <span>服务：</span>
                        <h1>
                            {/* {services.map((service) => this.renderName(service))} */}
                            小狮子救治集团
                        </h1>
                    </div>
                    <FormCell>
                        <CellHeader>
                            <Label className="celllable">姓名</Label>
                        </CellHeader>
                        <CellBody className="cellinput">
                            <Input type="tel" placeholder="请输入名字" onChange={this.handleChangeForm('Name')} />
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label className="celllable">电话</Label>
                        </CellHeader>
                        <CellBody className="cellinput">
                            <Input type="tel" placeholder="请输入电话" onChange={this.handleChangeForm('Mobile')} />
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label className="celllable">公司</Label>
                        </CellHeader>
                        <CellBody className="cellinput">
                            <Input type="tel" placeholder="请输入公司名称" onChange={this.handleChangeForm('CompanyName')} />
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label className="celllable">咨询</Label>
                        </CellHeader>
                        <CellBody className="cellinput">
                            <TextArea className="CellTextArea"
                                placeholder="请输入要咨询的内容" rows="5" maxlength="200"
                                onChange={this.handleChangeForm('Content')} />
                        </CellBody>
                    </FormCell>
                </Form>
                <div>
                    <ButtonArea direction="horizontal" >
                        <Button className="weui-btn_xf weui-btn_xf_mini" onClick={this.handleOnOk} >
                            提交
                        </Button>
                        <Dialog type="ios" title={this.state.style1.title}
                            buttons={this.state.style1.buttons} show={this.state.showIOS1} >
                            上传成功
                        </Dialog>
                        <Dialog type="ios" title={this.state.style2.title}
                            buttons={this.state.style2.buttons} show={this.state.showIOS2} >
                            表单填写不完整。请重新填写
                        </Dialog>
                    </ButtonArea>
                </div>
            </div >
        )
    }
    renderName(service) {
        // const { uid, services } = this.props
        // services.array.forEach(function(element) {
        //     console.log(element)
        // }, this)
        // const { services } = this.props
        // console.log(services)
        // service.map(p => ({ key: p.id, value: p.title }))
        // console.log(service)
        // if (service.id === uid.id) {
        //     return service.title
        // }
        // function isBigEnough(value) {
        //     return value.id >= 10
        // }
        // return service.filter(m => m.id === 24).title
        return '2223232'
    }
    handleChangeForm(name) {
        // console.log(this.state.editService)
        const { uid } = this.props
        return (e) => {
            const { editService } = this.state
            editService[name] = e.target.value
            editService.serviceId = uid.id
            this.setState({ editService })
        }
    }
    handleOnOk() {
        const { saveWorkOrder } = this.props
        const { editService } = this.state
        saveWorkOrder(editService)
        if (editService.CompanyName != null && editService.Mobile != null &&
            editService.Content != null &&
            editService.Name != null) {
            this.setState({ showIOS1: true })
        } else {
            this.setState({ showIOS2: true })
        }
    }
}

export default TrainConsultView
