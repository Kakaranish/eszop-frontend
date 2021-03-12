import { HubConnectionBuilder } from '@microsoft/signalr';
import notifIcon from 'assets/img/notification.svg';
import AwareComponentBuilder from 'common/AwareComponentBuilder';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const Styles = styled.div`
.hoverDiv {background: #fff; cursor: pointer;}
.hoverDiv:hover {background: #f5f5f5;}
.imgHolder {width: 30px;}
.notifIcon {width: 30px; cursor: pointer;}
}`

const NotificationIndicator = (props) => {

    const { classes } = props;

    const history = useHistory();

    const wrapperRef = useRef(null);
    const iconRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false);

    const [connection, setConnection] = useState(null);

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
            toast.success("TODO: Received some notif");
            props.addNotification("Blah blah blah");
        });
    }, [connection]);

    const handleClickOutside = async event => {
        if (wrapperRef?.current && iconRef?.current && !wrapperRef.current.contains(event.target) && 
            !iconRef.current.contains(event.target)) {
            setIsExpanded(exp => !exp);
            document.removeEventListener("click", handleClickOutside, false);
            props.clearNotifications();
        }
    };

    const notifIconClick = () => {
        if (!isExpanded) {
            document.addEventListener("click", handleClickOutside, false)
            setIsExpanded(exp => !exp);
        }
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
                        props.notifications?.length > 0 &&
                        <span className="badge badge-danger align-top" style={{ height: "18px" }}>
                            {props.notifications.length}
                        </span>
                    }
                </div>

                <div ref={wrapperRef} className={`dropdown-menu dropdown-menu-right py-0 ${isExpanded ? 'show' : ''}`}
                    style={{ minWidth: "30vw", position: 'absolute' }}>
                    <p className="pt-3 px-3">
                        PLACEHOLDER FOR NOTIFS
                    </p>
                </div>
            </Styles>
        </div>
    </>
};

export default new AwareComponentBuilder()
    .withNotificationsAwareness()
    .build(NotificationIndicator);