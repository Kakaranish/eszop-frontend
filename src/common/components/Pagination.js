import queryString from 'query-string';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Styles = styled.div`
.pointer {
    cursor: pointer;
}
`

const Pagination = (props) => {

    const { currentPage, totalPages, queryParamName, location } = props;

    const history = useHistory();

    const goToPage = pageIndex => {
        history.push(createUri(location, queryParamName, pageIndex));
        history.push('/refresh');
    }

    const maxAdjNum = 3;
    const buttons = [];

    const requiresPreviousButton = currentPage !== 1;
    if (requiresPreviousButton) buttons.push(
        <li key="prev" className="page-item page-link pointer"
            onClick={() => goToPage(currentPage - 1)}>
            Previous
        </li>
    );

    const leftBreakRequired = currentPage - maxAdjNum - 1 > 0;
    if (leftBreakRequired) buttons.push(
        <>
            <li key="1" className="page-item page-link pointer" onClick={() => goToPage(1)}>
                1
            </li>

            <div className="px-2">
                ...
            </div>
        </>
    );

    const maxLeftAdj = currentPage - maxAdjNum <= 1 ? maxAdjNum : maxAdjNum - 1;
    for (let i = currentPage - maxLeftAdj; i < currentPage; i++) {
        if (i < 1) continue;

        buttons.push(
            <li key={i} className="page-item page-link pointer" onClick={() => goToPage(i)}>
                {i}
            </li>
        );
    }

    buttons.push(
        <li key={currentPage} className="page-item active pointer" onClick={() => goToPage(currentPage)}>
            <span className="page-link">
                {currentPage}
            </span>
        </li>
    );

    const maxRightAdj = currentPage + maxAdjNum >= totalPages ? maxAdjNum : maxAdjNum - 1;
    for (let i = currentPage + 1; i <= currentPage + maxRightAdj; i++) {
        if (i > totalPages) continue;

        buttons.push(
            <li key={i} className="page-item page-link pointer" onClick={() => goToPage(i)} >
                {i}
            </li>
        );
    }

    const rightBreakRequired = currentPage + maxAdjNum < totalPages;
    if (rightBreakRequired) buttons.push(
        <>
            <div className="px-2">
                ...
            </div>

            <li key={totalPages} className="page-item page-link pointer" onClick={() => goToPage(totalPages)}>
                {totalPages}
            </li>
        </>
    );

    const requiresNextButton = currentPage !== totalPages;
    if (requiresNextButton) buttons.push(
        <li className="page-item page-link pointer" onClick={() => goToPage(currentPage + 1)}>
            Next
        </li>
    );

    return <>
        <Styles>
            <nav>
                <ul className="pagination">
                    {
                        buttons
                    }
                </ul>
            </nav>
        </Styles>
    </>
};

function createUri(location, queryParamName, pageIndex) {
    const queryParams = queryString.parse(location.search);
    const pathName = location.pathname;

    let linkQueryParams = Object.assign({}, queryParams);
    linkQueryParams[queryParamName] = pageIndex;

    return `${pathName}?${queryString.stringify(linkQueryParams)}`;
}

export default Pagination;