import React, {useCallback} from "react";
import {Navigate, useLocation, useNavigate} from "react-router-dom";

import {useAuthContext} from "../../contexts/AuthContext";

import AssessmentVisualizerEditor from "../../components/assessments/assessment-visualizer/AssessmentVisualizerEditor";
import withPermission from "../../hoc/with-permission/withPermission";

import {Permissions} from "../../types/auth";
import {AssessmentStatus} from "../../types/assessment-status";
import AssessmentService from "../../services/AssessmentService";
import BlockchainService from "../../services/BlockchainService";
import {toast} from "react-toastify";
import Loading from "../../components/common/loading/Loading";
import useFetch from "../../hooks/useFetch";

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
    const flag = state?.flag;

    const getData = useCallback(() => AssessmentService.getById(id), [id]);
    const { data: assessment, isLoading, hasError } = useFetch(getData);

    const { hasPermissionFor } = useAuthContext();

    const canSubmit = hasPermissionFor(Permissions.ASSESSMENT_SUBMIT);
    const canSeeDetails = hasPermissionFor(Permissions.ASSESSMENT_DETAILS);

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

    if (isLoading) return <Loading />;
    if (hasError) return (
        <div className="flex justify-center">
                    <span className="text-center w-full md:w-2/3 lg:w-1/2">
                        No se pudo obtener la información del examen. Verifique que tenga los permisos necesarios para acceder a esta página
                    </span>
        </div>
    );

    const accessAllowed =
        (assessment === AssessmentStatus.STARTED && !flag && canSubmit) ||
        (status === AssessmentStatus.FINISHED && canSeeDetails);

    if (!accessAllowed) return <Navigate to="/assessments" />;

    return (
        <>
            {
                isLoading &&
                <Loading />
            }
            {
                assessment && !hasError &&
                <AssessmentVisualizerEditor json={assessment.json}
                                            onAssessmentSubmit={onAssessmentSubmit}
                                            isReadOnly={status !== AssessmentStatus.STARTED}
                                            hideButton={!hasPermissionFor(Permissions.ASSESSMENT_SUBMIT)}
                                            assessments={assessment} />
            }
            {
                hasError &&

            }
        </>
    )
}

export default withPermission(AssessmentVisualizer, Permissions.ASSESSMENT_VISUALIZE);
