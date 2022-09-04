import createTableDataSlice from "./tableData";

import {TableDataState} from "../../types/store/states";
import {Assessment} from "../../types/communication/responses/assessment";
import {AssessmentFilter} from "../../types/communication/requests/asessments";

const initialState: TableDataState<Assessment, AssessmentFilter> = {
    filters: {
        name: '',
        courseId: ''
    }
};

export const assessmentsSlice = createTableDataSlice<Assessment, AssessmentFilter>({
    name: 'assessments',
    initialState
})

export default assessmentsSlice.reducer;
