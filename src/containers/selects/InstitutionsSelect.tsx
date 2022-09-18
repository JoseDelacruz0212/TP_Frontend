import React, {useEffect, useState} from "react";
import Select, {PropsValue} from "react-select";

import {InstitutionOption} from "../../types/communication/responses/institutions";

import {SelectOption, selectStyles} from "../../components/common/select/Select";

import InstitutionService from "../../services/InstitutionService";

const InstitutionsSelect = ({ institutionId, onInstitutionChanged }: { institutionId?: string, onInstitutionChanged: (x?: string) => void }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [institutions, setInstitutions] = useState<InstitutionOption[]>([]);
    const [selectedOption, setSelectedOption] = useState<PropsValue<SelectOption>>(null);

    const onSelectedInstitutionIdHandler = (institutionId?: string) => {
        onInstitutionChanged(institutionId);

        const selectedInstitution = institutions.find(x => x.id === institutionId);
        if (selectedInstitution) {
            const newSelectedOption = { value: selectedInstitution.id, label: selectedInstitution.name };
            setSelectedOption(newSelectedOption);
        }
    }

    useEffect(() => {
        setIsLoading(true);

        InstitutionService.getInstitutionsForCombo().then(
            values => {
                setIsLoading(false);
                setInstitutions(values);

                const selectedInstitution = values.find(x => x.id === institutionId);
                if (selectedInstitution) {
                    const newSelectedOption = { value: selectedInstitution.id, label: selectedInstitution.name };
                    setSelectedOption(newSelectedOption);
                }
            }
        ).catch(() => setIsLoading(false));
    }, []);

    return (
        <div className="form-group">
            <label htmlFor="edit-course-institution" className="form-label">
                <small>Institución</small>
            </label>
            <Select id="edit-course-institution"
                    name="edit-course-institution"
                    placeholder="Institución"
                    isDisabled={!institutions || institutions?.length === 0}
                    styles={selectStyles}
                    value={selectedOption}
                    isLoading={isLoading}
                    noOptionsMessage={({ inputValue }) => "No se encontraron instituciones"}
                    onChange={(option: SelectOption | null) => onSelectedInstitutionIdHandler(option?.value || "")}
                    options={institutions.map(institution => ({ value: institution.id, label: institution.name }))} />
        </div>
    )
};

export default InstitutionsSelect;
