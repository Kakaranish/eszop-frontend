import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
                    <div className="d-flex justify-content-center align-items-center border rounded px-4 hoverDiv boxStyle">
                        <h5 className="d-inline-block">
                            Manage Categories
                        </h5>
                    </div>
                </Link>
            </div>
        </Styles>
    </>
};

export default AdminPanelPage;