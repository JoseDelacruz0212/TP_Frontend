import React from "react";
import {useLocation} from "react-router-dom";
import moment from "moment";

import {ConvertorCreator} from "../../types/common";
import {Qualification} from "../../types/communication/responses/qualification";
import {QualificationFilter} from "../../types/communication/requests/qualification";

import TableView from "../../views/layouts/TableView";
import {withQualificationsProvider} from "../../redux/providers/providers";

import {FetchService} from "../../services/FetchService";

interface LocationState {
    assessmentId: string | undefined;
}

interface QualificationsTableProps {
    service: FetchService<Qualification, QualificationFilter>
}

const QualificationsTable = ({ service }: QualificationsTableProps) => {
    const location = useLocation();
    const state = location.state as LocationState;

    const convertorCreator : ConvertorCreator<Qualification> = () => (column, rowData) => {
        let value: React.ReactNode = null;

        switch (column) {
            case 1: value = <div className="py-4">{rowData.institutionName}</div>; break;
            case 2: value = <div className="py-4">{rowData.grade}</div>; break;
            case 3: value = <div className="py-4">{rowData.section}</div>; break;
            case 4: value = <div className="py-4">{rowData.courseName}</div>; break;
            case 5: value = <div className="py-4">{rowData.evaluationName}</div>; break;
            case 6: value = <div className="py-4">{moment(rowData.availableOn).format('LLL')}</div>; break;
            case 7: value = <div className="py-4">{rowData.nota}</div>; break;
        }

        return value;
    }

    return (
        <div className="flex flex-col space-y-5">
            <TableView title="Lista de calificaciones"
                       filterSchemaCreator={undefined}
                       convertorCreator={convertorCreator}
                       columns={columns}
                       defaultFilters={{ assessmentId: state?.assessmentId || '' }}
                       service={service}
                       hideAddButton />
        </div>
    )
}

const columns = ["Institución", "Grado", "Sección", "Curso", "Evaluación", "Fecha de disponibilidad", "Nota"];

export default withQualificationsProvider(QualificationsTable);
