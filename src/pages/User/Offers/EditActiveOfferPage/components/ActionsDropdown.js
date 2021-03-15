import trashIcon from 'assets/img/delete.svg';
import downArrowIcon from 'assets/img/down-arrow.svg';
import finishIcon from 'assets/img/finish.svg';
import axios from 'axios';
import { authorizedRequestHandler } from 'common/utils';
import React, { useEffect, useRef, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useHistory } from 'react-router';
import styled from 'styled-components';

const Styles = styled.div`
.hoverDiv {background: #f2f2f2; cursor: pointer;}
.hoverDiv:hover {background: #ffffff;}
.imgHolder {width: 20px;}
.dropdownIcon {width: 20px; cursor: pointer;}
}`

const ActionsDropdown = (props) => {

    const { offerId } = props;

    const history = useHistory();

    const wrapperRef = useRef(null);
    const iconRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        document.removeEventListener("click", handleClickOutside, false)
    }, []);

    const handleClickOutside = async event => {
        if (wrapperRef?.current && iconRef?.current && !wrapperRef.current.contains(event.target) &&
            !iconRef.current.contains(event.target)) {
            setIsExpanded(exp => !exp);
            document.removeEventListener("click", handleClickOutside, false);
        }
    };

    const dropdownIconClick = () => {
        if (!isExpanded) {
            document.addEventListener("click", handleClickOutside, false)
            setIsExpanded(exp => !exp);
        }
    };

    const onEndClick = async () => {
        confirmAlert({
            title: 'Are you sure?',
            message: 'Do you want to end offer?',
            buttons: [
                { label: 'Yes', onClick: async () => await onEndYes() },
                { label: 'No', onClick: () => { } }
            ]
        });
    };

    const onEndYes = async () => {
        const uri = `/offers-api/offers/${offerId}/end`;
        const action = async () => await axios.post(uri);
        await authorizedRequestHandler(action,
            {
                status: 200,
                callback: () => {
                    history.push(`/offers/${offerId}`);
                }
            }
        );
    };

    const onDeleteClick = async () => {
        confirmAlert({
            title: 'Are you sure?',
            message: 'Do you want to DELETE offer?',
            buttons: [
                { label: 'Yes', onClick: async () => await onDeleteYes() },
                { label: 'No', onClick: () => { } }
            ]
        });
    };

    const onDeleteYes = async () => {
        // TODO:
    };

    const Divider = ({ width }) => <div className="dropdown-divider my-0" style={{ borderWidth: width }}></div>

    return <>
        <div className={`btn-group${isExpanded ? ' show' : ''}`}>
            <Styles>
                <div ref={iconRef} onClick={dropdownIconClick} aria-haspopup="true" aria-expanded={isExpanded}>
                    <img src={downArrowIcon}
                        className="dropdownIcon"
                        alt="actions-img"
                    />

                    {
                        props.notifications?.length > 0 &&
                        <span className="badge badge-danger align-top" style={{ height: "18px" }}>
                            {props.notifications.length}
                        </span>
                    }
                </div>

                <div ref={wrapperRef} className={`dropdown-menu dropdown-menu-right py-0 ${isExpanded ? 'show' : ''}`}
                    style={{ minWidth: "15vw", position: 'absolute' }}>

                    <div className="px-3 py-2 hoverDiv d-flex" onClick={onEndClick}>
                        <div className="d-inline-flex imgHolder mr-3">
                            <img src={finishIcon}
                                style={{ width: '19px' }}
                                alt="my-profile-img"
                            />
                        </div>

                        <div className="d-inline-block">
                            End Offer
                        </div>
                    </div>

                    <Divider width="1.5px" />

                    <div className="px-3 py-2 hoverDiv d-flex" onClick={onDeleteClick}>
                        <div className="d-inline-flex imgHolder mr-3">
                            <img src={trashIcon}
                                style={{ width: '19px' }}
                                alt="my-profile-img"
                            />
                        </div>

                        <div className="d-inline-block">
                            Delete Offer
                        </div>
                    </div>
                </div>
            </Styles>
        </div>
    </>
};

export default ActionsDropdown;