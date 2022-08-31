import {PayloadAction} from "@reduxjs/toolkit";

import {TableDataState} from "../../types/store/states";
import {PaginatedResponse} from "../../types/communication/responses/pagination";

export const dataLoaded = <T, F>(state: TableDataState<T, F>, action: PayloadAction<PaginatedResponse<T>>): TableDataState<T, F> => ({
    ...state,
    items: action.payload,
    isLoading: false,
    error: null
});

export const dataRequestStarted = <T, F>(state: TableDataState<T, F>): TableDataState<T, F> => ({
    ...state,
    isLoading: true
});

export const dataFetchingFailed = <T, F>(state: TableDataState<T, F>, action: PayloadAction<string>): TableDataState<T, F> => ({
    ...state,
    items: undefined,
    isLoading: false,
    error: action.payload
});

export const filtersUpdated = <T, F>(state: TableDataState<T, F>, action: PayloadAction<F>): TableDataState<T, F> => ({
    ...state,
    filters: action.payload
});

export const pageUpdated = <T, F>(state: TableDataState<T, F>, action: PayloadAction<number>): TableDataState<T, F> => ({
    ...state,
    page: action.payload
});

export const pageSizeUpdated = <T, F>(state: TableDataState<T, F>, action: PayloadAction<number>): TableDataState<T, F> => ({
    ...state,
    pageSize: action.payload
});
