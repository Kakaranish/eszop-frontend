import { getRemainingTimeStr } from 'common/utils';
import React from 'react';

const EndSection = ({ offer }) => {
    return <>
        Ends in: {getRemainingTimeStr(offer)}
    </>
};

export default EndSection;