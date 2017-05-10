import React from 'react'
import './Countdown.scss'

class Countdown extends React.Component {
    static propTypes = {
        redEnvelop: React.PropTypes.object.isRequired,
        skipMinutes: React.PropTypes.any
    }

    timer = null

    componentWillUnmount() {
        this.timer && clearInterval(this.timer)
    }

    render() {
        const { redEnvelop, skipMinutes } = this.props
        // const filters = redEnvelopList
        //     .filter(r => new Date(r.canTakeTime.replace('T', ' ').replace(/-/g, '/')) > new Date())
        // const nextRedEnvelop = filters.length > 0 ? filters[0] : null
        const zfill = (num, fill) => {
            var len = ('' + num).length
            return (Array(
                fill > len ? fill - len + 1 || 0 : 0
            ).join(0) + num)
        }

        let endTime

        if (redEnvelop && redEnvelop.canTakeTime) {
            this.timer && clearInterval(this.timer)

            endTime = new Date(redEnvelop.canTakeTime.replace('T', ' ').replace(/-/g, '/'))

            if (endTime < new Date()) {
                endTime.setMinutes(skipMinutes)
            }

            this.timer = setInterval(() => {
                const ele = document.getElementById('countdown')
                const startTime = new Date().getTime()
                const diff = endTime.getTime() - startTime
                const num1 = zfill(parseInt(diff / 1000 / 60 / 60, 10), 2)
                const num2 = zfill(parseInt(diff / 1000 / 60 % 60, 10), 2)
                const num3 = zfill(parseInt(diff / 1000 % 60, 10), 2)
                const result = `${num1}：${num2}：${num3}`
                if (diff < 0) {
                    clearInterval(this.timer)
                    // if (ele) window.location.reload()
                } else {
                    if (ele) ele.innerText = result
                }
            }, 1000)
        }

        return (
            <div className="next-red-envelop">
                <p>{(endTime - new Date().getTime() < 0) ? '距离结束' : '距离开始'}</p>
                <p id="countdown" className="countdown">{redEnvelop ? '00：00：00' : '没有红包'}</p>
            </div>
        )
    }
}

export default Countdown
