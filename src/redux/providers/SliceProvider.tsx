import React, {useContext, createContext} from "react";
import {useSelector} from "react-redux";
import {Slice} from "@reduxjs/toolkit";

import {RootState} from "../store";
import {institutionsSlice} from "../slices/institutions";
import {TableDataState} from "../slices/tableData";

import {Entity} from "../../types/communication/responses/entity";
import {Filter} from "../../types/communication/requests/filter";

const SliceContext = createContext<Slice>(institutionsSlice);

const withSliceProvider = <P extends object>(slice: Slice, Component: React.ComponentType<P>) =>
    (props: P) => (
        <SliceContext.Provider value={slice}>
            <Component { ...props as P } />
        </SliceContext.Provider>
    )

export const useSliceActions = () => useContext(SliceContext).actions;

export const useSliceSelector = (): TableDataState<Entity, Filter> => {
    const { name } = useContext(SliceContext);
    // @ts-ignore
    return useSelector((state: RootState) => state[name]);
};

export default withSliceProvider;
