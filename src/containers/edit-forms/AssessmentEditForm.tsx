import React, {useEffect, useState} from "react";
import moment from "moment";

import {FormInputs} from "../../types/components/common/modal";
import {Assessment} from "../../types/communication/responses/assessment";
import {CourseOption} from "../../types/communication/responses/courses";

import CourseService from "../../services/CourseService";

const AssessmentEditForm = ({ values, onChange }: FormInputs<Assessment>) => {
    const [courses, setCourses] = useState<CourseOption[]>([]);
    const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>(values.courses?.id);

    const onSelectedCourseIdHandler = (courseId: string) => {
        onChange && onChange({ ...values, courseId });
        setSelectedCourseId(courseId);
    }

    useEffect(() => {
        CourseService.getCoursesForCombo().then(
            values => setCourses(values)
        );
    }, []);

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
                       value={moment(values.availableOn).format('yyyy-MM-DDTHH:mm')}
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
            <div className="form-group">
                <label htmlFor="edit-assessment-course" className="form-label">
                    <small>Curso</small>
                </label>
                <select className="form-input select"
                        id="edit-assessment-course"
                        name="edit-assessment-course"
                        value={selectedCourseId || ""}
                        placeholder="Institución"
                        disabled={!courses || courses?.length === 0}
                        onChange={(e) => onSelectedCourseIdHandler(e.target.value)} >
                    <option value="" disabled>Seleccione una opción</option>
                    {
                        courses && courses.map(option => (
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

export default AssessmentEditForm;
