import AwareComponentBuilder from 'common/AwareComponentBuilder';
import React from 'react';
import ItemsPerPage from './ItemsPerPage';

const Pagination = ({ currentPage, totalPages }) => {

    const maxAdjNum = 3;

    const maxLeftAdj = currentPage - maxAdjNum <= 1 ? maxAdjNum : maxAdjNum - 1;
    for (let i = maxLeftAdj; i > 0; i--) {
        let index = currentPage - i;
        if (index < 1) continue;
        console.log(index);
    }
    console.log(`Current: ${currentPage}`);

    const maxRightAdj = currentPage + maxAdjNum >= totalPages ? maxAdjNum : maxAdjNum - 1;

    for (let i = 1; i <= maxRightAdj; i++) {
        let index = currentPage + i;
        if (index > totalPages) continue;
        console.log(index);
    }

    const leftBreakRequired = currentPage - maxAdjNum - 1 > 0;
    const rightBreakRequired = currentPage + maxAdjNum < totalPages;

    const requiresPreviousButton = currentPage !== 1;
    const requiresNextButton = currentPage !== totalPages;

    console.log(`Left break required: ${leftBreakRequired}`);
    console.log(`Right break required ${rightBreakRequired}`);

    console.log("---")

    const renderButtons = () => {
        const buttons = [];

        if (leftBreakRequired) buttons.push(
            <>
                <li className="page-item">
                    <a className="page-link" href="#">
                        1
                    </a>
                </li>

                <div className="px-2">
                    ...
                </div>
            </>
        )

        for (let i = currentPage - maxLeftAdj; i < currentPage; i++) {
            if (i < 1) continue;
            buttons.push(
                <li className="page-item">
                    <a className="page-link" href="#">
                        {i}
                    </a>
                </li>
            )
        }

        buttons.push(
            <li className="page-item active">
                <a className="page-link" href="#">
                    {currentPage}
                </a>
            </li>
        );

        for (let i = currentPage + 1; i <= currentPage + maxRightAdj; i++) {
            if (i > totalPages) continue;
            buttons.push(
                <li className="page-item">
                    <a className="page-link" href="#">
                        {i}
                    </a>
                </li>
            )
        }

        if (rightBreakRequired) buttons.push(
            <>
                <div className="px-2">
                    ...
                </div>

                <li className="page-item">
                    <a className="page-link" href="#">
                        {totalPages}
                    </a>
                </li>
            </>
        )

        return buttons;
    }

    return <>
        <nav>
            <ul className="pagination">
                {
                    requiresPreviousButton &&
                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                }

                {
                    renderButtons()
                }

                {/* <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item px-3">...</li>
                <li className="page-item"><a className="page-link" href="#">10</a></li> */}


                {
                    requiresNextButton &&
                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                }
            </ul>
        </nav>
    </>
};

export default Pagination;