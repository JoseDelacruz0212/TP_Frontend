import React, {useContext, createContext} from "react";
import {useSelector} from "react-redux";
import {Slice} from "@reduxjs/toolkit";

import {RootState} from "../store";
import {coursesSlice} from "../slices/courses";

import {TableDataState} from "../../types/store/states";
import {Entity} from "../../types/communication/responses/entity";
import {Filter} from "../../types/communication/requests/course";

const SliceContext = createContext<Slice>(coursesSlice);

const withSliceProvider = <P extends object>(slice: Slice, Component: React.ComponentType<P>) =>
    class WithSliceProvider extends React.Component<P> {
        render() {
            return (
                <SliceContext.Provider value={slice}>
                    <Component { ...this.props as P } />
                </SliceContext.Provider>
            )
        }
    }

export const useSliceActions = () => useContext(SliceContext).actions;

export const useSliceSelector = (): TableDataState<Entity, Filter> => {
    const { name } = useContext(SliceContext);

    return useSelector((state: RootState) => {
        switch (name) {
            case 'courses': return state.courses; break;
            case 'assessments': return state.assessments; break;
            default:
                return state.assessments;
        }
    });
};

export default withSliceProvider;
