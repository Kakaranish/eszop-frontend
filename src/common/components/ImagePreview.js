import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const ImagePreview = ({ uri }) => {

    const [isOpen, setIsOpen] = useState(false);

    return <>
        <div className="card mb-2">
            <div className="square cursor-pointer"
                style={{ cursor: 'pointer' }, { backgroundImage: `url(${uri})` }}
                onClick={() => setIsOpen(true)}>
            </div>
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