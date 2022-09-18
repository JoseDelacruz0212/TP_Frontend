import React from "react";
import Select from "react-select";

import {CourseOption} from "../../types/communication/responses/courses";

import CourseService from "../../services/CourseService";
import useSelect from "../../hooks/useSelect";

const getValue = (x: CourseOption) => x.id;
const getLabel = (x: CourseOption) => x.name;

const CourseSelect = ({ courseId, onCourseChanged }: { courseId?: string, onCourseChanged: (x?: string) => void }) => {
    const selectProps = useSelect(
        CourseService.getCoursesForCombo,
        getValue,
        getLabel,
        onCourseChanged,
        courseId
    );

    return (
        <div className="form-group">
            <label htmlFor="edit-assessment-course" className="form-label">
                <small>Curso</small>
            </label>
            <Select {...selectProps}
                    id="edit-assessment-course"
                    name="edit-assessment-course"
                    placeholder="Curso"
                    noOptionsMessage={({ inputValue }) => "No se encontraron cursos"} />
        </div>
    )
};

export default CourseSelect;
