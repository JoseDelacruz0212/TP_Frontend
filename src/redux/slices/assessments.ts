import createTableDataSlice from "./tableData";

import {Assessment} from "../../types/communication/responses/assessment";
import {AssessmentFilter} from "../../types/communication/requests/asessments";
import {TableDataState} from "../../types/store/states";

const initialState: TableDataState<Assessment, AssessmentFilter> = {
    filters: {
        name: '',
        courseId: '',
        startDate: undefined,
        endDate: undefined
    }
};

export const assessmentsSlice = createTableDataSlice<Assessment, AssessmentFilter>({
    name: 'courses',
    initialState
});

export default assessmentsSlice.reducer;

