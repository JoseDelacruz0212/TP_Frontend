import React from "react";
import Modal from "../common/modal/Modal";
import useTable from "../../hooks/useTable";
import {Convertor} from "../../types/common";
import Table from "../common/table/Table";
import moment from "moment/moment";
import Chip from "../common/chip/Chip";
import QualificationChip from "./QualificationChip";
import {IoCloseOutline} from "react-icons/io5";

interface AssessmentQualificationHistoryModalProps {
    isOpen: boolean;
    handleClose: () => void;
    history?: { points: number; transactionDate?: string }[]
}

const AssessmentQualificationHistoryModal = ({ isOpen, handleClose, history }: AssessmentQualificationHistoryModalProps) => {
    const convertorCreator : Convertor<{ id: string; points: number; transactionDate?: string }> = (column, rowData) => {
        let value: React.ReactNode = null;

        switch (column) {
            case 1: value = <div className="py-4">{moment(rowData.transactionDate).format('LLL')}</div>; break;
            case 2: value = <div className="py-4"><QualificationChip points={rowData.points} /></div>; break;
        }

        return value;
    }

    const { tableColumns, tableData } = useTable(convertorCreator, columns, (history || []).map((x, index) => ({ ...x, id: index.toString() })))

    return (
        <Modal id="verification-assessment-qualification-history"
               isOpen={isOpen}
               handleClose={handleClose}>
            <div className="flex flex-col space-y-5">
                <div className="flex justify-between p-5">
                    <span className="subtitle">Historial de calificaciones</span>
                    <button onClick={handleClose}><IoCloseOutline size={20} /></button>
                </div>
                <div className="rounded-lg overflow-hidden">
                    <Table columns={tableColumns}
                           rows={tableData}
                           hidePagination />
                </div>
            </div>
        </Modal>
    );
};

const columns = ["Fecha de actualización", "Calificación"];

export default AssessmentQualificationHistoryModal;
