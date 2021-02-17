import React, { useEffect, useRef, useState } from 'react';
import userIcon from 'assets/img/user.svg';
import profileIcon from 'assets/img/profile.svg';
import bagIcon from 'assets/img/bag.svg';
import plusIcon from 'assets/img/plus.svg';
import AwareComponentBuilder from 'common/AwareComponentBuilder';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SignOutButton from 'skeleton/SignOutButton';

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
        console.log(iconRef);
        if (!wrapperRef.current.contains(event.target) && !iconRef.current.contains(event.target)) {
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

    const Divider = ({ width }) => <div className="dropdown-divider my-0" style={{ borderWidth: width }}></div>

    return <>
        <div className={`btn-group${isExpanded ? ' show' : ''} ${classes}`}>
            <Styles>
                <div ref={iconRef} onClick={userIconClick} aria-haspopup="true" aria-expanded={isExpanded}>
                    <img src={userIcon}
                        className="userIcon"
                        alt="user-img"
                    />
                </div>

                <div ref={wrapperRef} className={`dropdown-menu dropdown-menu-right py-0 ${isExpanded ? 'show' : ''}`}
                    style={{ minWidth: "20vw" }}>
                    <p className="pt-3 px-3">
                        Hello <b>{props.identity.email}</b>
                    </p>

                    <Divider width="3px" />

                    <Link to="/user/profile" className="text-reset">
                        <div className="px-3 py-2 hoverDiv d-flex">
                            <div className="d-inline-flex imgHolder">
                                <img src={profileIcon}
                                    style={{ width: '19px' }}
                                    alt="my-profile-img"
                                />
                            </div>

                            <div className="d-inline-block">
                                My Profile
                            </div>
                        </div>
                    </Link>

                    <Divider width="1.5px" />

                    <Link to="/offers/create" className="text-reset">
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

                    <Link to="/user/offers" className="text-reset">
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

                    <SignOutButton />

                </div>
            </Styles>
        </div>
    </>
};

export default new AwareComponentBuilder()
    .withIdentityAwareness()
    .build(UserIndicator);