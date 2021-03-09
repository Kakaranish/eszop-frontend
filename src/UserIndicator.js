import bagIcon from 'assets/img/bag.svg';
import invoiceIcon from 'assets/img/invoice.svg';
import plusIcon from 'assets/img/plus.svg';
import accountSettingsIcon from 'assets/img/settings.svg';
import userIcon from 'assets/img/user.svg';
import toolsIcon from 'assets/img/tools.svg';
import AwareComponentBuilder from 'common/AwareComponentBuilder';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from 'skeleton/SignOutButton';
import styled from 'styled-components';

const Styles = styled.div`
.hoverDiv {background: #fff; cursor: pointer;}
.hoverDiv:hover {background: #f5f5f5;}
.imgHolder {width: 30px;}
.userIcon {width: 30px; cursor: pointer;}
}`

const UserIndicator = (props) => {

    const { classes } = props;
    const wrapperRef = useRef(null);
    const iconRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => () =>
        document.removeEventListener("click", handleClickOutside, false), []);

    const handleClickOutside = async event => {
        if (wrapperRef?.current && iconRef?.current &&
            !wrapperRef.current.contains(event.target) && !iconRef.current.contains(event.target)) {
            setIsExpanded(exp => !exp);
            document.removeEventListener("click", handleClickOutside, false);
        }
    };

    const userIconClick = () => {
        if (!isExpanded) {
            document.addEventListener("click", handleClickOutside, false)
            setIsExpanded(exp => !exp);
        }
    };

    const onClickReset = () => {
        document.addEventListener("click", handleClickOutside, false)
        setIsExpanded(exp => !exp);
    }

    const Divider = ({ width }) => <div className="dropdown-divider my-0" style={{ borderWidth: width }}></div>

    return <>
        <div className={`btn-group${isExpanded ? ' show' : ''} ${classes}`}>
            <Styles>
                <div ref={iconRef} onClick={userIconClick} aria-haspopup="true" aria-expanded={isExpanded}>
                    <img src={userIcon}
                        className="userIcon invertedSvg"
                        alt="user-img"
                    />
                </div>

                <div ref={wrapperRef} className={`dropdown-menu dropdown-menu-right py-0 ${isExpanded ? 'show' : ''}`}
                    style={{ minWidth: "20vw", position: 'absolute' }}>
                    <p className="pt-3 px-3">
                        Hello <b>{props.identity.email}</b>
                    </p>

                    <Divider width="3px" />

                    <Link to="/offers/create" className="text-reset" onClick={onClickReset}>
                        <div className="px-3 py-2 hoverDiv d-flex">
                            <div className="d-inline-flex imgHolder">
                                <img src={plusIcon}
                                    style={{ width: '18px' }}
                                    alt="create-offer-img"
                                />
                            </div>
                            <div className="d-inline-block">
                                Create Offer
                            </div>
                        </div>
                    </Link>

                    <Link to="/user/offers" className="text-reset" onClick={onClickReset}>
                        <div className="px-3 py-2 hoverDiv d-flex">
                            <div className="d-inline-flex imgHolder">
                                <img src={bagIcon}
                                    style={{ width: '19px' }}
                                    alt="my-offers-img"
                                />
                            </div>

                            <div className="d-inline-block">
                                My Offers
                            </div>
                        </div>
                    </Link>

                    <Divider width="1.5px" />

                    <Link to="/user/orders" className="text-reset" onClick={onClickReset}>
                        <div className="px-3 py-2 hoverDiv d-flex">
                            <div className="d-inline-flex imgHolder">
                                <img src={invoiceIcon}
                                    style={{ width: '19px' }}
                                    alt="my-offers-img"
                                />
                            </div>

                            <div className="d-inline-block">
                                My Orders
                            </div>
                        </div>
                    </Link>

                    <Divider width="1.5px" />

                    <Link to="/user/settings" className="text-reset" onClick={onClickReset}>
                        <div className="px-3 py-2 hoverDiv d-flex">
                            <div className="d-inline-flex imgHolder">
                                <img src={accountSettingsIcon}
                                    style={{ width: '19px' }}
                                    alt="my-profile-img"
                                />
                            </div>

                            <div className="d-inline-block">
                                Account Settings
                            </div>
                        </div>
                    </Link>

                    {
                        props.identity.role === 'ADMIN' || props.identity.role === 'SUPER_ADMIN' &&
                        <>
                            <Divider width="1.5px" />

                            <Link to="/admin/panel" className="text-reset" onClick={onClickReset}>
                                <div className="px-3 py-2 hoverDiv d-flex">
                                    <div className="d-inline-flex imgHolder">
                                        <img src={toolsIcon}
                                            style={{ width: '19px' }}
                                            alt="my-profile-img"
                                        />
                                    </div>

                                    <div className="d-inline-block">
                                        Admin Panel
                                    </div>
                                </div>
                            </Link>
                        </>
                    }

                    <div onClick={onClickReset}>
                        <SignOutButton />
                    </div>

                </div>
            </Styles>
        </div>
    </>
};

export default new AwareComponentBuilder()
    .withIdentityAwareness()
    .build(UserIndicator);