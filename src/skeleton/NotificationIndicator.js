import { HubConnectionBuilder } from '@microsoft/signalr';
import notificationIcon from 'assets/img/notification.svg';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';

const NotificationIndicator = (props) => {

    const { classes } = props;

    const history = useHistory();

    const [connection, setConnection] = useState(null);

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:10000/hubs/notification')
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (!connection) return;

        connection.start()
            .then(() => console.log('Connected!'))
            .catch(e => console.log('Connection failed: ', e));

        connection.on('ReceiveNotification', notification => {
            toast.success("TODO: Received some notif");
        });
    }, [connection]);

    const cartItemsNum = 0; // TODO

    return <>
        <div className={`d-inline ${classes}`}>
            <img src={notificationIcon}
                className="invertedSvg"
                style={{ width: '30px', cursor: 'pointer' }}
                onClick={() => history.push('/cart')}
                alt="cart-img"
            />

            {
                cartItemsNum > 0 &&
                <span className="badge badge-danger align-top" style={{ height: "18px" }}>
                    {cartItemsNum}
                </span>
            }
        </div>
    </>
};

export default NotificationIndicator;