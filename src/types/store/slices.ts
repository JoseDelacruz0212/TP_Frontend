import {TableDataState} from "./states";
import {CaseReducer, PayloadAction, Reducer} from "@reduxjs/toolkit";

export type DataSliceProps<T, F> = {
    name: string;
    initialState: TableDataState<T, F>;
    reducers?: any;
    extraReducers?: any;
};
