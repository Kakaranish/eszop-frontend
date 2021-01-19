import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageUploader from './components/ImageUploader';
import EditableImagesPreviews from './components/EditableImagesPreviews';
import CreateOfferForm from './components/CreateOfferForm';
import { getFormDataJsonFromEvent, requestHandler } from '../../common/utils';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';

const CreateOfferPage = () => {

    const history = useHistory();

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

        const action = async () => await axios.post("/offers-api/offers", formData);
        await requestHandler(action, {
            status: 200,
            callback: async result => {
                history.push(`/offers/${result.offerId}`);
            }
        });
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

            <EditableImagesPreviews images={images} setImages={setImages} />

            <ImageUploader images={images} setImages={setImages} />

            <button type="submit" className="btn btn-success btn-block mt-5">
                Create offer
            </button>
        </CreateOfferForm>
    </>
}


export default CreateOfferPage;