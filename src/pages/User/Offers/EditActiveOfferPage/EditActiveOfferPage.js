import axios from 'axios';
import { authorizedRequestHandler, requestHandler } from 'common/utils';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';
import DeliveryMethodsSection from '../components/OfferEditing/DeliveryMethodsSection';
import GeneralSection from '../components/OfferEditing/GeneralSection';
import ParametersSection from '../components/OfferEditing/ParametersSection';
import ActionsDropdown from './components/ActionsDropdown';

const EditActiveOfferPage = (props) => {

    const offerId = props.match.params.id;

    const history = useHistory();

    const [state, setState] = useState({ loading: true, canSell: true, categoryOptions: [] });
    const [images, setImages] = useState([]);

    const [parameters, setParameters] = useState([{ key: '', value: '' }]);
    const [deliveryMethods, setDeliveryMethods] = useState([{ key: "", value: "" }]);
    const [predefinedDeliveryMethods, setPredefinedDeliveryMethods] = useState([]);

    useEffect(() => {
        const fetchOffer = async () => {
            const offerUri = `/offers-api/offers/${offerId}/my`;
            const offerAction = async () => await axios.get(offerUri);
            const offerResult = await authorizedRequestHandler(offerAction,
                {
                    status: 200,
                    callback: result => {
                        if (!result.data.publishedAt) {
                            toast.warn("Offer is not published yet");
                            history.push(`/offers/${offerId}/my`);
                        }

                        return result;
                    }
                },
                {
                    status: 400,
                    callback: result => {
                        throw ({
                            type: "UNKNOWN",
                            message: result.data.Message
                        });
                    }
                }
            );

            setImages(offerResult.data.images.map(x => ({ ...x, isRemote: true })));
            setParameters([...offerResult.data.keyValueInfos.map(kvp =>
                ({ key: kvp.key, value: kvp.value })), { key: "", value: "" }]
            );
            setDeliveryMethods([...offerResult.data.deliveryMethods.map(kvp =>
                ({ key: kvp.name, value: kvp.price.toFixed(2) })), { key: "", value: "" }]
            );
            return offerResult;
        };

        const fetchCategoryOptions = async () => {
            const categoriesUri = "/offers-api/categories";
            const categoriesAction = async () => await axios.get(categoriesUri);
            const categoriesResult = await requestHandler(categoriesAction);
            const categoryOptions = categoriesResult.map(cat =>
                ({ value: cat.id, label: cat.name })
            );
            return categoryOptions;
        };

        const fetchDeliveryMethods = async () => {
            const methodsUri = `/offers-api/delivery-methods`;
            const methodsAction = async () => await axios.get(methodsUri);
            const deliveryMethods = await authorizedRequestHandler(methodsAction);

            setPredefinedDeliveryMethods(deliveryMethods.map(x => {
                const labelPricePart = (x.price || x.price === 0)
                    ? ` - ${x.price.toFixed(2)} PLN`
                    : '';

                return ({
                    label: `${x.name}${labelPricePart}`,
                    value: `${x.name};${(x.price || x.price === 0) ? x.price : ""}`
                });
            }));
        };

        const fetch = async () => {
            try {
                const offerResult = await fetchOffer();
                const categoryOptions = await fetchCategoryOptions();
                await fetchDeliveryMethods();


                setState({
                    loading: false,
                    canSell: true,
                    categoryOptions: categoryOptions,
                    offer: offerResult.data
                });
            } catch (error) {
                setState({
                    loading: true,
                    canSell: false
                });
            }
        };

        fetch();
    }, []);

    const prepareFormData = event => {
        let formData = new FormData(event.target);

        // Prepare images
        let mainImg = images.find(x => x.isMain);
        if (!mainImg) {
            console.log("Something went wrong. No main image...");
            throw "WARN";
        }

        images.forEach(img => formData.append("images", img.file));
        const imagesMetadata = images.map((img, index) => ({
            imageId: img.id,
            isRemote: img.isRemote,
            isMain: img.isMain,
            sortId: index
        }));

        if (imagesMetadata.length === 0) {
            toast.warn("Offer must have at least 1 image");
            throw "WARN";
        }
        formData.append("imagesMetadata", JSON.stringify(imagesMetadata));

        // Prepare parameters
        let preparedParameters = parameters.filter(x => x.key && x.value);
        formData.append("keyValueInfos", JSON.stringify(preparedParameters));

        // Prepare delivery methods
        let preparedDeliveryMethods = deliveryMethods.filter(x => x.key && x.value);
        if (preparedDeliveryMethods.length === 0) {
            toast.warn("At least 1 delivery method required");
            throw "WARN";
        }
        if (new Set(preparedDeliveryMethods.map(x => x.key)).size !== preparedDeliveryMethods.length) {
            toast.warn("Delivery methods must be unique");
            throw "WARN";
        }

        preparedDeliveryMethods = preparedDeliveryMethods.map(x => ({
            name: x.key,
            price: x.value
        }));
        formData.append("deliveryMethods", JSON.stringify(preparedDeliveryMethods));

        return formData;
    }

    const onSubmitCb = async event => {
        event.preventDefault();

        const formData = prepareFormData(event);

        const uri = `/offers-api/offers/${offerId}`;
        const action = async () => await axios.put(uri, formData);
        await authorizedRequestHandler(action,
            {
                status: 200,
                callback: () => {
                    toast.success("Offer updated");
                    history.push(`/user/offers/${offerId}`);
                }
            },
            {
                status: 400,
                callback: () => {
                    toast.error("Your update request has been rejected");
                }
            }
        );
    };

    if (state.loading) return <></>

    if (!state.canSell) return <>
        <h3>You cannot create offers yet...</h3>

        <p>
            Fill
            <Link to='/user/settings/seller-info'>
                seller info
            </Link> and come back :)
        </p>
    </>

    const initSelectedCategory = state.categoryOptions.find(x => x.value === state.offer.category.id);

    return <div className="pt-2 pb-4">
        <form onSubmit={onSubmitCb} onKeyPress={e => { if (e.key === 'Enter') e.preventDefault(); }}>

            <div className="bg-white px-4 pt-3 pb-4">
                <h2 style={{ display: 'inline' }}>
                    Edit offer
                </h2>

                <div className="pull-right">
                    <ActionsDropdown />
                </div>
            </div>

            <GeneralSection
                state={state}
                offer={state.offer}
                images={images}
                setImages={setImages}
                initCategory={initSelectedCategory}
            />

            <ParametersSection
                parameters={parameters}
                setParameters={setParameters}
            />

            <DeliveryMethodsSection
                deliveryMethods={deliveryMethods}
                setDeliveryMethods={setDeliveryMethods}
                predefinedDeliveryMethods={predefinedDeliveryMethods}
            />

            <div className="bg-white pb-3 px-3">
                <button className="btn btn-block btn-success" type="submit">
                    Update
                </button>
            </div>
        </form>

        <ReactTooltip />
    </div>
};

export default EditActiveOfferPage;