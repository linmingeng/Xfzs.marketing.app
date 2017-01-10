import React from 'react'
import './LotteryView.scss'
import { api } from 'services/fetch'
import Turntable from './Turntable'
import LotteryResult from './LotteryResult'
import GlobalDrawRecord from './GlobalDrawRecord'
import UserDrawRecord from './UserDrawRecord'
import AddressPopup from 'components/AddressPopup'
import AddressEditor from 'components/AddressEditor'
import Share from 'components/Share'

class LotteryView extends React.PureComponent {
    static propTypes = {
        id: React.PropTypes.string.isRequired,
        products: React.PropTypes.array.isRequired,
        globalDrawRecords: React.PropTypes.array.isRequired,
        userDrawRecords: React.PropTypes.array.isRequired,
        userWallet: React.PropTypes.object.isRequired,
        shippingAddress: React.PropTypes.array.isRequired,
        getProducts: React.PropTypes.func.isRequired,
        getWallet: React.PropTypes.func.isRequired,
        draw: React.PropTypes.func.isRequired,
        addPoints: React.PropTypes.func.isRequired,
        getGlobalDrawRecords: React.PropTypes.func.isRequired,
        getUserDrawRecords: React.PropTypes.func.isRequired,
        getShippingAddress: React.PropTypes.func.isRequired,
        saveShippingAddress: React.PropTypes.func.isRequired,
        setShippingAddress: React.PropTypes.func.isRequired
    }

    state = {
        result: {},
        showResult: false,
        rotate: false,
        showAddress: false,
        showAddressEditor: false,
        showShare: false
    }

    shareContent = {
        title: '蜂币抽奖 - 小蜂找事',
        desc: '蜂动全城,百分百中奖,百万蜂币等你来抽',
        link: window.location.href,
        headerimage: `${api.imgHost}/f0/f0a3e45b5957dd55916085198212abd3.png`
    }

    constructor(props) {
        super(props)

        this.handleOnRotate = this.handleOnRotate.bind(this)
        this.handleRotate = this.handleRotate.bind(this)
        this.handleToUserRecord = this.handleToUserRecord.bind(this)
        this.handleSetAddress = this.handleSetAddress.bind(this)
        this.handleSelectedAddress = this.handleSelectedAddress.bind(this)
        this.handleSaveeditorAddress = this.handleSaveeditorAddress.bind(this)
        this.handleShowResult = this.handleShowResult.bind(this)
        this.handleAddressPopupOnRequestClose = this.handleAddressPopupOnRequestClose.bind(this)
        this.handleAddressPopupOnEdit = this.handleAddressPopupOnEdit.bind(this)
        this.handleAddressPopupOnChange = this.handleAddressPopupOnChange.bind(this)
        this.handleAddressEditorOnRequestClose = this.handleAddressEditorOnRequestClose.bind(this)
        this.handleShowShare = this.handleShowShare.bind(this)
        this.handleHideShare = this.handleHideShare.bind(this)
    }

    componentDidMount() {
        const { getProducts, getWallet, getGlobalDrawRecords, getUserDrawRecords, id } = this.props

        getProducts(id)
        getWallet()

        getGlobalDrawRecords(id)
        this.timer = setInterval(() => {
            getGlobalDrawRecords(id)
        }, 5000)

        getUserDrawRecords(id)
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer)
    }

    render() {
        const { products,
            userWallet,
            shippingAddress,
            globalDrawRecords,
            userDrawRecords } = this.props

        return (
            <div className="lottery-container">
                <div style={{ position: 'absolute', top: '-100px' }}>
                    {
                        // 这里的代码是为了兼容Turntable组件里的canvas画图
                        products.map(p => <img key={p.id} src={`${api.imgHost}/40_40_w/${p.image}`} id={p.id} />)
                    }
                </div>
                <Turntable
                    products={products}
                    rotate={this.state.rotate}
                    onRotate={this.handleOnRotate} />
                <div className="user-wallet">
                    <h3>我的蜂币{userWallet.points}个</h3>
                    <a className="my-draw-record" href="#userDrawRecord">中奖记录</a>
                    <a className="my-draw-record" onClick={this.handleShowShare}>点击分享</a>
                </div>
                <div className="area-banner" />
                <GlobalDrawRecord
                    drawRecords={globalDrawRecords} />
                <div className="rule">
                    <label className="label-bg">抽奖规则</label>
                    <ul>
                        <li>1.每次抽奖消耗20蜂币</li>
                        <li>2.实物奖品将在7个工作日内寄出</li>
                        <li>3.本活动在法律法规范围内,最终解释权归小蜂找事所有</li>
                    </ul>
                </div>
                <div className="area-banner" />
                <UserDrawRecord
                    drawRecord={userDrawRecords}
                    onSetAddress={this.handleSetAddress} />
                {
                    this.state.showResult && <LotteryResult
                        result={this.state.result}
                        onAgain={this.handleRotate}
                        onCancel={this.handleShowResult} />
                }
                <AddressPopup
                    show={this.state.showAddress}
                    shippingAddress={shippingAddress}
                    onRequestClose={this.handleAddressPopupOnRequestClose}
                    onRequestOk={this.handleSelectedAddress}
                    onEdit={this.handleAddressPopupOnEdit}
                    onChange={this.handleAddressPopupOnChange} />
                <AddressEditor
                    onRequestClose={this.handleAddressEditorOnRequestClose}
                    onRequestSave={this.handleSaveeditorAddress}
                    show={this.state.showAddressEditor} />
                <Share show={this.state.showShare} content={this.shareContent} onHide={this.handleHideShare} />
            </div>
        )
    }

    handleOnRotate(cb) {
        const { draw, id, addPoints, products } = this.props

        draw(id, (json) => {
            if (json.success) {
                const { result } = json

                result.image = products.filter(p => p.id === result.productId)[0].image
                cb(result)

                setTimeout(() => {
                    if (result.isPoints) {
                        addPoints(result.points)
                    }

                    this.setState({
                        showResult: true,
                        result
                    })
                }, 7000)
            }

            this.setState({
                rotate: false
            })
        })
    }

    handleRotate() {
        this.setState({
            rotate: true,
            showResult: false
        })
    }

    handleToUserRecord() {
        document.body.scroll(700)
    }

    handleSetAddress(drawRecord) {
        const { getShippingAddress, shippingAddress } = this.props

        this.setState({ showAddress: true, setAddressDrawRecord: drawRecord })
        if (shippingAddress.length === 0) {
            getShippingAddress()
        }
    }

    handleSelectedAddress() {
        const { setShippingAddress } = this.props
        const { setAddressDrawRecord, selectedAddress } = this.state

        if (selectedAddress) {
            setShippingAddress(setAddressDrawRecord.id, selectedAddress)
            this.setState({ showAddress: false })
        }
    }

    handleSaveeditorAddress(address) {
        const { saveShippingAddress } = this.props

        saveShippingAddress(address)
        this.setState({ showAddressEditor: false, showAddress: true })
    }

    handleShowResult() {
        this.setState({ showResult: false })
    }

    handleAddressPopupOnRequestClose() {
        this.setState({ showAddress: false })
    }

    handleAddressPopupOnEdit() {
        this.setState({ showAddressEditor: true, showAddress: false })
    }

    handleAddressPopupOnChange(e) {
        this.setState({ selectedAddress: e.target.value })
    }

    handleAddressEditorOnRequestClose() {
        this.setState({ showAddressEditor: false, showAddress: true })
    }

    handleHideShare() {
        this.setState({ showShare: false })
    }

    handleShowShare() {
        this.setState({ showShare: true })
    }
}

export default LotteryView
