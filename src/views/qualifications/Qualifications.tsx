import React from "react";

import QualificationsTable from "../../containers/qualifications-table/QualificationsTable";
import QualificationService from "../../services/QualificationService";
import {useLocation} from "react-router-dom";
import {Permissions} from "../../types/auth";
import withPermission from "../../hoc/with-permission/withPermission";

interface LocationState {
    assessmentId: string | undefined;
}

const Qualifications = () => {
    const location = useLocation();
    const state = location.state as LocationState;

    const defaultFilters = { assessmentId: state?.assessmentId };

    return <QualificationsTable service={QualificationService} defaultFilters={defaultFilters} />;
};

export default withPermission(Qualifications, Permissions.ASSESSMENT_QUALIFICATIONS);
