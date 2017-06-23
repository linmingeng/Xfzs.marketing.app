import React from 'react'
import './IndexView.scss'
import Nav from 'components/Nav'
import shop from './assets/shop.png'
import lottery from './assets/lottery.png'
import redPacket from './assets/redPacket.png'
import canvass from './assets/canvass.png'
import brand from './assets/brand.png'
import businessSpace from './assets/businessSpace.png'
import fiscalTaxation from './assets/fiscalTaxation.png'
import fiveInsurance from './assets/fiveInsurance.png'
import health from './assets/health.png'
import HRO from './assets/HRO.png'
import legalCounsel from './assets/legalCounsel.png'
import train from './assets/train.png'


export const IndexView = (props, context) => {
        const query = location.href.split('?')[1] || ''

        const icons = [{
                icon: < img src = { lottery }/>,
                label: '蜂狂抽奖',
                onClick: () => { location.href = 'http://shop.hxzcgf.cn/?' + query }
            },
            {
                icon: < img src = { redPacket }/>,
                label: '蜂抢红包',
                onClick: () => { location.href = 'http://shop.hxzcgf.cn/?' + query }
            },
            {
                icon: < img src = { canvass }/>,
                label: '蜂拥拉票',
                onClick: () => { location.href = 'http://shop.hxzcgf.cn/?' + query }
            },
            {
                icon: < img src = { shop }/>,
                label: '蜂币商城',
                onClick: () => { location.href = 'http://shop.hxzcgf.cn/?' + query }
            },
            {
                icon: < img src = { train }/>,
                label: '培训活动',
                onClick: () => { location.href = 'train/index' }
            },
            {
                icon: < img src = { health }/>,
                label: '体检福利',
                onClick: () => { location.href = 'http://shop.hxzcgf.cn/?' + query }
            },
            {
                icon: < img src = { HRO }/>,
                label: '人事外包',
                onClick: () => { location.href = 'http://shop.hxzcgf.cn/?' + query }
            },
            {
                icon: < img src = { businessSpace }/>,
                label: '众创空间',
                onClick: () => { location.href = 'http://shop.hxzcgf.cn/?' + query }
            },
            {
                icon: < img src = { fiveInsurance }/>,
                label: '五险一金',
                onClick: () => { location.href = 'http://shop.hxzcgf.cn/?' + query }
            },
            {
                icon: < img src = { fiscalTaxation }/>,
                label: '财税代办',
                onClick: () => { location.href = 'http://shop.hxzcgf.cn/?' + query }
            },
            {
                icon: < img src = { legalCounsel }/>,
                label: '法律顾问',
                onClick: () => { location.href = 'http://shop.hxzcgf.cn/?' + query }
            },
            {
                icon: < img src = { brand }/>,
                label: '专利商标',
                onClick: () => { location.href = 'http://shop.hxzcgf.cn/?' + query }
            }
        ]

        return (<div className="index-view">
            <img className="banner" src="http://api.shop.hxzcgf.cn/Assets/upload/2016/11/10/赚蜂币，抢豪礼1478770496.png" />
            <div className="navs-wapper"><Nav navs={icons} /></div>
            </div>)
        }

        IndexView.propTypes = {}

        IndexView.contextTypes = {
            router: React.PropTypes.object.isRequired
        }

        export default IndexView