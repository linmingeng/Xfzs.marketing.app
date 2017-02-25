import React from 'react'
import './Countdown.scss'

class Countdown extends React.PureComponent {
    static propTypes = {
        redEnvelopList: React.PropTypes.array.isRequired
    }

    render() {
        const { redEnvelopList } = this.props
        const filters = redEnvelopList
            .filter(r => new Date(r.canTakeTime.replace('T', ' ').replace(/-/g, '/')) > new Date())
        const nextRedEnvelop = filters.length > 0 ? filters[0] : null
        const zfill = (num, fill) => {
            var len = ('' + num).length
            return (Array(
                fill > len ? fill - len + 1 || 0 : 0
            ).join(0) + num)
        }

        if (nextRedEnvelop) {
            const timer = setInterval((function countdown() {
                var endTime = new Date(nextRedEnvelop.canTakeTime.replace('T', ' ').replace(/-/g, '/'))
                return () => {
                    const ele = document.getElementById('countdown')
                    const startTime = new Date().getTime()
                    const diff = endTime - startTime

                    const num1 = zfill(parseInt(diff / 1000 / 60 / 60, 10), 2)
                    const num2 = zfill(parseInt(diff / 1000 / 60 % 60, 10), 2)
                    const num3 = zfill(parseInt(diff / 1000 % 60, 10), 2)
                    const result = `${num1}：${num2}：${num3}`
                    if (diff < 0) {
                        clearInterval(timer)
                        if (ele) window.location.reload()
                    } else {
                        if (ele) ele.innerText = result
                    }
                }
            })(), 1000)
        }

        return (
            <div className="next-red-envelop">
                <p>距离下一轮</p>
                <p id="countdown" className="countdown">{nextRedEnvelop ? '00：00：00' : '没有红包'}</p>
            </div>
        )
    }
}

export default Countdown
