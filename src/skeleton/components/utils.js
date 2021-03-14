import { Link } from 'react-router-dom';

export function prepareNotificationMessage(props, notification) {

    const displaySize = 35;
    const offerName = notification.metadata.offerName;
    const offerNameDisplay = `${offerName.substr(0, displaySize)}${offerName.length > displaySize ? "..." : ''} `;

    if (notification.code === "CartItemChanged") {
        return <div>

            Offer&nbsp;
            <Link to={`/offers/${notification.metadata.offerId}`}>
                {offerNameDisplay}
            </Link>

            {
                (() => {
                    if (notification.metadata["availableStock"]) return <>
                        is no longer available in the quantity selected by you. Go to offer and add it to cart again.
                    </>
                    if (notification.metadata["price"]) return <>
                        changed price to {parseFloat(notification.metadata["price"]).toFixed(2)} PLN
                    </>
                    return "UNKNOWN NOTIFICATION";
                })()
            }
        </div>
    }
    else return <div>
        {notification.message}
    </div>
}

export function handleNotification(props, notification) {
    if (notification.code === 'CartItemChanged') {
        if (notification.metadata.availableStock) {
            props.removeCartItem(notification.metadata.cartItemId);
        }
    }

    return true;
}