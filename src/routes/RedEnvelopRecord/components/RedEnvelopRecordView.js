import React from 'react'
import {
    Cells,
    CellsTitle,
    Cell,
    CellBody,
    CellFooter
} from 'react-weui'

class RedEnvelopRecordView extends React.PureComponent {
    static propTypes = {
        getMyTakeRecordList: React.PropTypes.func.isRequired,
        takeRecordList: React.PropTypes.array.isRequired,
        params: React.PropTypes.object.isRequired
    }

    componentDidMount() {
        const { getMyTakeRecordList, params } = this.props

        getMyTakeRecordList(params.id)
    }

    render() {
        return (
            <div>
                <CellsTitle>红包记录</CellsTitle>
                <Cells>
                    {
                        this.props.takeRecordList.filter(item => item.value > 0).map(item => (
                            <Cell key={item.id}>
                                <CellBody>
                                    {`${this.typeToText(item.type)}：${item.value}${this.typeToValue(item.type)}`}
                                </CellBody>
                                <CellFooter>
                                    {item.creationTime.replace('T', ' ')}
                                </CellFooter>
                            </Cell>
                        ))
                    }
                    {
                        this.props.takeRecordList.length === 0 &&
                        <Cell>
                            <CellBody>
                                这里什么都没有~
                            </CellBody>
                        </Cell>
                    }
                </Cells>
            </div>
        )
    }

    typeToText(type) {
        switch (type) {
            case 1: return '现金'
            case 3: return '蜂币'
        }
    }

    typeToValue(type) {
        switch (type) {
            case 1: return '元'
            case 3: return '个'
        }
    }
}

export default RedEnvelopRecordView
