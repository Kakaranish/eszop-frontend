import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import ReactTooltip from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import XRegExp from 'xregexp';

const StatefulValidableInput = (
    {
        name = "",
        state,
        stateChangeCb,
        placeholder = "",
        type = "text",
        classes,
        regex = ".*",
        isHtmlErrorMsg = false,
        errorMsg = "",
        tipMsg,
    }
) => {

    const [initialized, setInitialized] = useState(false);
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        if(!initialized) {
            setInitialized(true);
            return;
        }
        setIsValid(XRegExp(regex).test(state[name]));
    }, [state[name]])

    const onChange = event => {
        stateChangeCb(name, event.target.value);
    };

    if (!tipMsg) return <>
        <input
            name={name}
            type={type}
            placeholder={placeholder}
            className={`form-control ${classes}`}
            value={state[name]}
            onChange={onChange}
            pattern={regex}
            onInvalid={() => setIsValid(false)}
            required
        />

        {
            !isValid &&
            <span className="text-danger">
                {
                    isHtmlErrorMsg
                        ? parse(errorMsg)
                        : errorMsg
                }
            </span>
        }
    </>

    return <>
        <div className="input-group mb-2">
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                className={`form-control ${classes}`}
                value={state[name]}
                onChange={onChange}
                pattern={regex}
                onInvalid={() => setIsValid(false)}
                required
            />

            <div className="input-group-prepend">
                <div className="input-group-text">
                    <FontAwesomeIcon icon={faQuestionCircle}
                        className="align-baseline"
                        style={{ color: 'gray', marginLeft: '2px' }}
                        size={'1x'}
                        data-tip={tipMsg}
                    />
                </div>
            </div>

            <ReactTooltip html={true} />
        </div>

        {
            !isValid &&
            <span className="text-danger">
                {
                    isHtmlErrorMsg
                        ? parse(errorMsg)
                        : errorMsg
                }
            </span>
        }
    </>
};

export default StatefulValidableInput;