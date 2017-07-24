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
    static propTypes = {
        uid: React.PropTypes.object.isRequired,
        // ServiceTitle: React.PropTypes.object.isRequired,
        params: React.PropTypes.object.isRequired,
        services: React.PropTypes.array.isRequired,
        getService: React.PropTypes.func.isRequired,
        workOrder: React.PropTypes.array.isRequired,
        saveWorkOrder: React.PropTypes.func.isRequired
    }

    state = {
        editService: { serviceId: null }
    }
    constructor(props) {
        super(props)
        this.handleOnOk = this.handleOnOk.bind(this)
        this.handleChangeForm = this.handleChangeForm.bind(this)
        // this.show = this.show.bind(this)
        // this.handleChangeForms = this.handleChangeForms.bind(this)
        // this.saveFormToServer = this.saveFormToServer.bind(this)
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
        // const query = location.href
        // console.log(query)
        // console.log(this.state.editService)
        const { services, params, workOrder, uid } = this.props

        // const idd=uid.id
        // const renderName = () => services.filter(m => m.id === uid.id)[0].title
        // console.log(renderName)
        // services.map(p => ({ key: p.id, value: p.title }))
        // for (let i = 0; i < services.length; i++) {
        //     if (uid.id === services[i].id) {
        //         console.log(services[i].title)
        //         // return ServiceTitle
        //     }
        // }
        // const { ServiceTitle } = this.props
        // console.log(this.props)
        // let ServiceTitle = services.map((x) => {
        //     return x.title;
        // })
        return (
            <div>
                <Form>
                    <div className="topContant ">
                        <span>服务：</span>
                        <h1>{

                            services.map((service) => this.renderName(service))
                        }</h1>
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
                            <TextArea className="CellTextArea" placeholder="请输入要咨询的内容" rows="5" maxlength="200" onChange={this.handleChangeForm('Content')}></TextArea>
                        </CellBody>
                    </FormCell>
                </Form>
                <div>
                    <ButtonArea direction="horizontal" >
                        <Button className="weui-btn_xf weui-btn_xf_mini" onClick={this.handleOnOk} >
                            提交
                        </Button>
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
        return 2
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
        // console.log(1111)
        console.log(11111)

        // if (selectedCityGroups.length > 0) {
        //     editAddress.provinceCode = selectedCityGroups[0].code
        //     editAddress.cityCode = selectedCityGroups[1].code
        //     editAddress.areaCode = selectedCityGroups[2].code

        //     onRequestSave(editAddress)
        // }
    }
    // handleSaveVoteTopic(model) {
    //     const { saveService } = this.props

    //     return saveService(model)
    // }

}

export default TrainConsultView
