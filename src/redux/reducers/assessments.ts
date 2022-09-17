import {PayloadAction} from "@reduxjs/toolkit";

import {PaginatedResponse} from "../../types/communication/responses/pagination";

import {TableDataState} from "../slices/tableData";
import {Assessment} from "../../types/communication/responses/assessment";
import {AssessmentFilter} from "../../types/communication/requests/asessments";

export const assessmentStatusChanged = (state: TableDataState<Assessment, AssessmentFilter>, action: PayloadAction<PaginatedResponse<Assessment>>): TableDataState<Assessment, AssessmentFilter> => ({
    ...state,
    paginationOptions: {
        ...state.paginationOptions,
        page: 1
    }
});
