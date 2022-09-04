import React, {useEffect, useState} from "react";
import {IoAddOutline, IoSaveOutline} from "react-icons/io5";

import Tool from "./Tool";
import QuestionInput from "./QuestionInput";

import {ToolsProps} from "../../../types/components/assessment-creator/tools";
import {QuestionSchema, QuestionTypes} from "../../../types/components/assessment-creator/questions";

export const defaultSchema = {
    questionType: QuestionTypes.MULTIPLE,
    question: "",
    points: 1
};

const Tools = ({
    selectedQuestion,
    onQuestionAdd,
    onQuestionUpdate,
    onClearSelectedClicked }: ToolsProps
) => {
    const [schema, setSchema] = useState<QuestionSchema>(selectedQuestion || defaultSchema);

    useEffect(() => setSchema(selectedQuestion || defaultSchema), [selectedQuestion]);

    const onClearSelectedClickedHandler = () => {
        setSchema(defaultSchema);
        onClearSelectedClicked();
    };

    const onAddClickedHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isValid(schema)) {
            if (!selectedQuestion) {
                onQuestionAdd(schema);
                setSchema({ questionType: schema.questionType, question: "", points: 1 });
            } else {
                onQuestionUpdate(schema);
            }
        } else {
            console.log("Invalid schema");
        }
    };

    const onQuestionTypeChanged = (questionType: string) => setSchema({ ...schema, questionType });
    const onQuestionChanged = (question: string) => setSchema({ ...schema, question });
    const onQuestionPointsChanged = (points: number) => setSchema({ ...schema, points });

    return (
        <div className="w-full flex flex-col space-y-5">
            <div className="flex justify-between space-x-2 items-center">
                <small className="subtitle">Herramientas</small>
                <div className="flex space-x-2 h-8">
                    <button type="submit" form="add-question-form" className="bg-secondary rounded-md px-2 py-1 hover:bg-secondary-dark flex justify-center items-center">
                        {
                            !selectedQuestion ? <IoAddOutline /> : <IoSaveOutline />
                        }
                    </button>
                    {
                        selectedQuestion &&
                        <button className="bg-secondary rounded-md px-2 py-1 hover:bg-secondary-dark"
                                onClick={onClearSelectedClickedHandler}>
                            Nuevo
                        </button>
                    }
                </div>
            </div>
            <form id="add-question-form" className="flex flex-col divide-y space-y-5" onSubmit={onAddClickedHandler}>
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
                        <option value={QuestionTypes.MULTIPLE}>Opción múltiple</option>
                        <option value={QuestionTypes.FREE_TEXT}>Respuesta libre</option>
                    </select>
                </div>
                <div className="pt-5 flex flex-col space-y-5">
                    <QuestionInput value={schema.question} onChange={onQuestionChanged} />
                    <div className="form-group">
                        <label htmlFor="question-points" className="form-label">
                            <small>Puntos</small>
                        </label>
                        <input type="number"
                               min={1}
                               className="form-input"
                               id="question-points"
                               placeholder="Puntos"
                               value={schema.points}
                               onChange={(e) => onQuestionPointsChanged(parseInt(e.target.value))}/>
                    </div>
                    <Tool schema={schema} onSchemaChanged={setSchema} />
                    <button type="submit" form="add-question-form" className="bg-secondary rounded-md px-2 py-1 hover:bg-secondary-dark flex justify-center items-center">
                        Agregar pregunta
                    </button>
                </div>
            </form>
        </div>
    );
};

const isValid = (schema: QuestionSchema) => {
    return true;
};

export default Tools;
