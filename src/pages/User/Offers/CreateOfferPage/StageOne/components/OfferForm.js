import React from 'react';

const OfferForm = (props) => {

    const { offer, onSubmitCb = () => { }, children } = props;

    const formOnKeyPress = e => {
        if (e.key === 'Enter') e.preventDefault();
    }

    return <>
        <form onSubmit={onSubmitCb} onKeyPress={formOnKeyPress}>
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
                <label>Total stock</label>
                <input name="totalStock" type="number" className="form-control"
                    min={1} step={1} placeholder="Total stock..."
                    defaultValue={offer?.totalStock} required />
            </div>

            {children}

        </form>
    </>;
}

export default OfferForm;