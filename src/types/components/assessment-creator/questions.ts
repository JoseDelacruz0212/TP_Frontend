import {Option} from "../common/options";
import React from "react";

export type QuestionSchema = {
    questionType: string;
    question: string;
    hasAnswer?: boolean;
    answer?: string;
    isCaseSensitive?: boolean;
    options?: Option[];
    points: number;
};

export type QuestionType = {
    id: string;
    schema: QuestionSchema;
    order: number;
    selected: boolean;
};

export type QuestionRenderedProps = {
    schema: QuestionType[];
    setSchema: (x: QuestionType[]) => void;
};

export type QuestionProps = {
    question: QuestionType;
    handleDrag: (e: React.DragEvent<HTMLDivElement>) => void;
    handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    onQuestionDeleted: (id: string) => void;
    onSelectedQuestionChanged: (id: string) => void;
};

export const QuestionTypes = Object.freeze({
    MULTIPLE: 'multiple',
    FREE_TEXT: 'free-text'
});
