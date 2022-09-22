import React, {FormEvent, useState} from "react";
import {toast} from "react-toastify";
import ConfirmationToast from "../../common/confirmation-toast/ConfirmationToast";

const AssignPoints = ({ onQualificationUpdate, isDisabled }: { onQualificationUpdate: (x: number) => void, isDisabled: boolean }) => {
    const toastId = React.useRef<any>(null);

    const showStartRequestMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        toastId.current = toast(<ConfirmationToast text="¿Desea actualizar la calificación de la evaluación?"
                                                   onClose={() => toast.dismiss(toastId.current)}
                                                   onSend={() => onQualificationUpdateHandler()} />, {
            closeButton: true,
            autoClose: false,
            closeOnClick: false,
            progress: 100
        })
    }

    const [newQualification, setNewQualification] = useState("");

    const onNewQualificationHandler = (newQualification: string) => {
        let qualification = newQualification
            .replace(/[^.\d]/g, '')
            .replace(/^(\d*\.?)|(\d*)\.?/g, "$1$2");

        const dotPosition = qualification.indexOf('.');

        if (dotPosition != -1) qualification = qualification.substring(0, dotPosition + 3)
        else qualification = qualification.substring(0, 2);

        setNewQualification(qualification);
    };

    const onQualificationUpdateHandler = () => {
        toast.dismiss(toastId.current);
        onQualificationUpdate(parseFloat(newQualification));
    }

    return (
        <form onSubmit={showStartRequestMessage} className="flex flex-col space-y-5 items-end">
            <div className="form-group-row">
                <label htmlFor="points-update-input" className="form-label">
                    <small>Actualizar calificación: </small>
                </label>
                <input className="form-input"
                       id="points-update-input"
                       name="points-update-input"
                       placeholder="Calificación"
                       type="number"
                       value={newQualification}
                       onChange={(e) => onNewQualificationHandler(e.target.value)} />
            </div>
            <div>
                <button className="button-primary" disabled={isDisabled}>
                    Actualizar
                </button>
            </div>
        </form>
    );
};

export default AssignPoints;
