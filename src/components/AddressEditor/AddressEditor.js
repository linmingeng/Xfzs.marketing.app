import React from 'react'
import {
    Popup,
    PopupHeader,
    Form,
    FormCell,
    CellBody,
    CellHeader,
    Label,
    Input,
    ButtonArea,
    Button
} from 'react-weui'
import cnCity from './cnCity'
import CityPicker from './CityPicker'

class AddressEditor extends React.PureComponent {
    static propTypes = {
        onRequestClose: React.PropTypes.func.isRequired,
        onRequestSave: React.PropTypes.func.isRequired,
        show: React.PropTypes.bool.isRequired
    }

    state = {
        showCity: false,
        selectedCityGroups: [],
        city: '',
        editAddress: {}
    }

    constructor(props) {
        super(props)

        this.handleChangeForm = this.handleChangeForm.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.handleShowCity = this.handleShowCity.bind(this)
        this.handleHideCity = this.handleHideCity.bind(this)
        this.handleChangeCity = this.handleChangeCity.bind(this)
    }

    render() {
        const { show, onRequestClose } = this.props

        return <Popup
            show={show}
            onRequestClose={onRequestClose}>
            <PopupHeader
                left="关闭"
                right=""
                leftOnClick={onRequestClose}
                rightOnClick={onRequestClose} />
            <Form style={{ marginTop: 0 }}>
                <FormCell>
                    <CellHeader>
                        <Label>收货人</Label>
                    </CellHeader>
                    <CellBody>
                        <Input type="text" placeholder="请输入您的姓名" onChange={this.handleChangeForm('name')} />
                    </CellBody>
                </FormCell>
                <FormCell>
                    <CellHeader>
                        <Label>联系电话</Label>
                    </CellHeader>
                    <CellBody>
                        <Input type="tel" placeholder="请输入您的联系电话" onChange={this.handleChangeForm('phoneNumber')} />
                    </CellBody>
                </FormCell>
                <FormCell>
                    <CellHeader>
                        <Label>选择地区</Label>
                    </CellHeader>
                    <CellBody>
                        <Input
                            type="text"
                            placeholder="请选择您的地区"
                            value={this.state.selectedCityGroups.map(g => g.name).join('')}
                            onClick={this.handleShowCity}
                            readOnly />
                    </CellBody>
                </FormCell>
                <FormCell>
                    <CellHeader>
                        <Label>详细地址</Label>
                    </CellHeader>
                    <CellBody>
                        <Input type="text" placeholder="请输入详细地址" onChange={this.handleChangeForm('fullAddress')} />
                    </CellBody>
                </FormCell>
                <FormCell>
                    <CellHeader>
                        <Label>邮政编码</Label>
                    </CellHeader>
                    <CellBody>
                        <Input type="number" placeholder="请输入邮政编码(可选)" onChange={this.handleChangeForm('zipCode')} />
                    </CellBody>
                </FormCell>
            </Form>
            <ButtonArea>
                <Button className="weui-btn_xf" onClick={this.handleSave}>保存收货地址</Button>
            </ButtonArea>
            <CityPicker
                data={cnCity}
                onCancel={this.handleHideCity}
                onChange={this.handleChangeCity}
                show={this.state.showCity}
                />
        </Popup>
    }

    handleChangeForm(name) {
        return (e) => {
            const { editAddress } = this.state
            editAddress[name] = e.target.value

            this.setState({ editAddress })
        }
    }

    handleSave() {
        const { onRequestSave } = this.props
        const { editAddress, selectedCityGroups } = this.state

        if (selectedCityGroups.length > 0) {
            editAddress.provinceCode = selectedCityGroups[0].code
            editAddress.cityCode = selectedCityGroups[1].code
            editAddress.areaCode = selectedCityGroups[2].code

            onRequestSave(editAddress)
        }
    }

    handleShowCity() {
        this.setState({ showCity: true })
    }

    handleHideCity() {
        this.setState({ showCity: false })
    }

    handleChangeCity(text) {
        this.setState({ selectedCityGroups: text, showCity: false })
    }
}

export default AddressEditor
