import cancelIcon from 'assets/img/close.svg';
import penIcon from 'assets/img/pen.svg';
import axios from 'axios';
import { authorizedRequestHandler } from 'common/utils';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';

const EditableCategory = ({ category }) => {

    const [value, setValue] = useState(category.name);
    const [isBeingEdited, setIsBeingEdited] = useState(false);
    const [valueBeforeEdit, setValueBeforeEdit] = useState();

    const onEdit = () => {
        setIsBeingEdited(true);
        setValueBeforeEdit(value);
    }

    const onSubmit = async () => {
        if (valueBeforeEdit === value) {
            setIsBeingEdited(false);
            return;
        }

        const uri = `/offers-api/categories/${category.id}`;
        const data = { name: value };
        const action = async () => await axios.put(uri, data);

        await authorizedRequestHandler(action,
            {
                status: 200,
                callback: () => {
                    toast.success("Category updated");
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

    const onCancel = () => {
        setValue(valueBeforeEdit);
        setIsBeingEdited(false);
    }

    if (isBeingEdited) return <>
        <div className="form-group border py-3 px-3 rounded" style={{ backgroundColor: '#fafafa' }}>

            <img src={cancelIcon}
                className="cursor-pointer ml-3 pull-right"
                style={{ width: '15px' }}
                alt="edit-icon"
                data-tip="Cancel"
                onClick={onCancel}
            />

            <div className="mb-1">
                Edit
            </div>

            <div className="form-inline">
                <input name="name"
                    type="text"
                    className="form-control d-inline-block"
                    value={value}
                    style={{ width: '200px' }}
                    onChange={e => setValue(e.target.value)}
                    required
                />

                <button className="btn btn-success" onClick={onSubmit}>
                    Update
                </button>
            </div>

            <ReactTooltip />
        </div>
    </>

    return <>
        <div className="mb-4 d-flex">
            <Link to={`/offers?category=${category.id}`}>
                {value}
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

export default EditableCategory;