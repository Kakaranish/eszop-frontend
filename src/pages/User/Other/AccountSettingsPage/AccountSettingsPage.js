import React from 'react';
import profileIcon from 'assets/img/profile.svg';
import moneyIcon from 'assets/img/money.svg';
import addressIcon from 'assets/img/address.svg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Styles = styled.div`
.hoverDiv:hover {background: #d9d9d9; cursor: pointer;}
.boxStyle {height: 100px;}
.linkStyle {text-decoration: inherit; color: inherit;}
}`

const AccountSettingsPage = () => {
    
    return <>
        <h3 className="mb-3" >
            Account settings
        </h3>

        <Styles>
            <div className="row">
                <Link className="col-lg-4 cursor-pointer linkStyle" to="/user/settings/seller-info">
                    <div className="d-flex align-items-center border rounded px-4 hoverDiv boxStyle">
                        <img src={moneyIcon}
                            style={{ width: '40px' }}
                            alt="create-offer-img"
                        />

                        <h5 className="d-inline-block ml-4">
                            My seller info
                        </h5>
                    </div>
                </Link>

                <Link className="col-lg-4 cursor-pointer linkStyle" to="/user/settings/addresses">
                    <div className="d-flex align-items-center border rounded px-4 hoverDiv boxStyle">
                        <img src={addressIcon}
                            style={{ width: '40px' }}
                            alt="create-offer-img"
                        />

                        <h5 className="d-inline-block ml-4">
                            My delivery addresses
                        </h5>
                    </div>
                </Link>

                <Link className="col-lg-4 cursor-pointer linkStyle" to='/user/settings/profile'>
                    <div className="d-flex align-items-center border rounded px-4 hoverDiv boxStyle">
                        <img src={profileIcon}
                            style={{ width: '40px' }}
                            alt="create-offer-img"
                        />

                        <h5 className="d-inline-block ml-4">
                            My profile
                        </h5>
                    </div>
                </Link>
            </div>
        </Styles>
    </>
};

export default AccountSettingsPage;