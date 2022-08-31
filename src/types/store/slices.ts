import {TableDataState} from "./states";
import {CaseReducer, PayloadAction} from "@reduxjs/toolkit";

export type DataSliceProps<T, F> = {
    name: string;
    initialState: TableDataState<T, F>;
    reducers?: CaseReducer<TableDataState<T, F>, PayloadAction>;
    extraReducers?: CaseReducer<TableDataState<T, F>, PayloadAction>;
};
