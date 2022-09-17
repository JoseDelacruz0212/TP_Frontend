import createTableDataSlice, {TableDataState} from "./tableData";

import {Assessment} from "../../types/communication/responses/assessment";
import {AssessmentFilter} from "../../types/communication/requests/asessments";
import {assessmentStatusChanged} from "../reducers/assessments";

const initialState: TableDataState<Assessment, AssessmentFilter> = {
    filters: {
        name: '',
        courseId: ''
    }
};

export const assessmentsSlice = createTableDataSlice<Assessment, AssessmentFilter>({
    name: 'assessments',
    initialState,
    reducers: {
        assessmentStatusChanged
    }
})

export default assessmentsSlice.reducer;
