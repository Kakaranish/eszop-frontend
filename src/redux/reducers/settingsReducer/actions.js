import types from './types';

export const setItemsPerPage = itemsPerPage => ({
    type: types.ITEMS_PER_PAGE_SET, itemsPerPage
});
