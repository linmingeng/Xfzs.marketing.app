import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { api } from 'services/fetch'
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
        this.handleAddDescription = this.handleAddDescription.bind(this)
    }

    static propTypes = {
        onUpload: React.PropTypes.func.isRequired,
        onSubmit: React.PropTypes.func.isRequired,
        getSignup: React.PropTypes.func.isRequired,
        signup: React.PropTypes.object.isRequired,
        topicId: React.PropTypes.string.isRequired
    }

    state = {
        loading: false,
        showShare: false,
        descriptions: [{}]
    }

    mapPropsToState(props) {
        const { signup } = props
        if (signup.id) {
            this.setState({
                name: signup.name,
                phoneNumber: signup.phoneNumber,
                descriptions: signup.descriptions.map(d => {
                    d.url = `${api.imgHost}/75x75_wh/${d.image}`
                    return d
                }),
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
                    {
                        this.state.descriptions
                            .concat(this.state.descriptions)
                            .map((desc, index) => {
                                return index % 2 === 0
                                    ? <FormCell key={index}>
                                        <CellBody>
                                            <Uploader
                                                title={`${index / 2 + 1}.图片上传`}
                                                maxCount={1}
                                                {...this.setDescImageField(index / 2)}
                                                />
                                        </CellBody>
                                    </FormCell>
                                    : <FormCell key={index}>
                                        <CellBody>
                                            <TextArea placeholder="请输入图片介绍" rows="3" maxlength="200"
                                                {...this.setDescTextField((index - 1) / 2)}
                                                disabled={this.state.disabled} />
                                        </CellBody>
                                    </FormCell>
                            })
                    }
                </Form>
                <ButtonArea direction="horizontal">
                    {!this.state.disabled &&
                        <Button type="default" onClick={this.handleAddDescription}>
                            添加图片
                        </Button>
                    }
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
                <Share show={this.state.showShare} content={this.getShareContent()} onHide={this.handleHideShare} />
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

    setDescImageField(index) {
        const description = this.state.descriptions[index]

        return {
            files: description.url ? [description] : [],
            onError: this.handleUploadError,
            onChange: (file) => this.handleUploadChange(index, file),
            onFileClick: (e, file) => this.handleClickImage(index, e, file),
            disabled: this.state.disabled || description.disabled
        }
    }

    setDescTextField(index) {
        const description = this.state.descriptions[index]

        return {
            value: description.text || '',
            onChange: (e) => {
                description.text = e.target.value

                this.setState({ descriptions: this.state.descriptions.concat([]) })
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
        alert(msg)
    }

    handleUploadChange(index, file) {
        const { onUpload } = this.props

        this.setState({ loading: true })

        onUpload(file)
            .then(({ json }) => {
                this.setState({ loading: false })
                if (json.success) {
                    const description = this.state.descriptions[index]

                    description.url = `${api.imgHost}/75x75_wh/${json.url}`
                    description.originalUrl = json.url
                    console.log(index)
                    description.disabled = true

                    this.setState({ descriptions: this.state.descriptions.concat([]) })
                } else {
                    this.showWarn(json.result.message)
                }
            })
    }

    handleClickImage(index, e, file) {
        (!this.state.disabled) && this.setState({ gallery: { url: `${api.imgHost}/${file.originalUrl}`, index } })
    }

    handleDeleteImage() {
        const { gallery, descriptions } = this.state
        const description = descriptions[gallery.index]

        description.url = ''
        description.originalUrl = ''
        description.disabled = false
        this.setState({
            descriptions: descriptions.concat([]),
            gallery: false
        })
    }

    handleSubmit() {
        const descriptions = this.state.descriptions.filter(d => d.originalUrl && d.text).map(d => {
            d.image = d.originalUrl
            return d
        })

        if (this.state.name !== '' &&
            this.state.phoneNumber !== '' &&
            this.state.desc !== '' &&
            descriptions.length > 0) {
            this.props.onSubmit({
                name: this.state.name,
                phoneNumber: this.state.phoneNumber,
                desc: this.state.desc,
                topicId: '',
                descriptions
            }, () => { })
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

    handleAddDescription() {
        let { descriptions } = this.state
        if (descriptions.length >= 10) {
            this.showWarn('最多10张图片')
        } else {
            this.setState({
                descriptions: descriptions.concat([{ url: '', text: '' }])
            })
        }
    }

    getShareContent() {
        const faceDescription = this.props.signup && this.props.signup.descriptions
            ? this.props.signup.descriptions[0]
            : { text: '', image: '' }

        return {
            title: '你回家你旅游我买单',
            desc: faceDescription.text,
            link: `http://${window.location.host}/topic/voter/${this.props.signup.id}?id=${this.props.topicId}`,
            headerimage: `${api.imgHost}/${faceDescription.image}`
        }
    }
}

export default SignupFrom
