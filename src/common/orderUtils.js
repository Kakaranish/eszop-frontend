export function mapOrderState(orderState) {
    if (orderState === 'STARTED')
        return <span style={{ color: 'goldenrod' }}>Started</span>
    if (orderState === 'IN_PROGRESS')
        return <span style={{ color: 'green' }}>In progress</span>
    if (orderState === 'IN_PREPARATION')
        return <span style={{ color: 'green' }}>In Preparation</span>
    if (orderState === 'SHIPPED')
        return <span style={{ color: 'deepskyblue' }}>Shipped</span>
    if (orderState === 'CANCELLED')
        return <span style={{ color: 'red' }}>Cancelled</span>
    if (orderState === 'CANCELLED_BY_BUYER')
        return <span style={{ color: 'red' }}>Cancelled (by buyer)</span>
    if (orderState === 'CANCELLED_BY_SELLER')
        return <span style={{ color: 'red' }}>Cancelled (by seller)</span>
}

export function mapOrderStateToDescription(orderState) {
    if (orderState === 'STARTED')
        return "Order is started but not confirmed yet";
    if (orderState === 'IN_PROGRESS')
        return "Order is confirmed but seller didn't acknowledge that received money";
    if (orderState === 'IN_PREPARATION')
        return "Seller acknowledged that received money and order is being prepared or is on its way";
    if (orderState === 'SHIPPED')
        return "Order is completed";
    if (orderState === 'CANCELLED')
        return "Order is cancelled";
    if (orderState === 'CANCELLED_BY_BUYER')
        return "Buyer (you) cancelled order";
    if (orderState === 'CANCELLED_BY_SELLER')
        return "Seller cancelled order";
}