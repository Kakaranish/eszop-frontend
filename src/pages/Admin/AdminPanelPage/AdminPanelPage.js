import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import layerIcon from 'assets/img/layer.svg';
import usersIcon from 'assets/img/users.svg';

const Styles = styled.div`
.hoverDiv:hover {background: #d9d9d9; cursor: pointer;}
.boxStyle {height: 100px;}
.linkStyle {text-decoration: inherit; color: inherit;}
}`

const AdminPanelPage = () => {
    return <>
        <Styles>
            <div className="row">
                <Link className="col-lg-4 cursor-pointer linkStyle" to="/admin/categories">
                    <div className="d-flex align-items-center border rounded px-4 hoverDiv boxStyle">
                        <img src={layerIcon}
                            style={{ width: '40px' }}
                            alt="create-offer-img"
                        />
                        <h5 className="d-inline-block ml-4">
                            Manage Categories
                        </h5>
                    </div>
                </Link>

                <Link className="col-lg-4 cursor-pointer linkStyle" to="/admin/users">
                    <div className="d-flex align-items-center border rounded px-4 hoverDiv boxStyle">
                        <img src={usersIcon}
                            style={{ width: '40px' }}
                            alt="create-offer-img"
                        />
                        <h5 className="d-inline-block ml-4">
                            Manage Users
                        </h5>
                    </div>
                </Link>
            </div>
        </Styles>
    </>
};

export default AdminPanelPage;