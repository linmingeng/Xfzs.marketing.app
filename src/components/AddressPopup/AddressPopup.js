import React from 'react'
import {
    Popup,
    PopupHeader,
    Form,
    FormCell,
    CellFooter,
    CellBody,
    Radio,
    ButtonArea,
    Button
} from 'react-weui'
import './AddressPopup.scss'

export const AddressPopup = ({ onRequestClose, onRequestOk, onEdit, onChange, show, shippingAddress }) => {
    return <Popup
        className="address-popup"
        show={show}
        onRequestClose={onRequestClose}>
        <PopupHeader
            left="关闭"
            right="确定"
            leftOnClick={onRequestClose}
            rightOnClick={onRequestOk} />
        <Form className="form" radio>
            {
                shippingAddress.map(sa =>
                    <FormCell radio key={sa.id}>
                        <CellBody>
                            <p>{sa.name}:{sa.phoneNumber}</p>
                            <p className="full-address">{`${sa.province}${sa.city}${sa.area}${sa.fullAddress}`}</p>
                        </CellBody>
                        <CellFooter>
                            <Radio name="sa" value={sa.id} onChange={onChange} />
                        </CellFooter>
                    </FormCell>)
            }
        </Form>
        <ButtonArea>
            <Button className="weui-btn_xf" onClick={onEdit}>新增收货地址</Button>
        </ButtonArea>
    </Popup >
}

AddressPopup.propTypes = {
    show: React.PropTypes.bool.isRequired,
    onRequestClose: React.PropTypes.func.isRequired,
    onRequestOk: React.PropTypes.func.isRequired,
    onEdit: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    shippingAddress: React.PropTypes.array.isRequired
}

export default AddressPopup
