import React, {useState} from "react";
import {useEditor, useNode} from "@craftjs/core";
import {IoAddOutline, IoTrashOutline} from "react-icons/io5";

import {Option} from "../../../../../types/common";

import {addZerosToPoints} from "../../../../../util/assessment-creator";

interface MultipleOptionProps {
    question?: string;
    options?: Option[];
    multiple?: boolean;
    answer?: string;
    points?: number;
    answerInput?: string;
    assignedPoints?: number;
    hasPointsToAssign?: boolean;
}

const MultipleOption = ({ question, options, multiple, points, answerInput, assignedPoints, hasPointsToAssign }: MultipleOptionProps) => {
    const { enabled } = useEditor((state) => ({ enabled: state.options.enabled }));
    const { connectors: { connect, drag }, actions: { setProp } } = useNode();

    return (
        <div className="px-2 py-4 flex flex-col space-y-5" ref={ref => connect(drag(ref!))}>
            {
                question ?
                    <p className="break-words"><small className="text-overline">({addZerosToPoints(points)} puntos)</small> {question}</p>
                    :
                    <small>Haga click aqui para editar la pregunta de opción múltiple</small>
            }
            {
                options && options.length > 0 &&
                <ul>
                {
                    options.map((option: Option) => (
                        <li key={option.value}>
                            <label className="flex space-x-2 items-center">
                                <input checked={option.value === answerInput}
                                       type={multiple ? "checkbox" : "radio"}
                                       name="multiple-option-answer-input"
                                       disabled={!enabled}
                                       readOnly={!enabled}
                                       value={option.value}
                                       onChange={(e) => setProp((props: MultipleOptionProps) => props.answerInput = e.target.value)} />
                                <span>{option.label}</span>
                            </label>
                        </li>
                    ))
                }
                </ul>
            }
            {
                !enabled &&
                <div className="flex justify-end">
                    <div className="flex items-center space-x-2">
                        <small>Puntos:</small>
                        <div className="flex items-center space-x-2">
                            <input type="number"
                                   className="form-input w-14"
                                   id="free-text-question-assigned-points"
                                   disabled
                                   min={0}
                                   max={points}
                                   name="free-text-question-assigned-points"
                                   value={assignedPoints || ""}
                                   onChange={(e) => setProp((props: MultipleOptionProps) => props.assignedPoints = parseInt(e.target.value || "0"))} />
                            <span className="subtitle-sm">/ {addZerosToPoints(points)}</span>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
};

const MultipleOptionSettings = () => {
    const [newOption, setNewOption] = useState("");

    const { question, options, /*multiple,*/ points, answer, actions: { setProp } } = useNode(node => ({
        question: node.data.props.question,
        options: node.data.props.options,
        // multiple: node.data.props.multiple,
        answer: node.data.props.answer,
        points: node.data.props.points
    }));

    const onNewOptionClicked = () => {
        setNewOption("");

        const newOptionsItem = { value: newOption, label: newOption };

        setProp((props: MultipleOptionProps) => {
            if (props.options) {
                props.options = [...props.options, newOptionsItem];
            } else {
                props.options = [newOptionsItem];
            }
        });
    }

    const removeOption = (key: string) => {
        setProp((props: MultipleOptionProps) => {
            if (props.options) {
                props.options = props.options.filter(option => option.value !== key);
            }
        });
    }

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
                          onChange={(e) => setProp((props: MultipleOptionProps) => props.question = e.target.value)} />
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
                       onChange={(e) => setProp((props: MultipleOptionProps) => props.points = parseInt(e.target.value || "0"))} />
            </div>
            {/*<div className="form-group-row">
                <label htmlFor="multiple-option-multiple" className="form-label">
                    <small>¿Permitir marcar más de una respuesta?</small>
                </label>
                <input type="checkbox"
                       id="multiple-option-multiple"
                       name="multiple-option-multiple"
                       checked={multiple || false}
                       onChange={(e) => setProp((props: MultipleOptionProps) => props.multiple = e.target.checked)} />
            </div>*/}
            <div className="form-group space-y-5">
                <label htmlFor="multiple-option-options" className="form-label">
                    <small>Opciones</small>
                </label>
                <div className="flex items-center">
                    <div className="flex-1 px-2">
                        <input className="border-b w-full"
                               id="multiple-option-options"
                               name="multiple-option-options"
                               placeholder="Nueva opción"
                               value={newOption}
                               onChange={(e) => setNewOption(e.target.value)} />
                    </div>
                    <div className="flex items-center justify-center">
                        <button onClick={onNewOptionClicked} type="button" className="bg-secondary rounded-full w-6 h-6 px-2 py-1 hover:bg-secondary-dark flex justify-center items-center">
                            <IoAddOutline size={50} />
                        </button>
                    </div>
                </div>
                {
                    options && options.length > 0 &&
                    <div className="p-2 border rounded-md flex flex-col space-y-3">
                        {
                            options.map((option: Option) => (
                                <div key={option.value} className="flex justify-between">
                                    <small>{option.label}</small>
                                    <IoTrashOutline className="text-error"
                                                    role="button"
                                                    onClick={() => removeOption(option.value as string)}/>
                                </div>
                            ))
                        }
                    </div>
                }
            </div>
            <div className="form-group">
                <label htmlFor="multiple-question-answer" className="form-label">
                    <small>Opción correcta (respuesta)</small>
                </label>
                <select className={`form-input select ${!options || options.length === 0 ? 'cursor-not-allowed' : ''}`}
                        id="multiple-question-answer"
                        name="multiple-question-answer"
                        value={answer || ""}
                        placeholder="Respuesta"
                        disabled={!options || options.length === 0}
                        onChange={(e) => setProp((props: MultipleOptionProps) => props.answer = e.target.value)}>
                    { options && options.length > 0 && <option value="">Seleccione una opción</option> }
                    {
                        options && options.map((option: Option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))
                    }
                </select>
            </div>
        </div>
    );
};

MultipleOption.craft = {
    related: {
        settings: MultipleOptionSettings
    }
};

export default MultipleOption;
