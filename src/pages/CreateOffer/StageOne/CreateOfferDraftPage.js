import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import ImageUploader from './components/ImageUploader';
import EditableImagesPreviews from './components/EditableImagesPreviews';
import { authorizedRequestHandler, requestHandler } from 'common/utils';
import { useHistory } from 'react-router-dom';
import RequiredSelect from './components/RequiredSelect';
import { toast } from 'react-toastify';
import OfferForm from './components/OfferForm';

const CreateOfferDraftPage = () => {

    const history = useHistory();

    const [images, setImages] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const action = async () => await axios.get("/offers-api/categories");
            const result = await requestHandler(action);

            const categoryOptions = result.map(x => ({
                value: x.id,
                label: x.name
            }));
            setCategoryOptions(categoryOptions);
        };

        fetch();
    }, []);

    const createOfferCb = async event => {
        event.preventDefault();

        let formData = new FormData(event.target);

        const imagesMetadata = images.map((img, index) => ({
            imageId: img.id,
            isRemote: false,
            isMain: img.isMain,
            sortId: index
        }));
        formData.append("imagesMetadata", JSON.stringify(imagesMetadata));

        images.forEach(img => formData.append("images", img.file));

        const action = async () => await axios.post("/offers-api/offers", formData);
        await authorizedRequestHandler(action,
            {
                status: 200,
                callback: async result => history.push(`/offers/${result.offerId}`)
            },
            {
                status: 400,
                callback: async result => {
                    toast.error("Your creation request has been rejected");
                    console.log(result);
                }
            }
        );
    };

    // For test purposes
    const offerDefaultValues = {
        name: `Offer ${moment.utc().toISOString()}`,
        description: `Offer Description ${moment.utc().toISOString()}`,
        price: Math.floor(Math.random() * (1000 - 20 + 1)) + 20,
        totalStock: Math.floor(Math.random() * (40 - 1 + 1)) + 1
    };

    return <>
        <h2 className="mt-2 mb-3">Create Offer</h2>

        <OfferForm onSubmitCb={createOfferCb} offer={offerDefaultValues}>

            <div className="form-group">
                <label>Category</label>

                <RequiredSelect
                    name="categoryId"
                    styles={{ menu: provided => ({ ...provided, zIndex: 9999 }), borderColor: "#ccc" }}
                    options={categoryOptions}
                />
            </div>

            <EditableImagesPreviews
                images={images}
                setImages={setImages}
            />

            <ImageUploader
                images={images}
                setImages={setImages}
            />

            <button type="submit" className="btn btn-success btn-block mt-5">
                Go to next step
            </button>
        </OfferForm>
    </>
}

export default CreateOfferDraftPage;