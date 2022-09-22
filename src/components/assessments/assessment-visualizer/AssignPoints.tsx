import React, {ChangeEvent, useState} from "react";

const AssignPoints = ({ onQualificationUpdate, isDisabled }: { onQualificationUpdate: (x: number) => void, isDisabled: boolean }) => {
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

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            onQualificationUpdate(parseFloat(newQualification));
        }} className="flex flex-col space-y-5 items-end">
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
