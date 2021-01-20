import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageUploader from './components/ImageUploader';
import EditableImagesPreviews from './components/EditableImagesPreviews';
import CreateOfferForm from './components/CreateOfferForm';
import { requestHandler } from '../../common/utils';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import RequiredSelect from './components/RequiredSelect';
import { toast } from 'react-toastify';

const CreateOfferPage = () => {

    const history = useHistory();

    const [images, setImages] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();
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
        setSelectedCategory(selectedOption);
    };

    const createOfferCb = async event => {
        event.preventDefault();

        let mainImg = images.find(x => x.isMain);
        if (!mainImg) {
            console.log("Something went wrong. No main image...");
            return;
        }

        let formData = new FormData(event.target);
        formData.append("mainImage", mainImg.file);

        let otherImgs = images.filter(x => !x.isMain);
        otherImgs.forEach(img => formData.append("images", img.file));

        const action = async () => await axios.post("/offers-api/offers", formData);
        await requestHandler(action,
            {
                status: 200,
                callback: async result => {
                    history.push(`/offers/${result.offerId}`);
                }
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

    return <>
        <CreateOfferForm onSubmitCb={createOfferCb}>

            <div className="form-group">
                <label>Category</label>

                <RequiredSelect
                    SelectComponent={Select}
                    onChange={categoryOptionOnChange}
                    isClearable={true}
                    required={true}
                    styles={{ menu: provided => ({ ...provided, zIndex: 9999 }), borderColor: "#ccc" }}
                    options={categoryOptions}
                />

                <input id={"name"} name="categoryId" autoComplete={"off"} hidden
                    value={selectedCategory?.value ?? ""} />
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