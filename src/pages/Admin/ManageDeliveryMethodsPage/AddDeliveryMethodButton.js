import cancelIcon from 'assets/img/close.svg';
import axios from 'axios';
import { authorizedRequestHandler, isFloat } from 'common/utils';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';

const AddDeliveryMethodButton = () => {

    const history = useHistory();

    const [state, setState] = useState({
        name: "",
        price: 0
    });
    const [isBeingEdited, setIsBeingEdited] = useState(false);
    const [errors, setErrors] = useState([]);
    const [initialized, setInitialized] = useState(false);

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

    const onSubmit = async () => {
        if(errors.length) {
            toast.warn("Cannot create because of invalid form values");
            return;
        }
        
        const uri = '/offers-api/delivery-methods';
        const action = async () => await axios.post(uri, state);
        await authorizedRequestHandler(action,
            {
                status: 200,
                callback: () => {
                    toast.success("Delivery method created");
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
        setIsBeingEdited(false);
    };

    if (!isBeingEdited) return <>
        <button className="btn btn-success px-3" onClick={() => setIsBeingEdited(true)}>
            Create delivery method
        </button>
    </>

    return <>
        <div className="border py-3 px-3" style={{ backgroundColor: '#fafafa' }}>
            <img src={cancelIcon}
                className="cursor-pointer ml-3 pull-right"
                style={{ width: '15px' }}
                alt="edit-icon"
                data-tip="Cancel"
                onClick={onCancel}
            />

            <div className="mb-1">
                <b>New predefined delivery method</b>
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

                <button className="btn btn-success mb-1 ml-2 px-3" onClick={onSubmit}>
                    Create
                </button>

                {
                    errors.length > 0 && <>
                        <div>
                            {
                                errors.map((error, index) =>
                                    <div key={index} className="text-danger">{error}</div>
                                )
                            }
                        </div>
                    </>
                }
            </div>

            <ReactTooltip />
        </div>
    </>
};

export default AddDeliveryMethodButton;