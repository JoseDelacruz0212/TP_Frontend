import React, {useState} from "react";
import { v4 as uuid } from 'uuid';
import { IoAddOutline } from "react-icons/io5";

import Tool, {QuestionSchema, ToolTypes} from "../../components/assessment-creator/tools/Tool";
import QuestionRenderer from "../../components/assessment-creator/renderer/QuestionRenderer";
import {QuestionType} from "../../components/assessment-creator/renderer/Question";

const AssessmentCreator = () => {
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [schema, setSchema] = useState<QuestionSchema>({
        questionType: ToolTypes.MULTIPLE,
        question: ""
    });

    const saveQuestions = () => {
        console.log(questions);
    }

    const onQuestionTypeChanged = (questionType: string) => setSchema({ ...schema, questionType });
    const onQuestionChanged = (question: string) => setSchema({ ...schema, question });

    const onAddQuestionClicked = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // TODO: add validations
        if (isValid(schema)) {
            setQuestions([...questions, {
                id: uuid(),
                schema,
                order: questions.length + 1,
                selected: false
            }]);

            setSchema({ questionType: schema.questionType, question: "" });
        } else {
            console.log("Invalid schema");
        }
    };

    return (
        <div className="flex flex-col space-x-0 space-y-5 lg:flex-row lg:space-x-5 lg:space-y-0 min-h-full">
            <div className="bg-surface shadow rounded-md flex-1 p-4 flex flex-col space-y-5">
                <div className="flex justify-between">
                    <small className="subtitle">Diseñador</small>
                    <button className="bg-secondary rounded-md px-2 py-1 hover:bg-secondary-dark"
                            onClick={() => saveQuestions()}>
                        Guardar
                    </button>
                </div>
                <div className="bg-gray-100 rounded-md h-64 min-h-full lg:flex-1 lg:min-h-0 overflow-y-auto p-5">
                    <QuestionRenderer schema={questions} setSchema={setQuestions} />
                </div>
            </div>
            <div className="bg-surface shadow rounded-md w-full lg:w-1/3 p-4 flex flex-col space-y-5">
                <div className="flex justify-between space-x-2">
                    <small className="subtitle">Herramientas</small>
                    <button type="submit" form="add-question-form" className="bg-secondary w-7 h-7 rounded-full px-2 py-1 hover:bg-secondary-dark flex justify-center items-center">
                        <IoAddOutline size={50} />
                    </button>
                </div>
                <form id="add-question-form" className="flex flex-col divide-y space-y-5" onSubmit={onAddQuestionClicked}>
                    <div className="form-group">
                        <label htmlFor="question-type-select" className="form-label">
                            <small>Tipo de pregunta</small>
                        </label>
                        <select className="form-input select"
                                id="question-type-select"
                                name="question-type"
                                value={schema.questionType}
                                placeholder="Tipo de pregunta"
                                onChange={(e) => onQuestionTypeChanged(e.target.value)} >
                            <option value={ToolTypes.MULTIPLE}>Opción múltiple</option>
                            <option value={ToolTypes.FREE_TEXT}>Respuesta libre</option>
                        </select>
                    </div>
                    <div className="pt-5 flex flex-col space-y-5">
                        <div className="form-group">
                            <label htmlFor="question-description" className="form-label">
                                <small>Pregunta</small>
                            </label>
                            <textarea className="form-input"
                                      id="question-description"
                                      name="question-description"
                                      placeholder="Pregunta"
                                      rows={4}
                                      maxLength={255}
                                      value={schema.question}
                                      onChange={(e) => onQuestionChanged(e.target.value)} />
                        </div>
                        <Tool schema={schema} onSchemaChanged={setSchema} />
                    </div>
                </form>
            </div>
        </div>
    );
};

const isValid = (schema: QuestionSchema) => {
    return true;
};

export default AssessmentCreator;
