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
            statusChipValues.color = "w-24 bg-red-500 text-white";
            statusChipValues.statusName = "Plantilla";
            break;
        case AssessmentStatusOption.PUBLISHED:
            statusChipValues.color = "w-24 bg-yellow-500";
            statusChipValues.statusName = "Publicada";
            break;
        case AssessmentStatusOption.STARTED:
            statusChipValues.color = "w-24 bg-green-500 text-white";
            statusChipValues.statusName = "Iniciada";
            break;
        case AssessmentStatusOption.FINISHED:
            statusChipValues.color = "w-24 bg-blue-500 text-white";
            statusChipValues.statusName = "Finalizada";
            break;
    }

    return <Chip label={statusChipValues.statusName} className={statusChipValues.color} />
}

export default AssessmentStatus;
