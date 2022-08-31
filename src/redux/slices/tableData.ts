import {createSlice} from "@reduxjs/toolkit";

import {
    dataLoaded,
    dataRequestStarted,
    dataFetchingFailed,
    filtersUpdated,
    pageUpdated,
    pageSizeUpdated,
    dataItemDeleted,
    dataItemUpdated
} from "../reducers/tablaData";

import {Entity} from "../../types/communication/responses/entity";
import {Filter} from "../../types/communication/requests/filter";
import {DataSliceProps} from "../../types/store/slices";

const createTableDataSlice = <T extends Entity, F extends Filter>({ name, initialState, reducers, extraReducers }: DataSliceProps<T, F>) => {
    initialState = {
        isLoading: false,
        items: undefined,
        error: null,
        isFilterActivated: false,
        paginationOptions: {
            page: 1,
            pageSize: 10,
        },
        ...initialState
    };

    return createSlice({
        name,
        initialState,
        reducers: {
            reset: () => ({ ...initialState }),
            dataLoaded,
            dataRequestStarted,
            dataFetchingFailed,
            filtersUpdated,
            pageUpdated,
            pageSizeUpdated,
            dataItemDeleted,
            dataItemUpdated,
            ...reducers
        },
        extraReducers: {
            ...extraReducers
        }
    });
};

export default createTableDataSlice;
