import React from "react";
import moment from "moment";

import {Assessment} from "../../types/communication/responses/assessment";
import {FormInputProps} from "../../types/common";

import CoursesSelect from "../selects/CoursesSelect";
import {AssessmentValidation} from "../../validations/edit-forms/assessment-edit-form-validation";

const AssessmentEditForm = ({ values, onChange, errors }: FormInputProps<Assessment, AssessmentValidation>) => {
    const onCourseChanged = (courseId?: string) => {
        onChange && courseId && onChange({ ...values, courseId });
    }

    return (
        <>
            <div className="form-group">
                <label htmlFor="edit-assessment-name" className="form-label">
                    <div className="flex justify-between">
                        <small>Nombre</small>
                        <small className="text-overline">{values.name.length || '0'} / 100</small>
                    </div>
                </label>
                <input className="form-input"
                       id="edit-assessment-name"
                       name="edit-assessment-name"
                       placeholder="Nombre"
                       maxLength={100}
                       value={values.name}
                       onChange={(e) => onChange && onChange({ ...values, name: e.target.value })} />
                <small className="form-error">{errors?.name}</small>
            </div>
            <div className="form-group">
                <label htmlFor="edit-assessment-available-on" className="form-label">
                    <small>Fecha de disponibilidad</small>
                </label>
                <input className="form-input"
                       type="datetime-local"
                       id="edit-assessment-available-on"
                       name="edit-assessment-available-on"
                       placeholder="Fecha de disponibilidad"
                       min={moment(new Date()).format('yyyy-MM-DDTHH:mm')}
                       value={values.availableOn ? moment(values.availableOn).format('yyyy-MM-DDTHH:mm') : ''}
                       onChange={(e) => onChange && onChange({ ...values, availableOn: moment.utc(e.target.value).format('yyyy-MM-DDTHH:mm') })} />
                <small className="form-error">{errors?.availableOn?.toString()}</small>
            </div>
            <div className="form-group">
                <label htmlFor="edit-assessment-duration" className="form-label">
                    <small>Duración (minutos)</small>
                </label>
                <input className="form-input"
                       type="number"
                       id="edit-assessment-duration"
                       name="edit-assessment-duration"
                       placeholder="Duración"
                       value={values.duration || ''}
                       onChange={(e) => onChange && onChange({ ...values, duration: parseInt(e.target.value) })} />
                <small className="form-error">{errors?.duration}</small>
            </div>
            <div>
                <CoursesSelect onCourseChanged={onCourseChanged} courseId={values.courseId || ""} />
                <small className="form-error">{errors?.courseId}</small>
            </div>
        </>
    );
}

export default AssessmentEditForm;
