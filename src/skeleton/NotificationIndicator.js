import { HubConnectionBuilder } from '@microsoft/signalr';
import notifIcon from 'assets/img/notification.svg';
import AwareComponentBuilder from 'common/AwareComponentBuilder';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import NotificationItem from './components/NotificationItem';
import { handleNotification } from './components/utils';


const Styles = styled.div`
.clearAllHoverDiv {background: lightgray; cursor: pointer;}
.clearAllHoverDiv:hover {background: smokewhite;}
.imgHolder {width: 30px;}
.notifIcon {width: 30px; cursor: pointer;}
.dropdown-menu {         
    max-height: 40vh;
    overflow-y: auto;
  }
}`

const NotificationIndicator = (props) => {

    const { classes } = props;

    const wrapperRef = useRef(null);
    const iconRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [connection, setConnection] = useState(null);
    const [notReadNotifications, setNotReadNotifications] = useState({});

    useEffect(() => {
        document.removeEventListener("click", handleClickOutside, false)

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

        if (!props.notifications) props.clearNotifications();

        connection.on('ReceiveNotification', notification => {
            if (handleNotification(props, notification)) {
                toast.info("New notification. Click bell to see it.");
                props.addNotification(notification);
            }
        });

        connection.on('SeedNotifications', notifications => {
            props.setNotifications(notifications);
        });
    }, [connection]);

    const handleClickOutside = async event => {
        if (wrapperRef?.current && iconRef?.current && !wrapperRef.current.contains(event.target) &&
            !iconRef.current.contains(event.target)) {
            setIsExpanded(exp => !exp);
            document.removeEventListener("click", handleClickOutside, false);
        }
    };

    const notifIconClick = () => {
        if (!isExpanded) {
            document.addEventListener("click", handleClickOutside, false)
            setIsExpanded(exp => !exp);
        }

        connection.send("ReadAllNotifications");

        let notReadArr = props.notifications.filter(x => !x.isRead).map(x => x.id);
        setNotReadNotifications(notReadArr.reduce((acc, curr) => (acc[curr] = true, acc), {}));

        let currentNotifs = props.notifications;
        currentNotifs.forEach(notif => notif.isRead = true);
        props.setNotifications(currentNotifs);
    };

    const onDeleteNotification = notifId => {
        props.removeNotification(notifId);
        connection.send("DeleteNotification", notifId);
    };

    const onDeleteAllNotifs = () => {
        props.clearNotifications();
        connection.send("DeleteAllNotifications");
    };

    const Divider = ({ width }) => <div className="dropdown-divider my-0" style={{ borderWidth: width }}></div>

    return <>

        <div className={`btn-group${isExpanded ? ' show' : ''} ${classes}`}>
            <Styles>
                <div ref={iconRef} onClick={notifIconClick} aria-haspopup="true" aria-expanded={isExpanded}>
                    <img src={notifIcon}
                        className="notifIcon invertedSvg"
                        alt="notif-img"
                    />

                    {
                        props.notifications?.filter(x => !x.isRead).length > 0 &&
                        <span className="badge badge-danger align-top" style={{ height: "18px" }}>
                            {props.notifications.filter(x => !x.isRead).length}
                        </span>
                    }
                </div>

                <div ref={wrapperRef} className={`dropdown-menu dropdown-menu-right py-0 ${isExpanded ? 'show' : ''}`}
                    style={{ minWidth: "30vw", position: 'absolute' }}>

                    {
                        props.notifications?.length > 0

                            ? <>
                                {
                                    props.notifications.map(notif =>
                                        <NotificationItem
                                            key={notif.id}
                                            notification={notif}
                                            isNew={notReadNotifications[notif.id]}
                                            onDeleteNotif={onDeleteNotification}
                                        />
                                    )
                                }

                                <div className="px-3 py-2 clearAllHoverDiv text-center" onClick={onDeleteAllNotifs}>
                                    <b>Clear all</b>
                                </div>
                            </>

                            : <>
                                <div className="px-3 py-4 text-center">
                                    <b>You have no notifications</b>
                                </div>
                            </>
                    }
                </div>
            </Styles>
        </div>
    </>
};

export default new AwareComponentBuilder()
    .withNotificationsAwareness()
    .withCartAwareness()
    .build(NotificationIndicator);