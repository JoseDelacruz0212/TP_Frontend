import React from "react";
import moment from "moment";

import {Assessment} from "../../types/communication/responses/assessment";
import {FormInputProps} from "../../types/common";

import CoursesSelect from "../selects/CoursesSelect";

const AssessmentEditForm = ({ values, onChange }: FormInputProps<Assessment>) => {
    const onCourseChanged = (courseId?: string) => {
        onChange && onChange({ ...values, courseId });
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
            </div>
            <CoursesSelect onCourseChanged={onCourseChanged} courseId={values.courses?.id || ""} />
        </>
    );
}

export default AssessmentEditForm;
