import React, { useRef, useState } from "react";
import Select from "react-select";

const RequiredSelect = (props) => {

    const { name, isClearable, styles, options, initValue = {} } = props;
    const [selectedValue, setSelectedValue] = useState(initValue);
    const selectRef = useRef(null);

    const onChange = newValue => setSelectedValue(newValue);

    return <div>
        <Select
            ref={selectRef}
            styles={styles}
            value={selectedValue}
            isClearable={isClearable}
            options={options}
            onChange={onChange} />

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