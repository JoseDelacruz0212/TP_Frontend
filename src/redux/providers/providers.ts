import React from "react";

import withSliceProvider from "./SliceProvider";
import {institutionsSlice} from "../slices/institutions";
import {coursesSlice} from "../slices/courses";

export const withInstitutionsProvider = <P extends object>(children: React.ComponentType<P>) => withSliceProvider<P>(institutionsSlice, children);
export const withCoursesProvider = <P extends object>(children: React.ComponentType<P>) => withSliceProvider<P>(coursesSlice, children);
