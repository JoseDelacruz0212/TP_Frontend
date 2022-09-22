import React from "react";
import HasPermission from "../../hoc/with-permission/HasPermission";
import {Permissions} from "../../types/auth";
import {Link} from "react-router-dom";
import {IoDocumentOutline} from "react-icons/io5";
import {QualificationGroup} from "../../types/communication/responses/qualification";

interface InstitutionsMenuOptionsProps {
    rowData: QualificationGroup;
}

const QualificationsMenuOptions = ({ rowData }: InstitutionsMenuOptionsProps) => (
    <>
        <HasPermission permission={Permissions.ASSESSMENT_DETAILS}>
            <Link to={`/assessment-visualizer/${rowData.evaluationId}/${rowData.userId}`} state={{ isForStudent: true, subtitle: rowData.evaluationName }}>
                <div role="button" className="menu-option">
                    <div><IoDocumentOutline /></div>
                    <span>Ver respuestas</span>
                </div>
            </Link>
        </HasPermission>
    </>
);

export default QualificationsMenuOptions;
