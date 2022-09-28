import React from "react";

import {FormInputProps} from "../../types/common";
import {Objective} from "../../types/communication/responses/objective";
import {ObjectiveValidation} from "../../validations/edit-forms/objective-edit-form-validation";

const ObjectiveEditForm = ({ values, onChange, errors }: FormInputProps<Objective, ObjectiveValidation>) => {
    /* const onCourseChanged = (courseId?: string) => {
        onChange && courseId && onChange({ ...values, courseId });
    } */

    return (
        <>
            <div className="form-group">
                <label htmlFor="edit-objective-name" className="form-label">
                    <div className="flex justify-between">
                        <small>Nombre</small>
                        <small className="text-overline">{values.name.length || '0'} / 100</small>
                    </div>
                </label>
                <input className="form-input"
                       id="edit-objective-name"
                       name="edit-objective-name"
                       placeholder="Nombre"
                       maxLength={100}
                       value={values.name}
                       onChange={(e) => onChange && onChange({ ...values, name: e.target.value })} />
                <small className="form-error">{errors?.name}</small>
            </div>
            <div className="form-group">
                <label htmlFor="edit-objective-description" className="form-label">
                    <div className="flex justify-between">
                        <small>Descripción</small>
                        <small className="text-overline">{values.description.length || '0'} / 255</small>
                    </div>
                </label>
                <textarea className="form-input"
                          id="edit-objective-description"
                          name="edit-objective-description"
                          placeholder="Descripción"
                          rows={2}
                          maxLength={255}
                          value={values.description}
                          onChange={(e) => onChange && onChange({ ...values, description: e.target.value })} />
                <small className="form-error">{errors?.description}</small>
            </div>
            {/* <div>
                <CoursesSelect onCourseChanged={onCourseChanged} courseId={values.courseId || ""} />
                <small className="form-error">{errors?.courseId}</small>
            </div> */}
        </>
    );
}

export default ObjectiveEditForm;
