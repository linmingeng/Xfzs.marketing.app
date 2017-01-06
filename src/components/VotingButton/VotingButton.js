import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Button, Toast } from 'react-weui'
import './VotingButton.scss'

class VotingButton extends React.Component {
    static propTypes = {
        voterId: React.PropTypes.string.isRequired,
        onVoting: React.PropTypes.func.isRequired,
        className: React.PropTypes.string.isRequired
    }

    state = {
        showToast: false
    }

    constructor(props) {
        super(props)

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentWillUnmount() {
        this.toastTimer && clearTimeout(this.state.toastTimer)
    }

    render() {
        return (
            <Button className={this.props.className} onClick={this.handleClick}>
                投票
                <Toast icon="success-no-circle" show={this.state.showToast}>投票成功</Toast>
            </Button>
        )
    }

    handleClick() {
        const { voterId, onVoting } = this.props

        onVoting(voterId, () => {
            this.setState({ showToast: true })

            this.toastTimer = setTimeout(() => {
                this.setState({ showToast: false })
            }, 2000)
        })
    }
}

export default VotingButton
