import React from "react";

import QualificationsTable from "../../containers/qualifications-table/QualificationsTable";
import QualificationService from "../../services/QualificationService";
import {useLocation} from "react-router-dom";

interface LocationState {
    assessmentId: string | undefined;
}

const Qualifications = () => {
    const location = useLocation();
    const state = location.state as LocationState;

    return <QualificationsTable service={QualificationService} assessmentId={state?.assessmentId} />;
};

export default Qualifications;
