import cancelIcon from 'assets/img/close.svg';
import penIcon from 'assets/img/pen.svg';
import axios from 'axios';
import { authorizedRequestHandler, isFloat } from 'common/utils';
import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';

const EditableDeliveryMethod = ({ deliveryMethod }) => {

    const history = useHistory();
    
    const [state, setState] = useState(deliveryMethod);
    const [initialized, setInitialized] = useState(false);

    const [errors, setErrors] = useState([]);
    const [isBeingEdited, setIsBeingEdited] = useState(false);
    const [stateBeforeEdit, setStateBeforeEdit] = useState();

    const onEdit = () => {
        setIsBeingEdited(true);
        setStateBeforeEdit(state);
    };

    useEffect(() => {
        if (!initialized) {
            setInitialized(true);
            return;
        }

        const validationErrors = [];
        if (!state.name) validationErrors.push("Name cannot be null or empty");
        if (!isFloat(state.price)) validationErrors.push("Price must be number");
        else if (state.price < 0) validationErrors.push("Price cannot be < 0");

        setErrors(validationErrors);
    }, [state]);

    const onUpdate = async () => {
        if (stateBeforeEdit === state) {
            setIsBeingEdited(false);
            return;
        }

        const uri = `/offers-api/delivery-methods/${deliveryMethod.id}`;
        const action = async () => await axios.put(uri, state);

        await authorizedRequestHandler(action,
            {
                status: 200,
                callback: () => {
                    toast.success("Delivery method updated");
                    setIsBeingEdited(false);
                }
            },
            {
                status: 400,
                callback: result => {
                    toast.error(result.data.Message);
                }
            }
        );
    };

    const onDelete = async () => {
        confirmAlert({
            title: 'Are you sure?',
            message: 'Do you want to delete this delivery method?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => await onDeleteYesAction()
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        });
    };

    const onDeleteYesAction = async () => {
        const uri = `/offers-api/delivery-methods/${deliveryMethod.id}`;
        const action = async () => await axios.delete(uri);
        await authorizedRequestHandler(action,
            {
                status: 200,
                callback: () => {
                    toast.success("Delivery method deleted");
                    setIsBeingEdited(false);
                    history.push('/refresh');
                }
            },
            {
                status: 400,
                callback: result => {
                    toast.error(result.data.Message);
                }
            }
        );
    };

    const onCancel = () => {
        setState(stateBeforeEdit);
        setIsBeingEdited(false);
        setErrors([]);
    };

    if (isBeingEdited) return <>
        <div className="border py-3 px-3 mb-3" style={{ backgroundColor: '#fafafa' }}>
            <img src={cancelIcon}
                className="cursor-pointer ml-3 pull-right"
                style={{ width: '15px' }}
                alt="edit-icon"
                data-tip="Cancel"
                onClick={onCancel}
            />

            <div className="mb-1">
                <b>Edit predefined delivery method</b>
            </div>

            <div className="">
                <div className="form-group d-inline-block">
                    <label htmlFor="name">Method name</label>

                    <input id="name" name="name" type="text" className="form-control"
                        value={state.name}
                        style={{ width: '200px' }}
                        placeholder="Method name..."
                        onChange={e => setState(currState => Object.assign({}, currState, { name: e.target.value }))}
                        required
                    />
                </div>

                <div className="ml-2 form-group d-inline-block">
                    <label htmlFor="price">Price (PLN)</label>

                    <input id="price" name="price" type="number" className="form-control"
                        min="0"
                        step="0.01"
                        value={state.price}
                        style={{ width: '100px' }}
                        placeholder="Price"
                        onChange={e => setState(currState => Object.assign({}, currState, { price: e.target.value }))}
                        required
                    />
                </div>

                <button className="btn btn-success mb-1 ml-2 px-3" onClick={onUpdate}>
                    Update
                </button>

                <button className="btn btn-danger mb-1 ml-2 px-3" onClick={onDelete}>
                    Delete
                </button>

                {
                    errors.length > 0 &&
                    <div>
                        {
                            errors.map((error, index) =>
                                <div key={index} className="text-danger">
                                    {error}
                                </div>
                            )
                        }
                    </div>
                }
            </div>

            <ReactTooltip />
        </div>
    </>

    return <>
        <div className="mb-4 d-flex">
            <Link to={`/offers?category=${deliveryMethod.id}`}>
                {state.name} - {state.price.toFixed(2)} PLN
            </Link>

            <img src={penIcon}
                className="cursor-pointer ml-2"
                style={{ width: '15px' }}
                alt="edit-icon"
                data-tip="Edit"
                onClick={onEdit}
            />
        </div>

        <ReactTooltip />
    </>
};

export default EditableDeliveryMethod;