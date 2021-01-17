import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageUploader from '../common/ImageUploader';
import ImagesPreviews from '../common/ImagesPreviews';
import CreateOfferForm from './CreateOfferForm';
import { getFormDataJsonFromEvent, requestHandler } from '../common/utils';
import Select from 'react-select';

const CreateOfferPage = () => {
    const [images, setImages] = useState([]);

    const [selected, setSelected] = useState();
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

    const categoryOptionOnChange = selectedOption => {
        setSelected(selectedOption);
    };

    const createOfferCb = async event => {
        event.preventDefault();

        let formData = new FormData(event.target);
        images.forEach(image => formData.append("images", image.file));

        console.log(getFormDataJsonFromEvent(event));

        try {
            await axios.post("/offers-api/offers", formData, {
                validateStatus: false,
                baseURL: "https://localhost:10000",
                withCredentials: true
            });
        } catch (error) {
            console.log(error);
        }
    };

    return <>
        <CreateOfferForm onSubmitCb={createOfferCb}>

            <div className="form-group">
                <label>Category</label>
                <input name="categoryId" value={selected?.value ?? ""} readOnly hidden />
                <Select options={categoryOptions}
                    onChange={categoryOptionOnChange}
                    isClearable={true}
                    styles={{ menu: provided => ({ ...provided, zIndex: 9999 }) }}
                />
            </div>

            <ImagesPreviews images={images} setImages={setImages} />

            <ImageUploader images={images} setImages={setImages} />

            <button type="submit" className="btn btn-success btn-block mt-5">
                Create offer
            </button>
        </CreateOfferForm>
    </>
}


export default CreateOfferPage;