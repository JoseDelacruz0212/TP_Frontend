import React, {useState} from "react";

import {ToolType} from "./Tool";
import {IoAddOutline, IoTrashOutline} from "react-icons/io5";

const MultipleOptionQuestion = (props: ToolType) => {
    const [newOption, setNewOption] = useState("");

    const onNewOptionClicked = () => {
        setNewOption("");
        props.addOption(newOption);
    };

    return (
        <>
            <div className="form-group">
                <label htmlFor="multiple-question-answer" className="form-label">
                    <small>Opción correcta (respuesta)</small>
                </label>
                <select className={`form-input select ${props.options.length === 0 ? 'cursor-not-allowed' : ''}`}
                        id="multiple-question-answer"
                        name="multiple-question-answer"
                        value={props.answer}
                        placeholder="Respuesta"
                        disabled={props.options.length === 0}
                        onChange={(e) => props.setAnswer && props.setAnswer(e.target.value)}>
                    { props.options && props.options.length > 0 && <option value="">Seleccione una opción</option> }
                    {
                        props.options && props.options.map(option => (
                            <option key={option.label} value={option.label}>
                                {option.label}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div className="form-group space-y-5">
                <label htmlFor="multiple-question-with-answer" className="form-label">
                    <small>Opciones</small>
                </label>
                <div className="flex items-center">
                    <div className="flex-1 px-2">
                        <input className="border-b w-full"
                               id="multiple-question-options"
                               name="multiple-question-options"
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
                    props.options && props.options.length > 0 &&
                    <div className="p-2 border rounded-md flex flex-col space-y-3">
                        {
                            props.options.map(option => (
                                <div key={option.label} className="flex justify-between">
                                    <small>{option.label}</small>
                                    <IoTrashOutline className="text-error"
                                                    role="button"
                                                    onClick={() => props.removeOption(option.label)}/>
                                </div>
                            ))
                        }
                    </div>
                }
            </div>
        </>
    );
};

export default MultipleOptionQuestion;
