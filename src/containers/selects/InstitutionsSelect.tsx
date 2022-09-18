import React from "react";
import Select from "react-select";

import {InstitutionOption} from "../../types/communication/responses/institutions";

import InstitutionService from "../../services/InstitutionService";
import useSelect from "../../hooks/useSelect";

const getValue = (x: InstitutionOption) => x.id;
const getLabel = (x: InstitutionOption) => x.name;

const InstitutionsSelect = ({ institutionId, onInstitutionChanged }: { institutionId?: string, onInstitutionChanged: (x?: string) => void }) => {
    const selectProps = useSelect(
        InstitutionService.getInstitutionsForCombo,
        getValue,
        getLabel,
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
