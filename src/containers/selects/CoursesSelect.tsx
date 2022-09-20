import React from "react";
import Select from "react-select";

import CourseService from "../../services/CourseService";
import useFetchSelect from "../../hooks/useFetchSelect";
import {SelectOption} from "../../hooks/useSelect";

const CourseSelect = ({ courseId, onCourseChanged }: { courseId?: string, onCourseChanged: (x?: string) => void }) => {
    const selectProps = useFetchSelect(
        () => CourseService.getCoursesForCombo().then(data => data.map(x => ({ value: x.id, label: x.name } as SelectOption))),
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
