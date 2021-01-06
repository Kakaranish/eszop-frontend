import React from 'react';

const CreateOfferForm = ({ offer, onSubmitCb = () => { }, children }) => <>
    <form onSubmit={onSubmitCb}>
        <div className="form-group">
            <label>Name</label>
            <input name="name" type="text" className="form-control"
                placeholder="Name..." defaultValue={offer?.name} required />
        </div>

        <div className="form-group">
            <label>Description</label>
            <input name="description" type="text" className="form-control"
                placeholder="Description..." defaultValue={offer?.description} required />
        </div>

        <div className="form-group">
            <label>Price (PLN)</label>
            <input name="price" type="number" className="form-control"
                min={0} step={0.01} placeholder="Price..."
                defaultValue={offer?.price} required />
        </div>

        <div className="form-group">
            <label>Quantity</label>
            <input name="quantity" type="number" className="form-control"
                min={1} step={1} placeholder="Quantity..."
                defaultValue={offer?.diameter} required />
        </div>

        <div className="form-group">
            <label>CategoryId</label>
            <input name="categoryId" type="text" className="form-control"
                placeholder="Category Id..." defaultValue={offer?.categoryId} required />
        </div>

        {children}

    </form>

</>;

export default CreateOfferForm;