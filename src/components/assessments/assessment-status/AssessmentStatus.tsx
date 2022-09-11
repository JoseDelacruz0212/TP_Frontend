import React from "react";
import Chip from "../../common/chip/Chip";

import {AssessmentStatus as AssessmentStatusOption} from "../../../types/assessment-status";

interface AssessmentStatusProps {
    status?: number;
}

const AssessmentStatus = ({ status }: AssessmentStatusProps) => {
    if (!status === undefined || !status === null) return null;

    const statusChipValues = {
        color: "",
        statusName: ""
    }

    switch (status) {
        case AssessmentStatusOption.DRAFT:
            statusChipValues.color = "bg-red-500 text-white";
            statusChipValues.statusName = "Borrador";
            break;
        case AssessmentStatusOption.PUBLISHED:
            statusChipValues.color = "bg-yellow-500";
            statusChipValues.statusName = "Publicado";
            break;
        case AssessmentStatusOption.STARTED:
            statusChipValues.color = "bg-green-500 text-white";
            statusChipValues.statusName = "Iniciado";
            break;
        case AssessmentStatusOption.FINISHED:
            statusChipValues.color = "bg-blue-500 text-white";
            statusChipValues.statusName = "Finalizado";
            break;
    }

    return <Chip label={statusChipValues.statusName} className={statusChipValues.color} />
}

export default AssessmentStatus;
