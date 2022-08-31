import {createSlice} from "@reduxjs/toolkit";
import {DataSliceProps} from "../../types/store/slices";

import {
    dataLoaded,
    dataRequestStarted,
    dataFetchingFailed,
    filtersUpdated,
    pageUpdated,
    pageSizeUpdated
} from "../reducers/tablaData";

const createTableDataSlice = <T, F>({ name, initialState, reducers, extraReducers }: DataSliceProps<T, F>) => {
    initialState = {
        isLoading: false,
        items: undefined,
        error: null,
        isFilterActivated: false,
        page: 1,
        pageSize: 10,
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
            ...reducers
        },
        extraReducers: {
            ...extraReducers
        }
    });
};

export default createTableDataSlice;
