import React from "react";
import { v4 as uuid } from 'uuid';

import FreeTextQuestion from "./FreeTextQuestion";
import MultipleOptionQuestion from "./MultipleOptionQuestion";

import {ToolProps, ToolType} from "../../../types/components/assessment-creator/tools";
import {QuestionSchema, QuestionTypes} from "../../../types/components/assessment-creator/questions";

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
        const newSchema: QuestionSchema = { ...schema };

        if (newSchema.options && newSchema.options.length > 0 && newSchema.options.find(x => x.value === label)) {
            return;
        }

        newSchema.options = [...(newSchema.options || []), { key: uuid(), value: label }];
        onSchemaChanged(newSchema);
    };

    const onOptionRemoved = (key: string) => {
        if (schema.options && schema.options.length > 0) {
            const newSchema: QuestionSchema = {...schema};

            if (newSchema.options) {
                const existingOption = newSchema.options.find(x => x.key === key);

                if (existingOption && newSchema.answer === existingOption.value)
                    newSchema.answer = undefined;
            }

            newSchema.options = newSchema.options?.filter(x => x.key !== key);
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
