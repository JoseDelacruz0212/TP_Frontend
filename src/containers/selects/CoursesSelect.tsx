import React from "react";
import Select from "react-select";

import CourseService from "../../services/CourseService";
import useFetchSelect from "../../hooks/useFetchSelect";

const getCourses = () => CourseService.getCoursesForCombo().then(data => data.map(x => ({ value: x.id, label: x.name })))

const CourseSelect = ({ courseId, onCourseChanged }: { courseId?: string, onCourseChanged: (x?: string) => void }) => {
    const selectProps = useFetchSelect(
        getCourses,
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
