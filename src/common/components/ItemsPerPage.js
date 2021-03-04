import AwareComponentBuilder from 'common/AwareComponentBuilder';
import React, { useEffect } from 'react';

const ItemsPerPage = (props) => {

    const { onChange, classes } = props;

    const options = [5, 10, 15, 20];

    useEffect(() => {
        rehydrateValue(props, options);
    }, []);

    const handleChange = event => {
        const newValue = parseInt(event.target.value);
        if (props.settings.itemsPerPage === newValue) return;

        props.setItemsPerPage(event.target.value);
        if (onChange) onChange(newValue);
    };

    return <>
        <div className={classes}>
            <label>Per page</label>

            <select className="form-control d-inline-block ml-2"
                style={{ width: '70px' }}
                value={props.settings.itemsPerPage}
                onChange={handleChange}
            >
                {
                    options.map(opt =>
                        <option key={`opt-${opt}`} value={opt}>
                            {opt}
                        </option>
                    )
                }
            </select>
        </div>
    </>
};

function rehydrateValue(props, options) {
    const defaultValue = options[0];

    let storedValue = props.settings?.itemsPerPage;
    if (!storedValue) {
        props.setItemsPerPage(defaultValue);
        return;
    }

    if (!options.some(x => x === storedValue)) {
        props.setItemsPerPage(defaultValue);
        return;
    }
}

export default new AwareComponentBuilder()
    .withSettingsAwareness()
    .build(ItemsPerPage);