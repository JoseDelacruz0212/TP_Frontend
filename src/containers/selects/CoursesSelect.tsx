import React, {useEffect, useState} from "react";
import Select, {PropsValue} from "react-select";

import {CourseOption} from "../../types/communication/responses/courses";

import {SelectOption, selectStyles} from "../../components/common/select/Select";

import CourseService from "../../services/CourseService";

const CourseSelect = ({ courseId, onCourseChanged }: { courseId?: string, onCourseChanged: (x?: string) => void }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [courses, setCourses] = useState<CourseOption[]>([]);
    const [selectedOption, setSelectedOption] = useState<PropsValue<SelectOption>>(null);

    const onSelectedCourseIdHandler = (courseId?: string) => {
        onCourseChanged(courseId);

        const selectedCourse = courses.find(x => x.id === courseId);
        if (selectedCourse) {
            const newSelectedOption = { value: selectedCourse.id, label: selectedCourse.name };
            setSelectedOption(newSelectedOption);
        }
    }

    useEffect(() => {
        setIsLoading(true);

        CourseService.getCoursesForCombo().then(
            values => {
                setIsLoading(false);
                setCourses(values);

                const selectedCourse = values.find(x => x.id === courseId);
                if (selectedCourse) {
                    const newSelectedOption = { value: selectedCourse.id, label: selectedCourse.name };
                    setSelectedOption(newSelectedOption);
                }
            }
        ).catch(() => setIsLoading(false));
    }, []);

    return (
        <div className="form-group">
            <label htmlFor="edit-assessment-course" className="form-label">
                <small>Curso</small>
            </label>
            <Select id="edit-assessment-course"
                    name="edit-assessment-course"
                    placeholder="Curso"
                    isDisabled={!courses || courses?.length === 0}
                    styles={selectStyles}
                    value={selectedOption}
                    isLoading={isLoading}
                    noOptionsMessage={({ inputValue }) => "No se encontraron cursos"}
                    onChange={(option: SelectOption | null) => onSelectedCourseIdHandler(option?.value || undefined)}
                    options={courses.map(course => ({ value: course.id, label: course.name }))} />
        </div>
    )
};

export default CourseSelect;
