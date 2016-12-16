import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Share from 'components/Share'
import './SignupForm.scss'
import {
    ButtonArea,
    Button,
    CellHeader,
    CellBody,
    Form,
    FormCell,
    Input,
    TextArea,
    Label,
    Uploader,
    Toptips,
    Toast,
    Gallery,
    GalleryDelete
} from 'react-weui'

class SignupFrom extends React.Component {
    constructor(props) {
        super(props)

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

        this.handleUploadError = this.handleUploadError.bind(this)
        this.handleUploadChange = this.handleUploadChange.bind(this)
        this.handleDeleteImage = this.handleDeleteImage.bind(this)
        this.handleClickImage = this.handleClickImage.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleShare = this.handleShare.bind(this)
        this.handleHideShare = this.handleHideShare.bind(this)
    }

    static propTypes = {
        onUpload: React.PropTypes.func.isRequired,
        onSubmit: React.PropTypes.func.isRequired,
        getSignup: React.PropTypes.func.isRequired,
        signup: React.PropTypes.object.isRequired
    }

    state = {
        images: [],
        loading: false
    }

    mapPropsToState(props) {
        const { signup } = props
        if (signup.id) {
            this.setState({
                name: signup.name,
                phoneNumber: signup.phoneNumber,
                desc: signup.desc,
                images: [{ url: signup.headerimage }],
                disabled: true
            })

            window.scrollTo(0, document.documentElement.clientHeight)
        }
    }

    componentDidMount() {
        const { signup, getSignup } = this.props

        !signup.id && getSignup()

        this.mapPropsToState(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this.mapPropsToState(nextProps)
    }

    componentWillUnmount() {
        this.warnTimer && clearTimeout(this.warnTimer)
    }

    render() {
        const nameField = this.setField('name')
        const phoneNumberField = this.setField('phoneNumber')
        const descField = this.setField('desc')

        return (
            <div className="signup-form">
                {this.renderGallery()}
                <Form>
                    <FormCell>
                        <CellHeader>
                            <Label>昵称</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="text" placeholder="请输入您的昵称" {...nameField} disabled={this.state.disabled} />
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label>联系电话</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="tel" placeholder="请输入您的联系电话" {...phoneNumberField}
                                disabled={this.state.disabled} />
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellBody>
                            <TextArea placeholder="请输入您的表白宣言" rows="3" maxlength="200" {...descField}
                                disabled={this.state.disabled} />
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellBody>
                            <Uploader
                                title="上传您的头像"
                                maxCount={1}
                                files={this.state.images}
                                onError={this.handleUploadError}
                                onChange={this.handleUploadChange}
                                onFileClick={this.handleClickImage}
                                disabled={this.state.disabled}
                                />
                        </CellBody>
                    </FormCell>
                </Form>
                <ButtonArea>
                    {!this.state.disabled &&
                        <Button className="weui-btn_xf" onClick={this.handleSubmit}>
                            确定报名
                        </Button>
                    }
                    {this.state.disabled &&
                        <Button className="weui-btn_xf" onClick={this.handleShare}>
                            分享拉票
                        </Button>
                    }
                </ButtonArea>
                <Toptips type="default" show={this.state.showWarn}>{this.state.showWarnText}</Toptips>
                <Toast icon="loading" show={this.state.loading}>加载中</Toast>
                <Share show={this.state.showShare} voter={this.props.signup} onHide={this.handleHideShare} />
            </div>
        )
    }

    renderGallery() {
        if (!this.state.gallery) {
            return false
        }

        const handleClick = (e) => {
            e.preventDefault()
            e.stopPropagation()
            this.setState({ gallery: false })
        }

        return (
            <Gallery src={this.state.gallery.url} show onClick={handleClick}>
                <GalleryDelete onClick={this.handleDeleteImage} />
            </Gallery>
        )
    }

    setField(key) {
        return {
            value: this.state[key],
            onChange: (e) => {
                this.setState({ [key]: e.target.value })
            }
        }
    }

    showWarn(text) {
        this.setState({ showWarn: true, showWarnText: text })

        this.warnTimer = setTimeout(() => {
            this.setState({ showWarn: false })
        }, 2000)
    }

    handleUploadError(msg) {
    }

    handleUploadChange(file) {
        const { onUpload } = this.props

        this.setState({ loading: true })

        onUpload(file)
            .then(({ json }) => {
                this.setState({ loading: false })
                if (json.success && json.result.result === 'success') {
                    this.setState({ images: [{ url: json.result.data.absoluteUrl }] })
                } else {
                    this.showWarn(json.result.message)
                }
            })
    }

    handleClickImage(e, file) {
        (!this.state.disabled) && this.setState({ gallery: { url: file.url } })
    }

    handleDeleteImage() {
        this.setState({
            images: [],
            gallery: false
        })
    }

    handleSubmit() {
        if (this.state.name !== '' &&
            this.state.phoneNumber !== '' &&
            this.state.desc !== '' &&
            this.state.images.length > 0) {
            this.props.onSubmit({
                name: this.state.name,
                phoneNumber: this.state.phoneNumber,
                desc: this.state.desc,
                topicId: '',
                headerimage: this.state.images[0].url
            }, () => {
            })
        } else {
            this.showWarn('您的报名信息不完整')
        }
    }

    handleShare() {
        this.setState({ showShare: true })
    }

    handleHideShare() {
        this.setState({ showShare: false })
    }
}

export default SignupFrom
