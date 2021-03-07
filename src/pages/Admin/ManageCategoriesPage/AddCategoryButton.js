import cancelIcon from 'assets/img/close.svg';
import axios from 'axios';
import { authorizedRequestHandler } from 'common/utils';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';

const AddCategoryButton = () => {

    const history = useHistory();

    const [value, setValue] = useState("");
    const [isBeingEdited, setIsBeingEdited] = useState(false);

    const onSubmit = async () => {
        const uri = '/offers-api/categories';
        const data = { name: value };
        const action = async () => await axios.post(uri, data);
        await authorizedRequestHandler(action,
            {
                status: 200,
                callback: () => {
                    toast.success("Category created");
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
            Create category
        </button>
    </>

    return <>
        <div className="form-group border py-3 px-3" style={{backgroundColor: '#fafafa'}}>
            <img src={cancelIcon}
                className="cursor-pointer ml-3 pull-right"
                style={{ width: '15px' }}
                alt="edit-icon"
                data-tip="Cancel"
                onClick={onCancel}
            />

            <div className="mb-1">
                New category
            </div>

            <div className="form-inline">
                <input name="name" type="text" className="form-control d-inline-block"
                    value={value}
                    style={{ width: '200px' }}
                    onChange={e => setValue(e.target.value)}
                    required
                />

                <button className="btn btn-success" onClick={onSubmit}>
                    Create
                </button>
            </div>

            <ReactTooltip />
        </div>
    </>
};

export default AddCategoryButton;