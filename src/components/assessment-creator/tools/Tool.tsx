import React from "react";

import FreeTextQuestion from "./FreeTextQuestion";
import MultipleOptionQuestion from "./MultipleOptionQuestion";
import {QuestionOption, QuestionSchema, QuestionTypes} from "../renderer/Question";

export interface ToolType {
    hasAnswer?: boolean;
    setHasAnswer?: (x: boolean) => void;
    answer?: string;
    setAnswer?: (x: string) => void;
    isCaseSensitive?: boolean;
    setIsCaseSensitive?: (x: boolean) => void;
    options: QuestionOption[];
    addOption: (x: string) => void;
    removeOption: (x: string) => void;
};

export interface ToolProps {
    schema: QuestionSchema;
    onSchemaChanged: (x: QuestionSchema) => void;
}

const Tool = ({ schema, onSchemaChanged }: ToolProps) => {
    const Component = getComponentByType(schema.questionType);

    const onHasAnswerChanged = (newValue: boolean) => {
        const newSchema = { ...schema };

        if (!newValue) {
            newSchema.isCaseSensitive = undefined;
            newSchema.answer = undefined;
        }

        newSchema.hasAnswer = newValue;
        onSchemaChanged(newSchema);
    };

    const onAnswerChanged = (newValue: string) => {
        const newSchema = { ...schema };
        newSchema.answer = newValue;
        onSchemaChanged(newSchema);
    };

    const onIsCaseSensitiveChanged = (newValue: boolean) => {
        const newSchema = { ...schema };
        newSchema.isCaseSensitive = newValue;
        onSchemaChanged(newSchema);
    };

    const onOptionAdded = (label: string) => {
        const newSchema = { ...schema };

        if (newSchema.options && newSchema.options.length > 0 && newSchema.options.find(x => x.label === label)) {
            console.log(label);
            return;
        }

        newSchema.options = [...(newSchema.options || []), { label }];
        onSchemaChanged(newSchema);
    };

    const onOptionRemoved = (label: string) => {
        if (schema.options && schema.options.length > 0) {
            const newSchema = {...schema};

            if (newSchema.answer === label) {
                newSchema.answer = undefined;
            }

            newSchema.options = newSchema.options?.filter(x => x.label !== label);
            onSchemaChanged(newSchema);
        }
    }

    if (!Component) return null;

    return <Component hasAnswer={schema.hasAnswer || false}
                      setHasAnswer={onHasAnswerChanged}
                      answer={schema.answer || ''}
                      setAnswer={onAnswerChanged}
                      isCaseSensitive={schema.isCaseSensitive || false}
                      setIsCaseSensitive={onIsCaseSensitiveChanged}
                      options={schema.options || []}
                      addOption={onOptionAdded}
                      removeOption={onOptionRemoved} />
};

const getComponentByType = (type: string): React.ComponentType<ToolType> | null => {
    switch (type) {
        case QuestionTypes.FREE_TEXT: return FreeTextQuestion;
        case QuestionTypes.MULTIPLE: return MultipleOptionQuestion;
    }

    return null;
}

export default Tool;
