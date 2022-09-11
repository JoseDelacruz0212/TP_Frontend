import React from "react";

import CourseService from "../../services/CourseService";

import TableView from "../layouts/TableView";

const VerificationData = () => {
    return (
        <div className="flex flex-col space-y-5">
            <TableView title="Lista de calificaciones"
                       columns={columns}
                       service={CourseService}
                       hideAddButton />
        </div>
    )
}

const columns = ["Institución", "Evaluación", "Curso", "Calificación"];

export default VerificationData;
