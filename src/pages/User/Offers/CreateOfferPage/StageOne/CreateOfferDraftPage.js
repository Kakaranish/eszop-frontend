import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { authorizedRequestHandler, requestHandler } from 'common/utils';
import moment from 'moment';
import EditableImagesPreviews from 'pages/User/Offers/components/EditableImagesPreviews';
import ImageUploader from 'pages/User/Offers/components/ImageUploader';
import KeyValueTable from 'pages/User/Offers/components/KeyValueTable/KeyValueTable';
import OfferForm from 'pages/User/Offers/components/OfferForm';
import RequiredSelect from 'pages/User/Offers/components/RequiredSelect';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';

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

const CreateOfferDraftPage = () => {

    const history = useHistory();

    const [keyValueData, setKeyValueData] = useState([
        {
            key: '',
            value: ''
        }
    ]);
    const [images, setImages] = useState([]);
    const [state, setState] = useState({ loading: true, canSell: true, categoryOptions: [] });

    useEffect(() => {
        const fetch = async () => {
            const canSellUri = '/identity-api/seller/can-sell';
            const canSellAction = async () => await axios.get(canSellUri);
            const result = await authorizedRequestHandler(canSellAction,
                { status: -1, callback: result => result },
                { status: 200, callback: result => result }
            );
            if (result.status !== 200) {
                toast.warn("Unknown error");
                return;
            }
            if (!result.data) {
                setState({ loading: false, canSell: false });
                return;
            }

            const categoriesUri = async () => await axios.get("/offers-api/categories");
            const categoriesResult = await requestHandler(categoriesUri);

            const categoryOptions = categoriesResult.map(cat =>
                ({ value: cat.id, label: cat.name })
            );
            setState({
                loading: false,
                canSell: true,
                categoryOptions: categoryOptions
            });
        };

        fetch();
    }, []);

    const createOfferCb = async event => {
        event.preventDefault();

        let formData = new FormData(event.target);

        const imagesMetadata = images.map((img, index) => ({
            imageId: img.id,
            isRemote: false,
            isMain: img.isMain,
            sortId: index
        }));

        if (imagesMetadata.length === 0) {
            toast.warn("Your offer must have at least 1 image");
            return;
        }

        formData.append("imagesMetadata", JSON.stringify(imagesMetadata));

        let preparedKeyValueData = keyValueData.filter(x => x.key && x.value);
        formData.append("keyValueInfos", JSON.stringify(preparedKeyValueData));

        images.forEach(img => formData.append("images", img.file));

        const action = async () => await axios.post("/offers-api/draft", formData);
        await authorizedRequestHandler(action,
            {
                status: 200,
                callback: result => {
                    history.push(`/offers/create/draft/${result.data.offerId}/stage/2`);
                }
            },
            {
                status: 400,
                callback: () => {
                    toast.error("Your creation request has been rejected");
                }
            }
        );
    };

    // For test purposes
    const offerDefaultValues = {
        name: `Offer ${moment.utc().toISOString()}`,
        description: `Offer Description ${moment.utc().toISOString()}`,
        price: Math.floor(Math.random() * (1000 - 20 + 1)) + 20,
        totalStock: Math.floor(Math.random() * (40 - 1 + 1)) + 1
    };

    if (state.loading) return <></>

    if (!state.canSell) return <>
        <h3>You cannot create offers yet...</h3>

        <p>
            Fill <Link to='/user/seller-info'>seller info</Link> and come back :)
        </p>
    </>

    return <div className="bg-white container pt-2 pb-4">
        <div className="mt-2 mb-3">
            <h2 style={{ display: 'inline' }}>
                Create Offer
            </h2>
            <span className="ml-2 align-self-center text-secondary">
                (Stage 1 of 2)
            </span>
        </div>

        <OfferForm onSubmitCb={createOfferCb} offer={offerDefaultValues}>
            <div className="form-group">
                <label>Category</label>

                <RequiredSelect
                    name="categoryId"
                    styles={{ menu: provided => ({ ...provided, zIndex: 9999 }), borderColor: "#ccc" }}
                    options={state.categoryOptions}
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

            <button type="submit" className="btn btn-success btn-block mt-5">
                Go to stage 2
            </button>
        </OfferForm>

        <ReactTooltip />
    </div>
}

export default CreateOfferDraftPage;