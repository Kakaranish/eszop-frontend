import React, { useState } from 'react';
import axios from 'axios';
import ImageUploader from '../common/ImageUploader';
import ImagesPreviews from '../common/ImagesPreviews';
import CreateOfferForm from './CreateOfferForm';

const CreateOfferPage = () => {
    const [images, setImages] = useState([]);

    const createOfferCb = async event => {
        event.preventDefault();

        let formData = new FormData(event.target);
        images.forEach(image => formData.append("images", image.file));

        console.log(formData);

        try {
            await axios.post("api/offers", formData, {
                validateStatus: false,
                baseURL: "http://localhost:5000"
            });
        } catch (error) {
            console.log(error);
        }
    }

    return <>
        <div className="offset-3 col-6">

            <CreateOfferForm onSubmitCb={createOfferCb}>

                <ImagesPreviews images={images} setImages={setImages} />

                <ImageUploader images={images} setImages={setImages} />

                <button type="submit" className="btn btn-success btn-block mt-5">
                    Create offer
                </button>
            </CreateOfferForm>
        </div>
    </>
}


export default CreateOfferPage;