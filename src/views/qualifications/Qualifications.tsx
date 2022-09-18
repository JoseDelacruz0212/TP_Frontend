import React from "react";

import QualificationsTable from "../../containers/qualifications-table/QualificationsTable";
import QualificationService from "../../services/QualificationService";

const Qualifications = () => {
    return <QualificationsTable service={QualificationService} />;
};

export default Qualifications;
