import React from 'react'
import './TrainView.scss'

class TrainView extends React.PureComponent {
    constructor(props) {
            super(props)
    }

    render(){
        return(
        <div>
            <div className="leftcontant">
                <img src="./assets/pic1.png" alt=""/>
            </div>
            <div className="rightcontant">
                <h1>小狮子支援救治集团内部精英成员训练营</h1>
                <h3>￥200+1200蜂币</h3>
                <h5>福州天瑞人力资源有限公司</h5>
                <button>购买</button>
                <button>咨询</button>
            </div>

        </div>
        )
    }
}