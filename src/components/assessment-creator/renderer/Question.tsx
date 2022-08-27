import React, {useState} from "react";
import {IoChevronDown, IoChevronForward, IoTrashOutline} from "react-icons/io5";

import {QuestionSchema, ToolTypes} from "../tools/Tool";

export type QuestionType = {
    schema: QuestionSchema;
    order: number;
};

interface QuestionProps {
    question: QuestionType;
    handleDrag: (e: React.DragEvent<HTMLDivElement>) => void;
    handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    onQuestionDeleted: (order: number) => void;
}

// TODO: Make question types polymorphic
const Question = ({ question, handleDrag, handleDrop, onQuestionDeleted }: QuestionProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div id={question.order.toString()}
             key={question.order}
             className="border rounded-md px-4 py-2 bg-surface"
             draggable={true}
             onDragOver={(e) => e.preventDefault()}
             onDragStart={handleDrag}
             onDrop={handleDrop}>
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    { !isOpen && <IoChevronForward role="button" onClick={() => setIsOpen(!isOpen)} /> }
                    { isOpen && <IoChevronDown role="button" onClick={() => setIsOpen(!isOpen)} /> }
                    <div className="flex flex-col space-y-1">
                        <small>{getQuestionTypeNameByTypeId(question.schema.questionType)}</small>
                        <span className="subtitle-sm">{question.schema.question}</span>
                    </div>
                </div>
                <IoTrashOutline className="text-error cursor-pointer"
                                type="button"
                                onClick={() => onQuestionDeleted(question.order)} />
            </div>
            {
                isOpen &&
                <div className="pt-5">
                    <div className="flex items-center space-x-2">
                        <small className="font-bold">Respuesta:</small>
                        { question.schema.answer && <small>{question.schema.answer}</small> }
                        { !question.schema.answer && <small>No especificado (libre)</small> }
                    </div>
                    {
                        question.schema.questionType === ToolTypes.FREE_TEXT && question.schema.hasAnswer &&
                        <div className="flex items-center space-x-2">
                            <small className="font-bold">Respetar mayúsuclas:</small>
                            { question.schema.isCaseSensitive && <small>Sí</small> }
                            { !question.schema.isCaseSensitive && <small>No</small> }
                        </div>
                    }
                    {
                        question.schema.questionType === ToolTypes.MULTIPLE &&
                        <div className="space-x-2">
                            <small className="font-bold">Opciones:</small>
                            <ul className="pl-5">
                                {
                                    question.schema.options && question.schema.options.map(question => (
                                        <li>
                                            <small>{question.label}</small>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    }
                </div>
            }
        </div>
    )
};

const getQuestionTypeNameByTypeId = (typeId: string) => {
    switch (typeId) {
        case ToolTypes.MULTIPLE: return 'Opción múltiple';
        case ToolTypes.FREE_TEXT: return 'Respuesta libre';
        default:
            return '';
    }
}

export default Question;
