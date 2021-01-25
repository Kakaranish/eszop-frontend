import React from 'react';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';

const maxSizeInMB = 2;

const ImageUploader = ({ images, setImages }) => {

    const onChange = event => {
        const file = event.target.files[0];

        if (images.length >= 5) {
            toast.error(`The maximum number of images is 5`);
            return;
        }

        if (!file || !isFileImageType(file)) {
            toast.error(`Selected file is not image`);
            return;
        }

        if (!hasValidSize(file)) {
            toast.error(`Max image size is ${maxSizeInMB}MB`);
            return;
        }

        if (images.some(x => x.file && x.baseFilename === file.name && x.file.size === file.size)) {
            toast.error(`You cannot upload the same image twice`);
            return;
        }

        const id = uuid()
        const fileExt = file.name.substr(file.name.lastIndexOf('.') + 1);
        const filename = `${id}.${fileExt}`;
        const renamedFile = new File([file], filename, { type: file.type })

        const imageObj = {
            id: id,
            uri: URL.createObjectURL(renamedFile),
            file: renamedFile,
            isMain: !!images?.length,
            baseFilename: file.name
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