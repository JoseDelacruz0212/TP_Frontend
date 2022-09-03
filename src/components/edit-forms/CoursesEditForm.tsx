import React, {useEffect, useState} from "react";

import {FormInputs} from "../../types/components/common/modal";
import {Course, InstitutionOption} from "../../types/communication/responses/courses";

import InstitutionService from "../../services/InstitutionService";

const CourseEditForm = ({ values, onChange }: FormInputs<Course>) => {
    const [institutions, setInstitutions] = useState<InstitutionOption[]>();
    const [selectedInstitutionId, setSelectedInstitutionId] = useState<string | undefined>();

    const onSelectedInstitutionIdHandler = (institutionId: string) => {
        onChange && onChange({ ...values, institutionId });
        setSelectedInstitutionId(institutionId);
    }

    useEffect(() => {
        InstitutionService.getInstitutionsForCombo().then(
            values => setInstitutions(values)
        );
    }, []);

    return (
        <>
            <div className="form-group">
                <label htmlFor="edit-course-name" className="form-label">
                    <div className="flex justify-between">
                        <small>Nombre</small>
                        <small className="text-overline">{values.name.length || '0'} / 100</small>
                    </div>
                </label>
                <input className="form-input"
                       id="edit-course-name"
                       name="edit-course-name"
                       placeholder="Nombre"
                       maxLength={100}
                       value={values.name}
                       onChange={(e) => onChange && onChange({ ...values, name: e.target.value })} />
            </div>
            <div className="form-group">
                <label htmlFor="edit-course-description" className="form-label">
                    <div className="flex justify-between">
                        <small>Descripción</small>
                        <small className="text-overline">{values.description.length || '0'} / 255</small>
                    </div>
                </label>
                <textarea className="form-input"
                          id="edit-course-description"
                          name="edit-course-description"
                          placeholder="Descripción"
                          rows={4}
                          maxLength={255}
                          value={values.description}
                          onChange={(e) => onChange && onChange({ ...values, description: e.target.value })} />
            </div>
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
        </>
    );
}

export default CourseEditForm;
