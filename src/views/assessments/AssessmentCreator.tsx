import React, {useState} from "react";
import { v4 as uuid } from 'uuid';
import {IoRocketOutline, IoSaveOutline} from "react-icons/io5";

import QuestionRenderer from "../../components/assessment-creator/renderer/QuestionRenderer";
import Tools from "../../components/assessment-creator/tools/Tools";
import GeneralInfo from "../../components/assessment-creator/information/GeneralInfo";
import {QuestionSchema, QuestionType} from "../../types/components/assessment-creator/questions";

const courseOptions = [
    {
        key: '1',
        value: 'Matemática'
    },
    {
        key: '2',
        value: 'Química'
    },
    {
        key: '3',
        value: 'Biología'
    },
    {
        key: '4',
        value: 'Comunicación'
    },
    {
        key: '5',
        value: 'Arte'
    }
];

const AssessmentCreator = () => {
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [courseId, setCourseId] = useState<string | null>(null);
    const [title, setTitle] = useState<string | null>(null);

    const clearSelectedQuestion = () => setQuestions(questions.map(x => ({ ...x, selected: false })));

    const publishAssessment = () => console.log("publish assessment");
    const saveQuestions = () => console.log(questions);

    const onQuestionAdd = (schema: QuestionSchema) => setQuestions([...questions, {
        id: uuid(),
        schema,
        order: questions.length + 1,
        selected: false
    }]);

    const onQuestionUpdate = (schema: QuestionSchema) =>
        setQuestions(questions.map(question => question.selected ? { ...question, schema } : question));

    return (
        <div className="flex flex-col space-y-5">
            <div className="flex justify-end">
                <div className="flex space-x-3">
                    <button className="bg-secondary rounded-md px-2 py-1 hover:bg-secondary-dark h-8 flex items-center space-x-2"
                            onClick={() => publishAssessment()}>
                        <IoRocketOutline />
                        <span className="hidden sm:block">Publicar</span>
                    </button>
                    <button className="bg-secondary rounded-md px-2 py-1 hover:bg-secondary-dark h-8 flex items-center space-x-2"
                            onClick={() => saveQuestions()}>
                        <IoSaveOutline />
                        <span className="hidden sm:block">Guardar</span>
                    </button>
                </div>
            </div>
            <div className="flex flex-col space-x-0 space-y-5 lg:flex-row lg:space-x-5 lg:space-y-0 min-h-full">
                <div className="bg-surface shadow rounded-md flex-1 p-4 flex flex-col space-y-5">
                    <div className="bg-gray-100 rounded-md h-64 min-h-full lg:flex-1 lg:min-h-0 overflow-y-auto p-5">
                        <QuestionRenderer schema={questions}
                                          setSchema={setQuestions} />
                    </div>
                </div>
                <div className="flex flex-col w-full lg:w-1/2 space-y-5">
                    <div className="bg-surface shadow rounded-md w-full p-4">
                        <GeneralInfo courseOptions={courseOptions}
                                     courseId={courseId || ""}
                                     setCourseId={setCourseId}
                                     title={title || ""}
                                     setTitle={setTitle} />
                    </div>
                    <div className="bg-surface shadow rounded-md w-full p-4">
                        <Tools selectedQuestion={questions.find(x => x.selected)?.schema}
                               onQuestionAdd={onQuestionAdd}
                               onQuestionUpdate={onQuestionUpdate}
                               onClearSelectedClicked={clearSelectedQuestion} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssessmentCreator;
