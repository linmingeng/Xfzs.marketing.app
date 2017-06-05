import React from 'react'
import './Turntable.scss'
import pointerImage from './assets/turntable-pointer.png'
import './wilq32'

class Turntable extends React.PureComponent {
    static propTypes = {
        products: React.PropTypes.array.isRequired,
        onRotate: React.PropTypes.func.isRequired,
        rotate: React.PropTypes.bool.isRequired
    }

    state = {
        isStop: true
    }

    offsetWidth = (document.body.OffsetWidth || document.documentElement.clientWidth) - 20

    constructor(props) {
        super(props)

        this.handleRotate = this.handleRotate.bind(this)
    }

    componentDidUpdate() {
        const { products } = this.props
        const ctx = this.refs.prize.getContext('2d')
        this.rednerPrize(products, ctx)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.rotate) {
            this.handleRotate()
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.products.length === this.props.products.length &&
            nextProps.rotate === this.props.rotate &&
            nextState.isStop === this.state.isStop) {
            return false
        }

        return true
    }

    render() {
        return (
            <div className="turntable-banner">
                <div className="turntable" style={{ height: this.offsetWidth }}>
                    <canvas className="prize-list" ref="prize" width={this.offsetWidth} height={this.offsetWidth} />
                    <img src={pointerImage} className="pointer" onClick={this.handleRotate} />
                </div>
            </div>
        )
    }

    rednerPrize(products, ctx) {
        const turnplate = {
            outsideRadius: (this.offsetWidth - 31) / 2, // 大转盘外圆的半径
            textRadius: (this.offsetWidth - 85) / 2, // 大转盘奖品位置距离圆心的距离
            insideRadius: (this.offsetWidth - 235) / 2, // 大转盘内圆的半径
            startAngle: 0 // 开始角度
        }
        const arc = Math.PI / (products.length / 2)

        // 在给定矩形内清空一个矩形
        ctx.clearRect(0, 0, this.offsetWidth, this.offsetWidth)
        ctx.strokeStyle = '#FFBE04'
        // font 属性设置或返回画布上文本内容的当前字体属性
        ctx.font = 'bold 16px -apple-system-font,Helvetica Neue,sans-serif'

        for (let i = 0; i < products.length; i++) {
            const angle = turnplate.startAngle + i * arc
            ctx.fillStyle = i % 2 === 0 ? '#FFF4D6' : '#FFFFFF'
            ctx.beginPath()
            // arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线用于创建圆或部分圆
            ctx.arc(this.offsetWidth / 2, this.offsetWidth / 2, turnplate.outsideRadius, angle, angle + arc, false)
            ctx.arc(this.offsetWidth / 2, this.offsetWidth / 2, turnplate.insideRadius, angle + arc, angle, true)
            ctx.stroke()
            ctx.fill()

            // 锁画布(为了保存之前的画布状态)
            ctx.save()

            // ----绘制奖品开始----
            ctx.fillStyle = '#E5302F'

            // translate方法重新映射画布上的 (0,0) 位置
            ctx.translate(
                this.offsetWidth / 2 + Math.cos(angle + arc / 2) * turnplate.textRadius,
                this.offsetWidth / 2 + Math.sin(angle + arc / 2) * turnplate.textRadius)

            // rotate方法旋转当前的绘图
            ctx.rotate(angle + arc / 2 + Math.PI / 2)

            var text = products[i].name
            ctx.fillText(text, -ctx.measureText(text).width / 2, 0)

            // img是先在外部先download下
            ctx.drawImage(document.getElementById(products[i].id), -20, 10)

            // 把当前画布返回调整到上一个save状态之前
            ctx.restore()
        }
    }

    handleRotate() {
        if (!this.state.isStop) {
            return
        }

        this.state.isStop = false

        const { onRotate, products } = this.props

        const cfg = {
            angle: 0,
            animateTo: 1800,
            duration: 8000,
            callback: () => {
                this.state.isStop = true
            }
        }

        const wilq32 = new window.Wilq32.PhotoEffect(this.refs.prize, cfg)

        onRotate(result => {
            let index = 0

            for (let i = 0; i < products.length; i++) {
                if (products[i].id === result.productId) {
                    index = i + 1
                }
            }

            let angles = index * (360 / products.length) - (360 / (products.length * 2))
            if (angles < 270) {
                angles = 270 - angles
            } else {
                angles = 360 - angles + 270
            }

            cfg.animateTo = angles + 1800
            // const cfg = {
            //     angle: 0,
            //     animateTo: angles + 1800,
            //     duration: 8000,
            //     callback: () => {
            //         this.state.isStop = true
            //     }
            // }

            // return new window.Wilq32.PhotoEffect(this.refs.prize, cfg)
            wilq32._handleRotation(cfg)
        })
    }
}

export default Turntable
