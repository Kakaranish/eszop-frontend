import React, { useState } from "react";
import Select from "react-select";

const RequiredSelect = (props) => {

    const { name, isClearable, styles, options, initValue = {} } = props;

    const [selectedValue, setSelectedValue] = useState(initValue);
    const onChange = newValue => setSelectedValue(newValue);

    let selectRef = null;
    const setSelectRef = ref => selectRef = ref;

    return <div>
        <Select
            ref={setSelectRef}
            styles={styles}
            value={selectedValue}
            isClearable={isClearable}
            options={options}
            onChange={onChange} 
        />

        <input
            name={name}
            tabIndex={-1}
            autoComplete="off"
            style={{
                opacity: 0,
                width: "100%",
                height: 0,
                position: "absolute",
                borderColor: "#ccc asbolute"
            }}
            value={selectedValue?.value ?? ""}
            onChange={onChange}
            onFocus={() => selectRef.focus()}
            required={true}
        />
    </div>
};

export default RequiredSelect;