import React, {useState} from "react";

const AssignPoints = ({ onQualificationUpdate }: { onQualificationUpdate: (x: number) => void }) => {
    const [newQualification, setNewQualification] = useState("");

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
                       onChange={(e) => setNewQualification(e.target.value)} />
            </div>
            <div>
                <button className="button-primary">
                    Actualizar
                </button>
            </div>
        </form>
    );
};

export default AssignPoints;
