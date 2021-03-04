import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { authorizedRequestHandler, requestHandler } from 'common/utils';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';
import DeleteOfferTrash from '../DeleteOfferTrash';
import EditableImagesPreviews from './components/EditableImagesPreviews';
import ImageUploader from './components/ImageUploader';
import KeyValueTable from './components/KeyValueTable/KeyValueTable';
import OfferForm from './components/OfferForm';
import RequiredSelect from './components/RequiredSelect';

const columnSettings = {
    key: {
        name: "Key",
        inputSettings: {
            type: "text",
            placeholder: "Key..."
        }
    },
    value: {
        name: "Value",
        inputSettings: {
            type: "text",
            placeholder: "Value..."
        }
    }
};

const EditOfferDraftStageOnePage = (props) => {

    const offerId = props.match.params.id;
    const history = useHistory();

    const [images, setImages] = useState([]);
    const [keyValueData, setKeyValueData] = useState();

    const [loadState, setLoadState] = useState({
        loadingOffers: true,
        loadingCategories: true
    });
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [offer, setOffer] = useState({});

    useEffect(() => {
        const fetchCategories = async () => {
            const action = async () => await axios.get("/offers-api/categories");
            const categoriesResult = await requestHandler(action);

            const categoryOptions = categoriesResult.map(cat => ({
                value: cat.id,
                label: cat.name
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
                        if (result.data.publishedAt) {
                            toast.warn("Offer is already published");
                            history.push(`/offers/${offerId}`);
                        }
                        setOffer(result.data);
                        setImages(result.data.images.map(x => ({ ...x, isRemote: true })));
                        setKeyValueData([...result.data.keyValueInfos.map(kvp => ({
                            key: kvp.key,
                            value: kvp.value
                        })), {
                            key: "",
                            value: ""
                        }]);
                        setLoadState(prevState => ({ ...prevState, loadingOffers: false }));
                    }
                },
                {
                    status: 400,
                    callback: () => {
                        setLoadState(prevState => ({ ...prevState, loadingOffers: false }));
                    }
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

        let preparedKeyValueData = keyValueData.filter(x => x.key && x.value);
        formData.append("keyValueInfos", JSON.stringify(preparedKeyValueData));

        const uri = `/offers-api/draft/${offerId}/stage/1`;
        const action = async () => await axios.put(uri, formData);
        await authorizedRequestHandler(action,
            {
                status: 200,
                callback: async () => {
                    history.push(`/offers/create/draft/${offerId}/stage/2`);
                }
            },
            {
                status: 400,
                callback: async () => {
                    toast.error("Your creation request has been rejected");
                }
            }
        );
    };

    if (loadState.loadingOffers || loadState.loadingCategories) return <></>
    if (!offer) return <h3>There is no such offer</h3>

    const initSelectedCategory = categoryOptions.find(x => x.value === offer.category.id);

    return <div className="bg-white container pt-2 pb-4">
        <div className="mt-2 mb-3">
            <h2 style={{ display: 'inline' }}>
                Create Offer
            </h2>
            <span className="ml-2 align-self-center text-secondary">
                (Stage 1 of 2)
            </span>

            <div className="pull-right">
                <DeleteOfferTrash offerId={offerId} />
            </div>
        </div>

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

            <div className="mt-5">
                <div>
                    <div className="mb-3">
                        <h4 className="d-inline">
                            Parameters
                        </h4>

                        <FontAwesomeIcon icon={faQuestionCircle}
                            className="ml-2 align-baseline"
                            style={{ color: 'lightgray', marginLeft: '2px' }}
                            size={'1x'}
                            data-tip="Click enter in last row to add new"
                        />
                    </div>

                    <KeyValueTable
                        data={keyValueData}
                        setData={setKeyValueData}
                        columnSettings={columnSettings}
                    />

                    <div className="col-12 text-secondary">
                        Entries with at least 1 empty value are ignored
                    </div>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col-6">
                    <button type="submit" className="btn btn-outline-success btn-block">
                        Save & Refresh
                    </button>
                </div>

                <div className="col-6">
                    <button type="submit" className="btn btn-success btn-block">
                        Go to stage 2
                    </button>
                </div>
            </div>
        </OfferForm>

        <ReactTooltip />
    </div>
}

export default EditOfferDraftStageOnePage;