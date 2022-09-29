import React from "react";

import {Course} from "../../types/communication/responses/courses";
import {Permissions} from "../../types/auth";
import {FormInputProps} from "../../types/common";

import InstitutionsSelect from "../selects/InstitutionsSelect";

import HasPermission from "../../hoc/with-permission/HasPermission";
import {CoursesValidation} from "../../validations/edit-forms/courses-edit-form-validation";
import useSelect from "../../hooks/useSelect";
import Select from "react-select";

const gradeOptions = [
    { value: '1 primaria', label: '1 primaria' },
    { value: '2 primaria', label: '2 primaria' },
    { value: '3 primaria', label: '3 primaria' },
    { value: '4 primaria', label: '4 primaria' },
    { value: '5 primaria', label: '5 primaria' },
    { value: '6 primaria', label: '6 primaria' },
    { value: '1 secundaria', label: '1 secundaria' },
    { value: '2 secundaria', label: '2 secundaria' },
    { value: '3 secundaria', label: '3 secundaria' },
    { value: '4 secundaria', label: '4 secundaria' },
    { value: '5 secundaria', label: '5 secundaria' }
];

const sectionOptions = [
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'C', label: 'C' },
    { value: 'D', label: 'D' }
]

const CourseEditForm = ({ values, onChange, errors }: FormInputProps<Course, CoursesValidation>) => {
    const onInstitutionChanged = (institutionId?: string) => {
        onChange && institutionId && onChange({ ...values, institutionId });
    }

    const gradeSelectProps = useSelect((selected?: string) => {
        selected && onChange && onChange({ ...values, grade: selected })
    }, gradeOptions, values.grade || "");

    const sectionSelectProps = useSelect((selected?: string) => {
        selected && onChange && onChange({ ...values, section: selected })
    }, sectionOptions, values.section || "");

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
                <small className="form-error">{errors?.name}</small>
            </div>
            <div className="form-group">
                <label htmlFor="edit-course-code" className="form-label">
                    <div className="flex justify-between">
                        <small>Código</small>
                        <small className="text-overline">{values.code.length || '0'} / 25</small>
                    </div>
                </label>
                <input className="form-input"
                       id="edit-course-code"
                       name="edit-course-code"
                       placeholder="Código"
                       maxLength={25}
                       value={values.code}
                       onChange={(e) => onChange && onChange({ ...values, code: e.target.value })} />
                <small className="form-error">{errors?.code}</small>
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
                <small className="form-error">{errors?.description}</small>
            </div>
            <div className="form-group">
                <label htmlFor="edit-course-grade" className="form-label">
                    <small>Grado</small>
                </label>
                <Select {...gradeSelectProps}
                        id="edit-course-grade"
                        name="edit-course-grade"
                        placeholder="Grado" />
                <small className="form-error">{errors?.grade}</small>
            </div>
            <div className="form-group">
                <label htmlFor="edit-course-section" className="form-label">
                    <small>Sección</small>
                </label>
                <Select {...sectionSelectProps}
                        id="edit-course-section"
                        name="edit-course-section"
                        placeholder="Sección" />
                <small className="form-error">{errors?.section}</small>
            </div>
            <HasPermission permission={Permissions.COURSES_SELECT_INSTITUTION}>
                <InstitutionsSelect institutionId={values.institution?.id || ""} onInstitutionChanged={onInstitutionChanged} />
                <small className="form-error">{errors?.institutionId}</small>
            </HasPermission>
        </>
    );
}

export default CourseEditForm;
