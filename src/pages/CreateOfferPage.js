import React, { useState } from 'react';
import axios from 'axios';
import ImageUploader from '../common/ImageUploader';
import ImagesPreviews from '../common/ImagesPreviews';

const CreateOfferPage = () => {
    const [images, setImages] = useState([]);

    const uploadImages = async e => {
        e.preventDefault();

        console.log(images);
        const formData = new FormData();
        images.forEach(image => formData.append("images", image.file));

        try {
            await axios.post("api/offers/upload", formData, {
                validateStatus: false,
                baseURL: "http://localhost:5000"
            })
        } catch (error) {
            console.log(error);
        }
    }

    return <>
        <ImagesPreviews images={images} setImages={setImages} />

        <div className="offset-3 col-6">
            <ImageUploader images={images} setImages={setImages} />
        </div>

        <div className="offset-3 col-6 mt-3">
            <form onSubmit={uploadImages}>
                <button type="submit" className="btn btn-success btn-block">
                    Upload all images
                </button>
            </form>
        </div>
    </>
}


export default CreateOfferPage;