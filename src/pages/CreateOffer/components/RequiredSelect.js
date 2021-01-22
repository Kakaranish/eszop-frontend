import React from "react";

class RequiredSelect extends React.Component {
    state = { value: this.props.value || "" };

    selectRef = null;
    setSelectRef = ref => {
        this.selectRef = ref;
    };

    onChange = (value, actionMeta) => {
        this.props.onChange(value, actionMeta);
        this.setState({ value });
    };

    getValue = () => {
        if (!this.props.value) return this.props.value;
        return this.state.value || "";
    };

    render() {
        const { SelectComponent, required, ...props } = this.props;

        return (
            <div>
                <SelectComponent {...props} ref={this.setSelectRef} onChange={this.onChange} />

                <input
                    tabIndex={-1}
                    autoComplete="off"
                    style={{
                        opacity: 0,
                        width: "100%",
                        height: 0,
                        position: "absolute",
                        borderColor: "#ccc asbolute"
                    }}
                    value={this.getValue()}
                    onChange={() => { }}
                    onFocus={() => this.selectRef.focus()}
                    required={required}
                />
            </div>
        );
    }
}

export default RequiredSelect;