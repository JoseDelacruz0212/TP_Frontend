import React from "react";

import withSliceProvider from "./SliceProvider";
import {coursesSlice} from "../slices/courses";

export const withCoursesProvider = <P extends object>(children: React.ComponentType<P>) => withSliceProvider<P>(coursesSlice, children);
