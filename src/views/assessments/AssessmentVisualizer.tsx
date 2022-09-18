import React, {useEffect, useState} from "react";
import {Navigate, useLocation, useNavigate} from "react-router-dom";

import {useAuthContext} from "../../contexts/AuthContext";

import AssessmentVisualizerEditor from "../../components/assessments/assessment-visualizer/AssessmentVisualizerEditor";
import withPermission from "../../hoc/with-permission/withPermission";

import {Permissions} from "../../types/auth";
import {AssessmentStatus} from "../../types/assessment-status";
import {Assessment} from "../../types/communication/responses/assessment";
import AssessmentService from "../../services/AssessmentService";
import BlockchainService from "../../services/BlockchainService";
import {toast} from "react-toastify";

interface LocationState {
    assessmentId: string;
    status: number;
    flag: boolean;
}

const AssessmentVisualizer = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as LocationState;

    const id = state?.assessmentId;
    const status = state?.status;
    const flag = state?.flag;

    const [assessment, setAssessment] = useState<Assessment | null>(null);
    const [hasError, setHasError] = useState(false);

    const { hasPermissionFor } = useAuthContext();

    const canSubmit = hasPermissionFor(Permissions.ASSESSMENT_SUBMIT);
    const canSeeDetails = hasPermissionFor(Permissions.ASSESSMENT_DETAILS);

    const accessAllowed =
        (status === AssessmentStatus.STARTED && !flag && canSubmit) ||
        (status === AssessmentStatus.FINISHED && canSeeDetails);

    useEffect(() => {
        if (id && accessAllowed) {
            AssessmentService.getById(id)
                .then(setAssessment)
                .catch(() => setHasError(true));
        }
    }, [id, accessAllowed]);

    if (!accessAllowed) return <Navigate to="/assessments" />;

    const onAssessmentSubmit = (assessment: string) => {
        AssessmentService.generatePoints(id, assessment).then(
            pointsGenerated => BlockchainService.addTransaction(pointsGenerated).then(
                () => {
                    navigate("/assessments");
                    toast.success("La evaluación se envió exitosamente");
                }
            )
        );
    };

    return (
        <>
            {
                assessment && !hasError &&
                <AssessmentVisualizerEditor json={assessment.json}
                                            onAssessmentSubmit={onAssessmentSubmit}
                                            readOnly={status !== AssessmentStatus.STARTED}
                                            hideButton={!hasPermissionFor(Permissions.ASSESSMENT_SUBMIT)}
                                            assessments={assessment} />
            }
            {
                hasError &&
                <div className="flex justify-center">
                    <span className="text-center w-1/2">
                        No se pudo obtener la información del examen. Verifique que tenga los permisos necesarios para acceder a esta página
                    </span>
                </div>
            }
        </>
    )
}

export default withPermission(AssessmentVisualizer, Permissions.ASSESSMENT_VISUALIZE);
