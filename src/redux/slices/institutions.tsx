import createTableDataSlice from "./tableData";

import {TableDataState} from "../../types/store/states";
import {Institution} from "../../types/communication/responses/institutions";
import {InstitutionFilter} from "../../types/communication/requests/institutions";

const initialState: TableDataState<Institution, InstitutionFilter> = {
    filters: {
        name: '',
        direction: '',
        code: ''
    }
};

export const institutionsSlice = createTableDataSlice<Institution, InstitutionFilter>({
    name: 'institutions',
    initialState
});

export default institutionsSlice.reducer;
