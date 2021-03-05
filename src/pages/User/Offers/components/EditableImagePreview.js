import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const EditableImagePreview = (props) => {

    const { imageId, images, setImages } = props;

    const image = images.find(x => x.id === imageId);
    const isMain = image.isMain;

    const [isOpen, setIsOpen] = useState(false);

    const onDelete = async event => {
        event.preventDefault();

        let imagesCopy = [...images];
        imagesCopy = imagesCopy.filter(x => x.id !== image.id)
        if (isMain && imagesCopy?.length) imagesCopy[0].isMain = true;

        setImages(imagesCopy);
    };

    const onSetMain = async event => {
        event.preventDefault();

        let imagesCopy = [...images];
        imagesCopy.forEach(x => x.isMain = false);
        imagesCopy.find(x => x.id === imageId).isMain = true;

        setImages(imagesCopy);
    }

    return <>
        <div className="card mb-2">
            <div>
                {
                    isMain &&
                    <div className="position-absolute w-100 text-center main-img-indicator" >
                        <h5 className="main-img-indicator-text">Main</h5>
                    </div>
                }

                <div className="square cursor-pointer"
                    style={{ cursor: 'pointer' }, { backgroundImage: `url(${image.uri})` }}
                    onClick={() => setIsOpen(true)}>
                </div>
            </div>

            <div className="card-body">
                <div className="row">
                    {
                        isMain &&
                        <div className="col-12">
                            <button className="btn btn-outline-danger btn-block" onClick={onDelete}>
                                Delete
                            </button>
                        </div>
                    }

                    {
                        !isMain && <>
                            <div className="col-6">
                                <button className="btn btn-success btn-block" onClick={onSetMain}>
                                    Set Main
                                </button>
                            </div>

                            <div className="col-6">
                                <button className="btn btn-outline-danger btn-block" onClick={onDelete}>
                                    Delete
                                </button>
                            </div>
                        </>
                    }
                </div>
            </div>

        </div>

        {
            isOpen &&
            <Lightbox
                mainSrc={image.uri}
                onCloseRequest={() => setIsOpen(false)}
            />
        }
    </>
};

export default EditableImagePreview;