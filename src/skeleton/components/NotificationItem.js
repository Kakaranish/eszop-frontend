import React, { useState } from 'react';
import confettiIcon from 'assets/img/confetti.svg';
import closeIcon from 'assets/img/close.svg';
import styled from 'styled-components';
import moment from 'moment';
import AwareComponentBuilder from 'common/AwareComponentBuilder';
import {prepareNotificationMessage} from './utils';

const Styles = styled.div`
.hoverDiv {background: #fff; cursor: pointer;}
.hoverDiv:hover {background: #f5f5f5;}
.imgHolder {width: 30px;}
.notifIcon {width: 30px; cursor: pointer;}
}`

const NotificationItem = (props) => {

    const { notification, isNew, onDeleteNotif } = props;

    const [isHovering, setIsHovering] = useState(false);

    const onMouseEnter = () => {
        setIsHovering(true);
    };

    const onMouseLeave = () => {
        setIsHovering(false);
    };

    return <>
        <Styles>
            <div className={`px-3 py-2 hoverDiv`}
                onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
            >
                <div className="">
                    {
                        isNew &&
                        <div className="d-inline imgHolder">
                            <img src={confettiIcon}
                                style={{ width: '19px' }}
                                alt="my-offers-img"
                            />
                            <span className="text-muted ml-2 mr-2" style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                                NEW
                            </span>
                        </div>
                    }

                    <span className="text-muted" style={{ fontSize: '0.9rem' }}>
                        {moment(notification.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                    </span>

                    {
                        isHovering &&
                        <div className="pull-right" onClick={() => onDeleteNotif(notification.id)}>
                            <img src={closeIcon}
                                style={{ width: '19px' }}
                                alt="my-offers-img"
                            />
                        </div>
                    }

                    {
                        prepareNotificationMessage(props, notification)
                    }
                </div>
            </div>
        </Styles>
    </>
};

export default new AwareComponentBuilder()
    .withCartAwareness()
    .build(NotificationItem);