import React, {FormEvent} from "react";
import {Element, Frame, useEditor} from "@craftjs/core";

import {AssessmentStatus} from "../../../types/assessment-status";
import {Assessment} from "../../../types/communication/responses/assessment";

import AssessmentTimeBar from "./AssessmentTimeBar";
import {toast} from "react-toastify";
import SendRequest from "./SendRequest";

interface AssessmentVisualizerProps {
    json: string;
    onAssessmentSubmit: (assessment: string) => void;
    isReadOnly?: boolean;
    assessment?: Assessment;
    isSubmitting?: boolean;
}


const AssessmentVisualizer = ({ json, onAssessmentSubmit, assessment, isReadOnly = false, isSubmitting = false }: AssessmentVisualizerProps) => {
    const { query } = useEditor();

    const onAssessmentSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onAssessmentSubmit(query.serialize());
    }

    const SendButton = () => (
        <div className="flex justify-end">
            <button type="submit" className="button-primary" disabled={isSubmitting}>
                Enviar
            </button>
        </div>
    );

    const onSendRequest = () => {
        const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 3000));
        toast.promise(resolveAfter3Sec, {
            pending: 'Enviando solicitud de cambio, por favor espere',
            success: 'La solicitud fue enviada exitosamente',
            error: 'Ocurrió un problema al tratar de enviar la solicitud'
        }).then();
    }

    return (
        <>
            { assessment && assessment.status === AssessmentStatus.FINISHED && <SendRequest onSendRequest={onSendRequest} /> }
            {
                assessment &&
                <form onSubmit={onAssessmentSubmitHandler} className="flex flex-col space-y-10">
                    {
                        assessment.status === AssessmentStatus.STARTED &&
                        <AssessmentTimeBar availableOn={assessment.availableOn}
                                           duration={assessment.duration}
                                           status={assessment.status} />
                    }
                    <Frame data={json}>
                        <Element id="canvas" is="div" canvas />
                    </Frame>
                    { !isReadOnly && assessment.status === AssessmentStatus.STARTED && <SendButton /> }
                </form>
            }
        </>
    );
};

export default AssessmentVisualizer;
