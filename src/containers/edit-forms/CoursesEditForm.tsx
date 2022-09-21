import React from "react";

import {Course} from "../../types/communication/responses/courses";
import {Permissions} from "../../types/auth";
import {FormInputProps} from "../../types/common";

import InstitutionsSelect from "../selects/InstitutionsSelect";

import HasPermission from "../../hoc/with-permission/HasPermission";

const CourseEditForm = ({ values, onChange }: FormInputProps<Course>) => {
    const onInstitutionChanged = (institutionId?: string) => {
        onChange && institutionId && onChange({ ...values, institutionId });
    }

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
                <label htmlFor="edit-course-grade" className="form-label">
                    <div className="flex justify-between">
                        <small>Grado</small>
                        <small className="text-overline">{values.grade.length || '0'} / 25</small>
                    </div>
                </label>
                <input className="form-input"
                       id="edit-course-grade"
                       name="edit-course-grade"
                       placeholder="Grado"
                       maxLength={25}
                       value={values.grade}
                       onChange={(e) => onChange && onChange({ ...values, grade: e.target.value })} />
            </div>
            <div className="form-group">
                <label htmlFor="edit-course-section" className="form-label">
                    <div className="flex justify-between">
                        <small>Sección</small>
                        <small className="text-overline">{values.section.length || '0'} / 25</small>
                    </div>
                </label>
                <input className="form-input"
                       id="edit-course-section"
                       name="edit-course-section"
                       placeholder="Sección"
                       maxLength={25}
                       value={values.section}
                       onChange={(e) => onChange && onChange({ ...values, section: e.target.value })} />
            </div>
            <HasPermission permission={Permissions.COURSES_SELECT_INSTITUTION}>
                <InstitutionsSelect institutionId={values.institution?.id || ""} onInstitutionChanged={onInstitutionChanged} />
            </HasPermission>
        </>
    );
}

export default CourseEditForm;
