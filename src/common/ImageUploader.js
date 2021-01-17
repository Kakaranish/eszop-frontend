import React from 'react';
import { v4 as uuid } from 'uuid';

const maxSizeInMB = 2;

const ImageUploader = ({ images, setImages }) => {

    const onChange = event => {
        const file = event.target.files[0];
        if (!file || !isFileImageType(file)) {
            // toast.error(`Selected file is not image`);
            return;
        }
        if (!hasValidSize(file)) {
            // toast.error(`Max image size is ${maxSizeInMB}MB`);
            return;
        }

        const imageObj = {
            id: uuid(),
            uri: URL.createObjectURL(file),
            file: file
        };

        setImages([...images, imageObj]);
    };

    return <>
        <div className="custom-file">
            <input className="custom-file-input" type="file" onChange={onChange} accept="image/*" />
            <label className="custom-file-label" htmlFor="uploadedFile">Choose image</label>
        </div>
    </>;
};

/**
 * @param {File} file 
 */
const isFileImageType = file => {
    const fileType = file.type;
    const validImageTypes = ['image/jpeg', 'image/png'];
    return validImageTypes.includes(fileType);
}

/**
 * @param {File} file 
 */
const hasValidSize = file => file.size / 1024 / 1024 < maxSizeInMB;

export default ImageUploader;