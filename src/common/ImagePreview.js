import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const ImagePreview = ({ uri }) => {

    const [isOpen, setIsOpen] = useState(false);

    return <>
        <div className="card mb-2">
            <img src={uri} className="card-img-top thumb-img img-fluid"
                style={{ cursor: 'pointer' }}
                onClick={() => setIsOpen(true)} />
        </div>

        {
            isOpen &&
            <Lightbox
                mainSrc={uri}
                onCloseRequest={() => setIsOpen(false)}
            />
        }
    </>
};

export default ImagePreview;