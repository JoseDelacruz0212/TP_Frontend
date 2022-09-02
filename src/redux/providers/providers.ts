import React from "react";

import withSliceProvider from "./SliceProvider";
import {institutionsSlice} from "../slices/institutions";
import {coursesSlice} from "../slices/courses";

export const withInstitutionsProvider = <P extends object>(children: React.ComponentType<P>) =>
    (props: P) => withSliceProvider<P>(institutionsSlice, children)(props);
export const withCoursesProvider = <P extends object>(children: React.ComponentType<P>) => 
    (props: P) => withSliceProvider<P>(coursesSlice, children)(props);