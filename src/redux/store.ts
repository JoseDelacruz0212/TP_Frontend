import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

import institutions from "./slices/institutions";
import courses from "./slices/courses";
import assessments from "./slices/assessments";
import users from "./slices/users";
import qualifications from "./slices/qualifications";
import objectives from "./slices/objectives";

const store = configureStore({
    reducer: {
        institutions,
        courses,
        assessments,
        users,
        qualifications,
        objectives
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store;
