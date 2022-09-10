import React from "react";
import {useEditor, useNode} from "@craftjs/core";

import {addZerosToPoints} from "../../../../../util/assessment-creator";
import HasPermission from "../../../../../hoc/with-permission/HasPermission";

import {Permissions} from "../../../../../types/app/auth";

interface FreeTextProps {
    question?: string;
    answerInput?: string;
    answer?: string;
    points?: number;
    hasAnswer?: boolean;
    isCaseSensitive?: boolean;
    longAnswer?: boolean;
    assignedPoints?: number;
    hasPointsToAssign?: boolean;
}

const FreeText = ({ question, answerInput, longAnswer, points, assignedPoints, hasPointsToAssign }: FreeTextProps) => {
    const { enabled } = useEditor((state) => ({ enabled: state.options.enabled }));
    const { connectors: { connect, drag }, actions: { setProp } } = useNode();

    return (
        <div className="px-2 py-4 flex flex-col space-y-5" ref={ref => connect(drag(ref!))}>
            {
                question ?
                    <p className="break-words"><small className="text-overline">({addZerosToPoints(points)} puntos)</small> {question}</p>
                    :
                    <small>Haga click aqui para editar la pregunta</small>
            }
            {
                longAnswer ?
                    <div className="flex flex-col">
                        <textarea className="form-input"
                                  id="free-text-question-long-answer"
                                  name="free-text-question-long-answer"
                                  maxLength={255}
                                  rows={4}
                                  value={answerInput || ""}
                                  onChange={(e) => setProp((props: FreeTextProps) => props.answerInput = e.target.value)} />
                        <small className="text-overline self-end">{answerInput?.length || '0'} / 255</small>
                    </div>
                    :
                    <div className="flex flex-col">
                        <input className="form-input"
                               id="free-text-question-answer"
                               name="free-text-question-answer"
                               maxLength={50}
                               value={answerInput || ""}
                               onChange={(e) => setProp((props: FreeTextProps) => props.answerInput = e.target.value)} />
                        <small className="text-overline self-end">{answerInput?.length || '0'} / 50</small>
                    </div>
            }
            <HasPermission permission={Permissions.ASSESSMENT_ASSIGN_POINTS}>
            {
                !enabled && hasPointsToAssign &&
                <div className="flex justify-end">
                    <small>Asignar puntos:</small>
                    <div className="flex items-center space-x-2">
                        <input type="number"
                               className="form-input"
                               id="free-text-question-assigned-points"
                               min={0}
                               max={points}
                               name="free-text-question-assigned-points"
                               value={assignedPoints || ""}
                               onChange={(e) => setProp((props: FreeTextProps) => props.assignedPoints = parseInt(e.target.value || "0"))} />
                        <span className="subtitle-sm">/ {addZerosToPoints(points)}</span>
                    </div>
                </div>
            }
            </HasPermission>
        </div>
    )
};

const FreeTextSettings = () => {
    const { question, points, answer, hasAnswer, isCaseSensitive, longAnswer, actions: { setProp } } = useNode(node => ({
        question: node.data.props.question,
        answer: node.data.props.answer,
        points: node.data.props.points,
        hasAnswer: node.data.props.hasAnswer,
        isCaseSensitive: node.data.props.isCaseSensitive,
        longAnswer: node.data.props.longAnswer
    }));

    return (
        <div className="flex flex-col space-y-5">
            <div className="form-group">
                <label htmlFor="multiple-option-question" className="form-label">
                    <div className="flex justify-between">
                        <small>Pregunta</small>
                        <small className="text-overline">{question?.length || '0'} / 500</small>
                    </div>
                </label>
                <textarea className="form-input"
                          id="multiple-option-question"
                          name="multiple-option-question"
                          placeholder="Pregunta"
                          rows={5}
                          maxLength={500}
                          value={question || ""}
                          onChange={(e) => setProp((props: FreeTextProps) => props.question = e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="multiple-option-points" className="form-label">
                    <small>Puntos</small>
                </label>
                <input type="number"
                       className="form-input"
                       id="multiple-option-points"
                       name="multiple-option-points"
                       min={0}
                       placeholder="Puntos"
                       value={points || ""}
                       onChange={(e) => setProp((props: FreeTextProps) => props.points = parseInt(e.target.value || "0"))} />
            </div>
            <div className="form-group-row">
                <label htmlFor="free-text-question-long-answer" className="form-label">
                    <small>Respuesta de texto largo</small>
                </label>
                <input type="checkbox"
                       id="free-text-question-long-answer"
                       name="free-text-question-long-answer"
                       checked={longAnswer || false}
                       onChange={(e) => setProp((props: FreeTextProps) => props.longAnswer = e.target.checked)} />
            </div>
            {
                !longAnswer &&
                <>
                    <div className="form-group-row">
                        <label htmlFor="free-text-question-with-answer" className="form-label">
                            <small>Definir respuesta</small>
                        </label>
                        <input type="checkbox"
                               id="free-text-question-with-answer"
                               name="free-text-question-with-answer"
                               checked={hasAnswer || false}
                               onChange={(e) => setProp((props: FreeTextProps) => props.hasAnswer = e.target.checked)} />
                    </div>
                    {
                        hasAnswer &&
                        <div className="flex flex-col space-y-5 border rounded-md p-4">
                            <div className="form-group">
                                <label htmlFor="free-text-question-answer" className="form-label">
                                    <div className="flex justify-between">
                                        <small>Respuesta</small>
                                        <small className="text-overline">{answer?.length || '0'} / 50</small>
                                    </div>
                                </label>
                                <input className="form-input"
                                       id="free-text-question-answer"
                                       name="free-text-question-answer"
                                       placeholder="Respuesta"
                                       maxLength={50}
                                       value={answer || ""}
                                       onChange={(e) => setProp((props: FreeTextProps) => props.answer = e.target.value)} />
                            </div>
                            <div className="form-group-row">
                                <label htmlFor="free-text-question-case-sensitive" className="form-label">
                                    <small>Respetar mayúsculas</small>
                                </label>
                                <input type="checkbox"
                                       id="free-text-question-case-sensitive"
                                       name="free-text-question-case-sensitive"
                                       checked={isCaseSensitive || false}
                                       onChange={(e) => setProp((props: FreeTextProps) => props.isCaseSensitive = e.target.checked)} />
                            </div>
                        </div>
                    }
                </>
            }
        </div>
    );
};

FreeText.craft = {
    related: {
        settings: FreeTextSettings
    }
};

export default FreeText;
