import React from 'react'
import { Link } from 'react-router'
import Footer from 'components/Footer'
import RegisterForm from './RegisterForm'
import './Register.scss'
import { ButtonArea } from 'react-weui'
import qc from './assets/qc.png'

export const Register = () => {
    return (
        <div>
            <RegisterForm />
            <ButtonArea>
                <Link to="/login" className="login-link">已有账号? 返回登录</Link>
            </ButtonArea>
            <img src={qc} className="qc-img" />
            <p className="qc-download">扫码下载APP</p>
            <p className="qc-download">找事做，招人才，赚赏金，赢蜂币，上小蜂找事</p>
            <p className="qc-code">首次注册推荐码请输入15859196081</p>
            <Footer />
        </div>
    )
}

export default Register
