import React from "react";

import {ToolType} from "./Tool";

const FreeTextQuestion = (props: ToolType) => {
    return (
        <>
            <div className="form-group-row">
                <label htmlFor="free-text-question-with-answer" className="form-label">
                    <small>Definir respuesta</small>
                </label>
                <input type="checkbox"
                       id="free-text-question-with-answer"
                       name="free-text-question-with-answer"
                       checked={props.hasAnswer}
                       onChange={() => props.setHasAnswer && props.setHasAnswer(!props.hasAnswer)} />
            </div>
            {
                props.hasAnswer &&
                <div className="flex flex-col space-y-5 border rounded-md p-4">
                    <div className="form-group">
                        <label htmlFor="free-text-question-answer" className="form-label">
                            <small>Respuesta</small>
                        </label>
                        <input className="form-input"
                               id="free-text-question-answer"
                               name="free-text-question-answer"
                               placeholder="Respuesta"
                               maxLength={50}
                               value={props.answer}
                               onChange={(e) => props.setAnswer && props.setAnswer(e.target.value)} />
                    </div>
                    <div className="form-group-row">
                        <label htmlFor="free-text-question-case-sensitive" className="form-label">
                            <small>Respetar mayúsculas</small>
                        </label>
                        <input type="checkbox"
                               id="free-text-question-case-sensitive"
                               name="free-text-question-case-sensitive"
                               checked={props.isCaseSensitive}
                               onChange={() => props.setIsCaseSensitive && props.setIsCaseSensitive(!props.isCaseSensitive)} />
                    </div>
                </div>
            }
        </>
    );
};

export default FreeTextQuestion;
