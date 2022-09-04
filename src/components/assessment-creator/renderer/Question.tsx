import React from "react";
import {IoTrashOutline} from "react-icons/io5";

import {QuestionProps, QuestionTypes} from "../../../types/components/assessment-creator/questions";

const Question = ({ question, handleDrag, handleDrop, onQuestionDeleted, onSelectedQuestionChanged }: QuestionProps) => {
    return (
        <div id={question.id}
             onClick={() => onSelectedQuestionChanged(question.id)}
             key={question.id}
             className={`border rounded-md px-4 py-2 bg-surface ${question.selected ? 'border border-2 border-secondary' : ''}`}
             draggable={true}
             onDragOver={(e) => e.preventDefault()}
             onDragStart={handleDrag}
             onDrop={handleDrop}>
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="flex flex-col space-y-1">
                        <small>{getQuestionTypeNameByTypeId(question.schema.questionType)}</small>
                        <span className="subtitle-sm">{question.schema.question.substring(0, 15)}{question.schema.question.length > 15 ? '...' : ''}</span>
                    </div>
                </div>
                <IoTrashOutline className="text-error cursor-pointer"
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onQuestionDeleted(question.id);
                                }} />
            </div>
        </div>
    )
};

const getQuestionTypeNameByTypeId = (typeId: string) => {
    switch (typeId) {
        case QuestionTypes.MULTIPLE: return 'Opción múltiple';
        case QuestionTypes.FREE_TEXT: return 'Respuesta libre';
        default:
            return '';
    }
}

export default Question;
