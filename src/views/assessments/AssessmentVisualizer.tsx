import React, {useCallback, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";

import {useAuthContext} from "../../contexts/AuthContext";

import AssessmentVisualizerEditor from "../../components/assessments/assessment-visualizer/AssessmentVisualizerEditor";
import withPermission from "../../hoc/with-permission/withPermission";

import {Permissions} from "../../types/auth";
import {AssessmentStatus} from "../../types/assessment-status";
import AssessmentService from "../../services/AssessmentService";
import {toast} from "react-toastify";
import Loading from "../../components/common/loading/Loading";
import useFetch from "../../hooks/useFetch";
import QualificationBlockchainService from "../../services/QualificationBlockchainService";

interface LocationState {
    flag: boolean;
    isForStudent?: boolean;
}

const AssessmentVisualizer = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isAssigningPoints, setIsAssigningPoints] = useState(false);

    const { hasPermissionFor } = useAuthContext();
    const { id, userId } = useParams();

    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as LocationState;

    const isForStudent = state?.isForStudent;
    const flag = state?.flag;

    const getData = useCallback(() => AssessmentService.getById(id!, isForStudent, userId), [id, isForStudent]);
    const { data: assessment, isLoading, hasError } = useFetch(getData);

    const onAssessmentSubmit = (assessmentId: string) => {
        if (!assessment || !id) return;

        const toastMessage = toast.loading("Enviando respuestas, por favor espere");

        setIsSubmitting(true);
        AssessmentService.generatePoints(id!, assessmentId)
            .then(pointsGenerated => QualificationBlockchainService.addTransaction(pointsGenerated.points, assessment, id)
                .then(message => {
                    setIsSubmitting(false);

                    navigate("/assessments");
                    toast.update(toastMessage, {
                        render: message,
                        type: 'success',
                        isLoading: false,
                        autoClose: 5000,
                        closeButton: true
                    })
                })
                .catch(error => {
                    setIsSubmitting(false);

                    toast.update(toastMessage, {
                        render: error,
                        type: 'error',
                        isLoading: false,
                        autoClose: 5000,
                        closeButton: true
                    })
                }))
            .catch(error => {
                setIsSubmitting(false);

                toast.update(toastMessage, {
                    render: error,
                    type: 'error',
                    isLoading: false,
                    autoClose: 5000,
                    closeButton: true
                })
            })
    };

    const onSendRequest = () => {
        if (id) {
            const toastMessage = toast.loading("Enviando solicitud de cambio, por favor espere");

            AssessmentService.generateRequest(id)
                .then(message => toast.update(toastMessage, {
                    render: message,
                    type: 'success',
                    isLoading: false,
                    autoClose: 5000,
                    closeButton: true
                }))
                .catch(error => toast.update(toastMessage, {
                    render: error,
                    type: 'error',
                    isLoading: false,
                    autoClose: 5000,
                    closeButton: true
                }));
        }
    };

    const onQualificationUpdate = (newQualification: number) => {
        if (!userId || !id || !assessment || !assessment.id) return;

        const toastMessage = toast.loading("Enviando actualizaci??n de calificaci??n, por favor espere");

        setIsAssigningPoints(true);
        AssessmentService.changePoints(assessment.id, userId, id, newQualification)
            .then(() => QualificationBlockchainService.changePoints(newQualification, assessment, userId, id)
                .then(message => {
                    setIsSubmitting(false);

                    navigate("/assessments");
                    toast.update(toastMessage, {
                        render: message,
                        type: 'success',
                        isLoading: false,
                        autoClose: 5000,
                        closeButton: true
                    })
                })
                .catch(error => {
                    setIsSubmitting(false);

                    toast.update(toastMessage, {
                        render: error,
                        type: 'error',
                        isLoading: false,
                        autoClose: 5000,
                        closeButton: true
                    })
                }))
            .catch(error => {
                setIsSubmitting(false);

                toast.update(toastMessage, {
                    render: error,
                    type: 'error',
                    isLoading: false,
                    autoClose: 5000,
                    closeButton: true
                })
            })
    };

    if (isLoading) return <Loading />;

    if (assessment) {
        const accessAllowed =
            (assessment.status === AssessmentStatus.STARTED && flag === false && hasPermissionFor(Permissions.ASSESSMENT_SUBMIT)) ||
            (assessment.status === AssessmentStatus.FINISHED && hasPermissionFor(Permissions.ASSESSMENT_DETAILS));

        if (!accessAllowed) navigate(-1);
    }

    if (hasError || !assessment) return (
        <div className="flex justify-center">
            <span className="text-center w-full md:w-2/3 lg:w-1/2">
                No se pudo obtener la informaci??n del examen. Verifique que tenga los permisos necesarios para acceder a esta p??gina
            </span>
        </div>
    );

    return (
        <AssessmentVisualizerEditor json={assessment.json}
                                    onAssessmentSubmit={onAssessmentSubmit}
                                    isReadOnly={assessment.status !== AssessmentStatus.STARTED}
                                    assessments={assessment}
                                    isSubmitting={isSubmitting}
                                    isAssigningPoints={isAssigningPoints}
                                    onSendRequest={onSendRequest}
                                    onQualificationUpdate={onQualificationUpdate} />
    )
}

export default withPermission(AssessmentVisualizer, Permissions.ASSESSMENT_VISUALIZE);
