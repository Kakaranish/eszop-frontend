import { Link } from 'react-router-dom';

export function prepareNotificationMessage(props, notification) {

    const displaySize = 35;

    if (notification.code === "CartItemChanged") {
        const offerName = notification.metadata.offerName;
        const offerNameDisplay = `${offerName.substr(0, displaySize)}${offerName.length > displaySize ? "..." : ''} `;

        return <div>
            Offer&nbsp;
            <Link to={`/offers/${notification.metadata.offerId}`}>
                {offerNameDisplay}
            </Link>
            changed price to {parseFloat(notification.metadata["price"]).toFixed(2)} PLN
        </div>
    }
    if (notification.code === 'CartItemRemoved') {
        const offerName = notification.metadata.offerName;
        const offerNameDisplay = `${offerName.substr(0, displaySize)}${offerName.length > displaySize ? "..." : ''} `;

        return <div>
            Offer&nbsp;
            <Link to={`/offers/${notification.metadata.offerId}`}>
                {offerNameDisplay}
            </Link>
            is no longer available in the quantity selected by you. Go to offer and add it to cart again.
        </div>
    }
    if (notification.code === 'CartItemBecameUnavailable') {
        return <div>
            Offer&nbsp;
            <Link to={`/offers/${notification.metadata.offerId}`}>
                {notification.metadata.offerName}&nbsp;
            </Link>
            has been removed from cart because is no longer available
        </div>
    }
    if (notification.code === 'OfferBecameUnavailable') {
        return <div>
            Order&nbsp;
            <Link to={`/user/shopping/order/${notification.metadata.orderId}`}>
                {notification.metadata.orderId}&nbsp;
            </Link>
            has been cancelled because&nbsp;
            <Link to={`/offers/${notification.metadata.sourceOfferId}`}>
                offer&nbsp;
            </Link>
            has been ended in the meantime
        </div>
    }
    if (notification.code === 'OrderStateChanged') {
        return <div>
            Order&nbsp;
            <Link to={`/user/shopping/order/${notification.metadata.orderId}`}>
                {notification.metadata.orderId}&nbsp;
            </Link>
            has changed status
        </div>
    }
    if (notification.code === 'OrderStarted') {
        return <div>
            User&nbsp;
            <Link to={`/seller/${notification.metadata.buyerId}`}>
                {notification.metadata.buyerId}&nbsp;
            </Link>
            started new&nbsp;
            <Link to={`/user/sale/order/${notification.metadata.orderId}`}>
                order
            </Link>
        </div>
    }
    if (notification.code === 'OrderConfirmed') {
        return <div>
            User&nbsp;
            <Link to={`/seller/${notification.metadata.buyerId}`}>
                {notification.metadata.buyerId}&nbsp;
            </Link>
            confirmed&nbsp;
            <Link to={`/user/sale/order/${notification.metadata.orderId}`}>
                order
            </Link>
        </div>
    }
    if (notification.code === 'OrderCancelledBySeller') {
        return <div>
            Seller cancelled your&nbsp;
            <Link to={`/user/sale/order/${notification.metadata.orderId}`}>
                order
            </Link>
        </div>
    }
    if (notification.code === 'OrderCancelledByBuyer') {
        return <div>
            Buyer cancelled&nbsp;
            <Link to={`/user/sale/order/${notification.metadata.orderId}`}>
                order
            </Link>
        </div>
    }
    if (notification.code === 'OrderCancelled') {
        return <div>
            Order&nbsp;
            <Link to={`/seller/${notification.metadata.orderId}`}>
                {notification.metadata.orderId}&nbsp;
            </Link>
            has been cancelled by administrator
        </div>
    }
    else return <div>
        {notification.message}
    </div>
}

export function handleNotification(props, notification) {
    if (notification.code === 'CartItemRemoved' || notification.code === 'CartItemBecameUnavailable') {
        props.removeCartItem(notification.metadata.cartItemId);
    }
}