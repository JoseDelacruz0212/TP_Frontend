import createTableDataSlice, {TableDataState} from "./tableData";

import {Objective} from "../../types/communication/responses/objective";
import {ObjectiveFilters} from "../../types/communication/requests/objective";

const initialState: TableDataState<Objective, ObjectiveFilters> = {
    filters: {
        courseId: ''
    }
};

export const objectivesSlice = createTableDataSlice<Objective, ObjectiveFilters>({
    name: 'objectives',
    initialState
});

export default objectivesSlice.reducer;
