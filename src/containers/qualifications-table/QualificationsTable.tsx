import React from "react";
import moment from "moment";

import Chip from "../../components/common/chip/Chip";

import {ConvertorCreator} from "../../types/common";
import {QualificationGroup} from "../../types/communication/responses/qualification";
import {QualificationFilter} from "../../types/communication/requests/qualification";

import TableView from "../../views/layouts/TableView";
import {withQualificationsProvider} from "../../redux/providers/providers";

import {FetchService} from "../../services/FetchService";
import MenuOptions from "../../components/common/menu/MenuOptions";
import QualificationsMenuOptions from "../../components/menu-options/QualificationsMenuOptions";
import QualificationChip from "../../components/verification/QualificationChip";

interface DefaultFilters {
    assessmentId?: string;
    userId?: string;
}

interface QualificationsTableProps {
    service: FetchService<QualificationGroup, QualificationFilter>;
    defaultFilters: DefaultFilters;
    showHistory?: boolean;
    showAnswers?: boolean;
    onHistoryClick?: (x: { points: number, transactionDate?: string }[]) => void;
}

const QualificationsTable = ({ service, defaultFilters, showHistory = false, showAnswers = false, onHistoryClick }: QualificationsTableProps) => {
    const convertorCreator : ConvertorCreator<QualificationGroup> = () => (column, rowData) => {
        let value: React.ReactNode = null;

        switch (column) {
            case 1: value = <div className="py-4">{`${rowData.userFirstName} ${rowData.userLastName}`}</div>; break;
            case 2: value = <div className="py-4">{rowData.institutionName}</div>; break;
            case 3: value = <div className="py-4">{rowData.grade}</div>; break;
            case 4: value = <div className="py-4">{rowData.section}</div>; break;
            case 5: value = <div className="py-4">{rowData.courseName}</div>; break;
            case 6: value = <div className="py-4">{rowData.evaluationName}</div>; break;
            case 7: value = <div className="py-4">{moment(rowData.availableOn).format('LLL')}</div>; break;
            case 8:
                if (!rowData.points || !rowData.points[0]) return <div className="py-4"></div>;
                value = <div className="py-4"><QualificationChip points={rowData.points[0].points} /></div>;
                break;
            case 9:
                value = (
                    <div className="flex justify-end px-5">
                        <MenuOptions>
                            <QualificationsMenuOptions rowData={rowData}
                                                       showHistory={showHistory}
                                                       showAnswers={showAnswers}
                                                       onHistoryClick={() => onHistoryClick && onHistoryClick(rowData.points)} />
                        </MenuOptions>
                    </div>
                );
                break;
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

const columns = ["Estudiante", "Institución", "Grado", "Sección", "Curso", "Evaluación", "Fecha de disponibilidad", "Nota", ""];

export default withQualificationsProvider(QualificationsTable);
