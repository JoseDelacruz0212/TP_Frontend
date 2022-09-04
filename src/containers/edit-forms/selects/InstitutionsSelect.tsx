import React, {useEffect, useState} from "react";

import {InstitutionOption} from "../../../types/communication/responses/institutions";

import InstitutionService from "../../../services/InstitutionService";

const InstitutionsSelect = ({ institutionId, onInstitutionChanged }: { institutionId?: string, onInstitutionChanged: (x: string) => void }) => {
    const [institutions, setInstitutions] = useState<InstitutionOption[]>([]);
    const [selectedInstitutionId, setSelectedInstitutionId] = useState<string | undefined>(institutionId);

    const onSelectedInstitutionIdHandler = (institutionId: string) => {
        onInstitutionChanged(institutionId);
        setSelectedInstitutionId(institutionId);
    }

    useEffect(() => {
        InstitutionService.getInstitutionsForCombo().then(
            values => setInstitutions(values)
        );
    }, []);

    return (
        <div className="form-group">
            <label htmlFor="edit-course-institution" className="form-label">
                <small>Institución</small>
            </label>
            <select className="form-input select"
                    id="edit-course-institution"
                    name="edit-course-institution"
                    value={selectedInstitutionId || ""}
                    placeholder="Institución"
                    disabled={!institutions || institutions?.length === 0}
                    onChange={(e) => onSelectedInstitutionIdHandler(e.target.value)} >
                <option value="" disabled>Seleccione una opción</option>
                {
                    institutions && institutions.map(option => (
                        <option key={option.id} value={option.id}>
                            { option.name }
                        </option>
                    ))
                }
            </select>
        </div>
    )
};

export default InstitutionsSelect;
