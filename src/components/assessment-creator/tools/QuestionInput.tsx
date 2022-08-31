import React from "react";

import {QuestionInputProps} from "../../../types/components/assessment-creator/tools";

const QuestionInput = ({ value, onChange }: QuestionInputProps) => {
    return (
        <div className="form-group">
            <label htmlFor="question-description" className="form-label">
                <div className="flex justify-between">
                    <small>Pregunta</small>
                    <small className="text-overline">{value.length || '0'} / 500</small>
                </div>
            </label>
            <textarea className="form-input"
                      id="question-description"
                      name="question-description"
                      placeholder="Pregunta"
                      rows={7}
                      maxLength={500}
                      value={value}
                      onChange={(e) => onChange(e.target.value)} />
        </div>
    );
};

export default QuestionInput;
