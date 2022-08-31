import React from "react";

import {GeneralInfoProps} from "../../../types/components/assessment-creator/information";

const GeneralInfo = ({ courseOptions, courseId, setCourseId, title, setTitle }: GeneralInfoProps) => {
    return (
        <div className="flex flex-col space-y-5">
            <div className="form-group">
                <label htmlFor="assessment-course" className="form-label">
                    <small>Curso</small>
                </label>
                <select className="form-input select"
                        id="assessment-course"
                        name="assessment-course"
                        value={courseId}
                        disabled={courseOptions.length === 0}
                        placeholder="Curso"
                        onChange={(e) => setCourseId(e.target.value)} >
                    { courseOptions && courseOptions.length > 0 && <option value="">Seleccione una opción</option> }
                    { courseOptions.map(option => (
                        <option key={option.key} value={option.key}>
                            {option.value}
                        </option>
                    )) }
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="free-text-question-answer" className="form-label">
                    <div className="flex justify-between">
                        <small>Título</small>
                        <small className="text-overline">{title.length || '0'} / 50</small>
                    </div>
                </label>
                <input className="form-input"
                       id="free-text-question-answer"
                       name="free-text-question-answer"
                       placeholder="Título"
                       maxLength={50}
                       value={title}
                       onChange={(e) => setTitle(e.target.value)} />
            </div>
        </div>
    );
};

export default GeneralInfo;
