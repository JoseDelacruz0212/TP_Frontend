import React, {useEffect, useState} from "react";

import {CourseOption} from "../../types/communication/responses/courses";

import CourseService from "../../services/CourseService";

const CourseSelect = ({ courseId, onCourseChanged }: { courseId?: string, onCourseChanged: (x: string) => void }) => {
    const [courses, setCourses] = useState<CourseOption[]>([]);
    const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>(courseId);

    const onSelectedCourseIdHandler = (courseId: string) => {
        onCourseChanged(courseId);
        setSelectedCourseId(courseId);
    }

    useEffect(() => {
        CourseService.getCoursesForCombo().then(
            values => setCourses(values)
        );
    }, []);

    return (
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
    )
};

export default CourseSelect;
