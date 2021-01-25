import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { authorizedRequestHandler } from 'common/utils';
import { useHistory } from 'react-router-dom';
import RequiredSelect from './components/RequiredSelect';
import { toast } from 'react-toastify';
import OfferForm from './components/OfferForm';
import ImageUploader from './components/ImageUploader';
import EditableImagesPreviews from './components/EditableImagesPreviews';

const EditOfferDraftStageOnePage = (props) => {

    const offerId = props.match.params.id;
    const history = useHistory();

    const [images, setImages] = useState([]);

    const [loadState, setLoadState] = useState({
        loadingOffers: true,
        loadingCategories: true
    });
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [offer, setOffer] = useState({});

    useEffect(() => {
        const fetchCategories = async () => {
            const action = async () => await axios.get("/offers-api/categories");
            const result = await authorizedRequestHandler(action);

            const categoryOptions = result.map(x => ({
                value: x.id,
                label: x.name
            }));

            setCategoryOptions(categoryOptions);
            setLoadState(prevState => ({ ...prevState, loadingCategories: false }));
        };

        const fetchOffer = async () => {
            const action = async () => await axios.get(`/offers-api/offers/${offerId}/my`);

            await authorizedRequestHandler(action,
                {
                    status: 200,
                    callback: result => {
                        setOffer(result);
                        setLoadState(prevState => ({ ...prevState, loadingOffers: false }));
                        setImages(result.images.map(x => ({ ...x, isRemote: true })));
                    }
                },
                {
                    status: 204,
                    callback: () => setOffer({ loading: false, offer: null })
                }
            );
        };

        fetchCategories();
        fetchOffer();
    }, []);

    const updateCb = async event => {
        event.preventDefault();

        let mainImg = images.find(x => x.isMain);
        if (!mainImg) {
            console.log("Something went wrong. No main image...");
            return;
        }

        let formData = new FormData(event.target);
        formData.append("offerId", offerId);
        
        images.forEach(img => formData.append("images", img.file));

        const imagesMetadata = images.map((img, index) => ({
            imageId: img.id,
            isRemote: img.isRemote,
            isMain: img.isMain,
            sortId: index
        }));
        
        formData.append("imagesMetadata", JSON.stringify(imagesMetadata));

        const action = async () => await axios.put("/offers-api/offers", formData);
        await authorizedRequestHandler(action,
            {
                status: 200,
                callback: async () => {
                    history.push(`/offers/create/draft/${offerId}/stage/2`);
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

    if (loadState.loadingOffers || loadState.loadingCategories) return <></>
    if (!offer) return <h3>There is no such offer</h3>

    const initSelectedCategory = categoryOptions.find(x => x.value === offer.category.id);

    return <>
        <h2 className="mt-2 mb-3">Create Offer</h2>

        <OfferForm onSubmitCb={updateCb} offer={offer}>

            <div className="form-group">
                <label>Category</label>

                <RequiredSelect
                    name="categoryId"
                    initValue={initSelectedCategory}
                    styles={{ menu: provided => ({ ...provided, zIndex: 9999 }), borderColor: "#ccc" }}
                    options={categoryOptions}
                />
            </div>

            <EditableImagesPreviews
                images={images}
                setImages={setImages}
            />

            <ImageUploader
                images={images}
                setImages={setImages}
            />

            <button type="submit" className="btn btn-success btn-block mt-5">
                Go to next step
            </button>
        </OfferForm>
    </>
}


export default EditOfferDraftStageOnePage;