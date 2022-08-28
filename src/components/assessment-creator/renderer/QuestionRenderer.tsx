import React, {useState} from "react";

import Question, {QuestionType} from "./Question";

interface QuestionRenderedProps {
    schema: QuestionType[];
    setSchema: (x: QuestionType[]) => void;
};

const QuestionRenderer = ({ schema, setSchema }: QuestionRenderedProps) => {
    const [dragId, setDragId] = useState<string>();

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        setDragId(e.currentTarget.id);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        const dragItem = schema.find(x => x.id.toString() === dragId);
        const dropItem = schema.find(x => x.id.toString() === e.currentTarget.id);

        if (!dropItem || !dragItem) return;
        if (dropItem.order === dragItem.order) return;

        const dropItemOrder = dropItem.order;

        const getNewOrder = (currentOrder: number) => {
            if (dragItem.order > dropItem.order) {
                if (currentOrder >= dropItemOrder)
                    return currentOrder + 1;
            } else {
                if (currentOrder <= dropItemOrder)
                    return currentOrder - 1;
            }

            return currentOrder;
        };

        const newSchema = schema.map(x =>  ({ ...x, order: getNewOrder(x.order)}));
        const newDragItem = newSchema.find(x => x.id.toString() === dragId);

        if (!newDragItem) return;

        newDragItem.order = dropItemOrder;
        setSchema(newSchema);
    }

    const onQuestionDeletedHandler = (id: string) => setSchema(schema.filter(x => x.id !== id))
    const onSelectedQuestionChangedHandler = (id: string) => setSchema(schema.map(x => ({...x, selected: (x.id === id)})));

    return (
        <div className="flex flex-col space-y-3">
            {
                schema.sort((a, b) => a.order - b.order).map(question => (
                    <Question key={question.id}
                              question={question}
                              handleDrag={handleDrag}
                              handleDrop={handleDrop}
                              onQuestionDeleted={onQuestionDeletedHandler}
                              onSelectedQuestionChanged={onSelectedQuestionChangedHandler}  />
                ))
            }
        </div>
    );
};

export default QuestionRenderer;
