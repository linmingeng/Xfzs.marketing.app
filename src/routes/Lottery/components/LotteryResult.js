import React from 'react'
import { Dialog, Button, ButtonArea } from 'react-weui'
import './LotteryResult.scss'
import { api } from 'services/fetch'
import missImage from './assets/miss.png'

export const LotteryResult = ({ result, onAgain, onCancel }) => {
    const msg = result.isWinning
        ? `恭喜您抽中${result.productName}`
        : '很遗憾！未中奖'

    return <div className="lottery-result">
        <Dialog
            show>
            {
                result.isWinning
                    ? <img src={`${api.imgHost}/250_250_w/${result.image}`} />
                    : <img src={missImage} />
            }
            <h2 className="msg">{msg}</h2>
            <p className="span">{
                result.isPoints
                    ? '蜂币已发放到您的账号请注意查收'
                    : '请尽快确认地址地址,以便您及时收到奖品'
            }</p>
            <ButtonArea direction="horizontal">
                <Button onClick={onCancel} type="default">
                    关闭
                </Button>
                <Button className="weui-btn_xf" onClick={onAgain}>
                    继续
                </Button>
            </ButtonArea>
        </Dialog>
    </div >
}

LotteryResult.propTypes = {
    result: React.PropTypes.object.isRequired,
    onAgain: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired
}

export default LotteryResult
