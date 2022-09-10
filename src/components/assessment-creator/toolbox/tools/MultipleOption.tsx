import React, {useState} from "react";
import {useNode} from "@craftjs/core";
import {IoAddOutline, IoTrashOutline} from "react-icons/io5";

import {Option} from "../../../../types/components/common/options";

interface MultipleOptionProps {
    question?: string;
    options?: Option[];
    multiple?: boolean;
    answer?: string;
    points?: number;
}

const MultipleOption = ({ question, options, multiple, points }: MultipleOptionProps) => {
    const { connectors: { connect, drag } } = useNode();

    return (
        <div className="p-2 flex flex-col space-y-5" ref={ref => connect(drag(ref!))}>
            {
                question ?
                    <p className="break-words"><small className="text-overline">({points} puntos)</small> {question}</p>
                    :
                    <small>Haga click aqui para editar la pregunta de opción múltiple</small>
            }
            {
                options && options.length > 0 &&
                <ul>
                {
                    options.map((option: Option) => (
                        <li key={option.key}>
                            <label className="flex space-x-2 items-center">
                                <input type={multiple ? "checkbox" : "radio"} id="id" name="id" value={option.key} />
                                <span>{option.value}</span>
                            </label>
                        </li>
                    ))
                }
                </ul>
            }
        </div>
    )
};

const MultipleOptionSettings = () => {
    const [newOption, setNewOption] = useState("");

    const { question, options, multiple, points, answer, actions: { setProp } } = useNode(node => ({
        question: node.data.props.question,
        options: node.data.props.options,
        multiple: node.data.props.multiple,
        answer: node.data.props.answer,
        points: node.data.props.points
    }));

    const onNewOptionClicked = () => {
        setNewOption("");

        const newOptionsItem = { key: newOption, value: newOption };

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
                props.options = props.options.filter(option => option.key !== key);
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
                       value={points || 0}
                       onChange={(e) => setProp((props: MultipleOptionProps) => props.points = parseInt(e.target.value || "0"))} />
            </div>
            <div className="form-group-row">
                <label htmlFor="multiple-option-multiple" className="form-label">
                    <small>¿Permitir marcar más de una respuesta?</small>
                </label>
                <input type="checkbox"
                       id="multiple-option-multiple"
                       name="multiple-option-multiple"
                       checked={multiple || false}
                       onChange={(e) => setProp((props: MultipleOptionProps) => props.multiple = e.target.checked)} />
            </div>
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
                                <div key={option.key} className="flex justify-between">
                                    <small>{option.value}</small>
                                    <IoTrashOutline className="text-error"
                                                    role="button"
                                                    onClick={() => removeOption(option.key as string)}/>
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
                            <option key={option.key} value={option.key}>
                                {option.value}
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
