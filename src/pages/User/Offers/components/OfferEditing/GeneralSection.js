import React from 'react';
import EditableImagesPreviews from 'pages/User/Offers/components/EditableImagesPreviews';
import ImageUploader from 'pages/User/Offers/components/ImageUploader';
import RequiredSelect from 'pages/User/Offers/components/RequiredSelect';

const GeneralSection = ({state, offer, images, setImages, initCategory}) => {
    return <>
        <div className="bg-white px-4 pt-2 pb-4">
            <div className="form-group">
                <label>Name</label>
                <input name="name" type="text" className="form-control"
                    placeholder="Name..." defaultValue={offer?.name} required />
            </div>

            <div className="form-group">
                <label>Category</label>

                <RequiredSelect
                    name="categoryId"
                    styles={{ menu: provided => ({ ...provided, zIndex: 9999 }), borderColor: "#ccc" }}
                    options={state.categoryOptions}
                    initValue={initCategory}
                />
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

            <EditableImagesPreviews
                images={images}
                setImages={setImages}
            />

            <ImageUploader
                images={images}
                setImages={setImages}
            />

            <div className="form-group mt-3 mb-0">
                <label>Description</label>
                <textarea name="description" type="text" className="form-control"
                    placeholder="Description..." defaultValue={offer?.description} required>
                </textarea>
            </div>
        </div>
    </>
};

export default GeneralSection;