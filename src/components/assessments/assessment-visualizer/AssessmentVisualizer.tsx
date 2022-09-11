import React, {FormEvent} from "react";
import {Element, Frame, useEditor} from "@craftjs/core";

import {AssessmentStatus} from "../../../types/assessment-status";

import {useAssessmentContext} from "../../../contexts/AssessmentContext";

interface AssessmentVisualizerProps {
    json: string;
    onAssessmentSubmit: (assessment: string) => void;
    hideButton?: boolean;
}

const AssessmentVisualizer = ({ json, onAssessmentSubmit, hideButton = false }: AssessmentVisualizerProps) => {
    const { query } = useEditor();
    const { status } = useAssessmentContext();

    const onAssessmentSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onAssessmentSubmit(query.serialize());
    }

    return (
        <form onSubmit={onAssessmentSubmitHandler} className="flex flex-col space-y-10">
            <Frame data={json}>
                <Element id="canvas" is="div" canvas />
            </Frame>
            {
                !hideButton && status === AssessmentStatus.STARTED &&
                <div className="flex justify-end">
                    <button type="submit" className="button-primary text-on-primary">
                        Enviar
                    </button>
                </div>
            }
        </form>
    );
};

export default AssessmentVisualizer;