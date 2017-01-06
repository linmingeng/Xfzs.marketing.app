import { connect } from 'react-redux'
import * as actions from '../modules/lottery'

import LotteryView from '../components/LotteryView'

const mapDispatchToProps = {
    ...actions
}

const mapStateToProps = ({ lottery }, ownProps) => {
    const {
        products,
        productsPagination,
        userWallet,
        drawRecords,
        shippingAddress,
        gloablDrawRecordPagination,
        userDrawRecordPagination,
        shippingAddressPagination } = lottery

    return {
        id: ownProps.location.query.id,
        products: productsPagination.ids.map(id => products[id]) || [],
        userWallet,
        globalDrawRecords: gloablDrawRecordPagination.ids.map(id => drawRecords[id]) || [],
        userDrawRecords: userDrawRecordPagination.ids.map(id => drawRecords[id]) || [],
        shippingAddress: shippingAddressPagination.ids.map(id => shippingAddress[id]) || []
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LotteryView)
