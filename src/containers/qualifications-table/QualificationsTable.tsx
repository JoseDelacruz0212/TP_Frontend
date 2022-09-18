import React, {useMemo} from "react";
import moment from "moment";

import Chip from "../../components/common/chip/Chip";

import {ConvertorCreator} from "../../types/common";
import {Qualification} from "../../types/communication/responses/qualification";
import {QualificationFilter} from "../../types/communication/requests/qualification";

import TableView from "../../views/layouts/TableView";
import {withQualificationsProvider} from "../../redux/providers/providers";

import {FetchService} from "../../services/FetchService";

interface QualificationsTableProps {
    service: FetchService<Qualification, QualificationFilter>;
    assessmentId?: string;
    userId?: string;
}

const QualificationsTable = ({ service, assessmentId, userId }: QualificationsTableProps) => {
    const defaultFilters = useMemo(() => ({
        assessmentId: assessmentId || '',
        userId: userId || ''
    }), [assessmentId, userId]);

    const convertorCreator : ConvertorCreator<Qualification> = () => (column, rowData) => {
        let value: React.ReactNode = null;

        switch (column) {
            case 1: value = <div className="py-4">{rowData.institutionName}</div>; break;
            case 2: value = <div className="py-4">{rowData.grade}</div>; break;
            case 3: value = <div className="py-4">{rowData.section}</div>; break;
            case 4: value = <div className="py-4">{rowData.courseName}</div>; break;
            case 5: value = <div className="py-4">{rowData.evaluationName}</div>; break;
            case 6: value = <div className="py-4">{moment(rowData.availableOn).format('LLL')}</div>; break;
            case 7: value = (
                <div className="py-4"><Chip label={rowData.nota?.toString() || ''} className="bg-primary text-on-primary w-full" /></div>
            ); break;
        }

        return value;
    }

    return (
        <div className="flex flex-col space-y-5">
            <TableView title="Lista de calificaciones"
                       filterSchemaCreator={undefined}
                       convertorCreator={convertorCreator}
                       columns={columns}
                       defaultFilters={defaultFilters}
                       service={service}
                       hideAddButton />
        </div>
    )
}

const columns = ["Institución", "Grado", "Sección", "Curso", "Evaluación", "Fecha de disponibilidad", "Nota"];

export default withQualificationsProvider(QualificationsTable);