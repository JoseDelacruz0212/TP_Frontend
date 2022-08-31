import {Option} from "../common/options";
import {QuestionSchema} from "./questions";

export type QuestionInputProps = {
    value: string;
    onChange: (x: string) => void;
}

export type ToolsProps = {
    selectedQuestion?: QuestionSchema;
    onQuestionAdd: (schema: QuestionSchema) => void;
    onQuestionUpdate: (schema: QuestionSchema) => void;
    onClearSelectedClicked: () => void;
};

export type ToolType = {
    hasAnswer?: boolean;
    setHasAnswer?: (x: boolean) => void;
    answer?: string;
    setAnswer?: (x: string) => void;
    isCaseSensitive?: boolean;
    setIsCaseSensitive?: (x: boolean) => void;
    options: Option[];
    addOption: (x: string) => void;
    removeOption: (x: string) => void;
};

export type ToolProps = {
    schema: QuestionSchema;
    onSchemaChanged: (x: QuestionSchema) => void;
};
