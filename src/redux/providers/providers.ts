import React from "react";

import withSliceProvider from "./SliceProvider";
import {institutionsSlice} from "../slices/institutions";

export const withInstitutionsProvider = <P extends object>(children: React.ComponentType<P>) => withSliceProvider<P>(institutionsSlice, children);
