import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const ImagePreview = ({ image, images, setImages }) => {

    const [isOpen, setIsOpen] = useState(false);

    const onDelete = async () => {
        setImages(images.filter(x => x.id !== image.id))
    };

    return <>
        <div className="card mb-2">
            <img src={image.url} className="card-img-top thumb-img img-fluid"
                style={{ cursor: 'pointer' }}
                onClick={() => setIsOpen(true)} />
            <div className="card-body">
                <button className="btn btn-danger btn-block" onClick={onDelete}>
                    Delete
                </button>
            </div>
        </div>

        {
            isOpen &&
            <Lightbox
                mainSrc={image.url}
                onCloseRequest={() => setIsOpen(false)}
            />
        }
    </>
};

export default ImagePreview;