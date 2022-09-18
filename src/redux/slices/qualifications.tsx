import createTableDataSlice, {TableDataState} from "./tableData";

import {Qualification} from "../../types/communication/responses/qualification";
import {QualificationFilter} from "../../types/communication/requests/qualification";

const initialState: TableDataState<Qualification, QualificationFilter> = {
    filters: {
        assessmentId: '',
        userId: ''
    }
};

export const qualificationsSlice = createTableDataSlice<Qualification, QualificationFilter>({
    name: 'qualifications',
    initialState
});

export default qualificationsSlice.reducer;
