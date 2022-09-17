import {createSlice} from "@reduxjs/toolkit";

import {
    dataLoaded,
    dataRequestStarted,
    dataFetchingFailed,
    filtersUpdated,
    pageUpdated,
    pageSizeUpdated,
    dataItemDeleted,
    dataItemUpdated,
    panelRequestStarted,
    panelRequestSucceeded,
    panelRequestFailed
} from "../reducers/tablaData";

import {Entity} from "../../types/communication/responses/entity";
import {Filter} from "../../types/communication/requests/filter";
import {PaginatedResponse} from "../../types/communication/responses/pagination";

interface PaginationOptions {
    page?: number;
    pageSize?: number;
}

export interface TableDataState<T, F> {
    filters: F;
    isLoading?: boolean;
    items?: PaginatedResponse<T>;
    error?: string | null;
    isFilterActivated?: boolean;
    paginationOptions?: PaginationOptions;
    initialFiltersApplied?: boolean;
    showPanelLoadingIndicator?: boolean;
}

interface DataSliceProps<T, F> {
    name: string;
    initialState: TableDataState<T, F>;
    reducers?: any;
    extraReducers?: any;
};

const createTableDataSlice = <T extends Entity, F extends Filter>({ name, initialState, reducers, extraReducers }: DataSliceProps<T, F>) => {
    initialState = {
        isLoading: false,
        items: undefined,
        error: null,
        isFilterActivated: false,
        initialFiltersApplied: false,
        showPanelLoadingIndicator: false,
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
            panelRequestStarted,
            panelRequestSucceeded,
            panelRequestFailed,
            ...reducers
        },
        extraReducers: {
            ...extraReducers
        }
    });
};

export default createTableDataSlice;
