import React from "react";
import Select from "react-select";

import InstitutionService from "../../services/InstitutionService";
import useFetchSelect from "../../hooks/useFetchSelect";
import {SelectOption} from "../../hooks/useSelect";

const getInstitutions = () => InstitutionService.getInstitutionsForCombo()
    .then(data => data.map(x => ({ value: x.id, label: x.name } as SelectOption)));

const InstitutionsSelect = ({ institutionId, onInstitutionChanged }: { institutionId?: string, onInstitutionChanged: (x?: string) => void }) => {
    const selectProps = useFetchSelect(
        getInstitutions,
        onInstitutionChanged,
        institutionId
    );

    return (
        <div className="form-group">
            <label htmlFor="edit-course-institution" className="form-label">
                <small>Institución</small>
            </label>
            <Select {...selectProps}
                    id="edit-course-institution"
                    name="edit-course-institution"
                    placeholder="Institución"
                    noOptionsMessage={({ inputValue }) => "No se encontraron instituciones"} />
        </div>
    )
};

export default InstitutionsSelect;
