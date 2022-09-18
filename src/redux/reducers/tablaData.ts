import {PayloadAction} from "@reduxjs/toolkit";

import {PaginatedResponse} from "../../types/communication/responses/pagination";
import {Entity} from "../../types/communication/responses/entity";
import {Filter} from "../../types/communication/requests/filter";

import {TableDataState} from "../slices/tableData";

export const dataLoaded = <T extends  Entity, F extends Filter>(state: TableDataState<T, F>, action: PayloadAction<PaginatedResponse<T>>): TableDataState<T, F> => ({
    ...state,
    items: action.payload,
    isLoading: false,
    error: null
});

export const dataRequestStarted = <T extends  Entity, F extends Filter>(state: TableDataState<T, F>): TableDataState<T, F> => ({
    ...state,
    items: undefined,
    isLoading: true
});

export const dataFetchingFailed = <T extends  Entity, F extends Filter>(state: TableDataState<T, F>, action: PayloadAction<string>): TableDataState<T, F> => ({
    ...state,
    items: undefined,
    isLoading: false,
    error: action.payload
});

export const panelRequestStarted = <T extends  Entity, F extends Filter>(state: TableDataState<T, F>): TableDataState<T, F> => ({
    ...state,
    showPanelLoadingIndicator: true
});

export const panelRequestSucceeded = <T extends  Entity, F extends Filter>(state: TableDataState<T, F>): TableDataState<T, F> => ({
    ...state,
    showPanelLoadingIndicator: false
});

export const panelRequestFailed = <T extends  Entity, F extends Filter>(state: TableDataState<T, F>): TableDataState<T, F> => ({
    ...state,
    showPanelLoadingIndicator: false
});

export const filtersUpdated = <T extends  Entity, F extends Filter>(state: TableDataState<T, F>, action: PayloadAction<F>): TableDataState<T, F> => ({
    ...state,
    filters: action.payload,
    initialFiltersApplied: true,
    paginationOptions: {
        ...state.paginationOptions,
        page: 1
    }
});

export const pageUpdated = <T extends  Entity, F extends Filter>(state: TableDataState<T, F>, action: PayloadAction<number>): TableDataState<T, F> => ({
    ...state,
    paginationOptions: {
        ...state.paginationOptions,
        page: action.payload
    }
});

export const pageSizeUpdated = <T extends  Entity, F extends Filter>(state: TableDataState<T, F>, action: PayloadAction<number>): TableDataState<T, F> => ({
    ...state,
    paginationOptions: {
        ...state.paginationOptions,
        pageSize: action.payload
    }
});

export const dataItemDeleted = <T extends  Entity, F extends Filter>(state: TableDataState<T, F>, action: PayloadAction<string>): TableDataState<T, F> => {
    if (!state.items || !state.items.data) return state;

    return ({
        ...state,
        paginationOptions: {
            ...state.paginationOptions,
            page: 1
        }
    })
}

export const dataItemUpdated = <T extends  Entity, F extends Filter>(state: TableDataState<T, F>, action: PayloadAction<T>): TableDataState<T, F> => {
    if (!state.items || !state.items.data) return state;

    return ({
        ...state,
        paginationOptions: {
            ...state.paginationOptions,
            page: 1
        }
    });
}
