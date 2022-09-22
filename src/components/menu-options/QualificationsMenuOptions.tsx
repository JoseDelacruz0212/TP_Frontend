import React from "react";
import HasPermission from "../../hoc/with-permission/HasPermission";
import {Permissions} from "../../types/auth";
import {Link} from "react-router-dom";
import {IoDocumentOutline, IoLayersOutline} from "react-icons/io5";
import {QualificationGroup} from "../../types/communication/responses/qualification";
import If from "../common/logic/If";

interface InstitutionsMenuOptionsProps {
    rowData: QualificationGroup;
    showHistory?: boolean;
    showAnswers?: boolean;
    onHistoryClick?: () => void;
}

const QualificationsMenuOptions = ({ rowData, showHistory = false, showAnswers = false, onHistoryClick }: InstitutionsMenuOptionsProps) => (
    <>
        <If condition={showAnswers}>
            <HasPermission permission={Permissions.ASSESSMENT_DETAILS}>
                <Link to={`/assessment-visualizer/${rowData.evaluationId}/${rowData.userId}`} state={{ isForStudent: true, subtitle: rowData.evaluationName }}>
                    <div role="button" className="menu-option">
                        <div><IoDocumentOutline /></div>
                        <span>Ver respuestas</span>
                    </div>
                </Link>
            </HasPermission>
        </If>
        <If condition={showHistory}>
            <div role="button" className="menu-option" onClick={onHistoryClick}>
                <div><IoLayersOutline /></div>
                <span>Ver historial</span>
            </div>
        </If>
    </>
);

export default QualificationsMenuOptions;
