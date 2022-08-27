import React, {useState} from "react";

import Question, {QuestionType} from "./Question";

interface QuestionRenderedProps {
    schema: QuestionType[];
    setSchema: (x: QuestionType[]) => void;
}

const QuestionRenderer = ({ schema, setSchema }: QuestionRenderedProps) => {
    const [dragId, setDragId] = useState<string>();

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        setDragId(e.currentTarget.id);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        const dragItem = schema.find(x => x.order.toString() === dragId);
        const dropItem = schema.find(x => x.order.toString() === e.currentTarget.id);

        const dragItemOrder = dragItem?.order;
        const dropItemOrder = dropItem?.order;

        const newState = schema.map(x => {
            const newValue = { ...x };

            // TODO: implement logic for reordering

            return newValue;
        });

        setSchema(newState);
    }

    const onQuestionDeletedHandler = (order: number) => {
        const newState = schema.filter(x => x.order !== order);
        setSchema(newState);
    };

    return (
        <div className="flex flex-col space-y-3">
            {
                schema.sort((a, b) => a.order - b.order).map(question => (
                    <Question key={question.order}
                              question={question}
                              handleDrag={handleDrag}
                              handleDrop={handleDrop}
                              onQuestionDeleted={onQuestionDeletedHandler} />
                ))
            }
        </div>
    );
};

export default QuestionRenderer;
