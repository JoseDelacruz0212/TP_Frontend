import React, {useEffect, useState} from "react";
import moment from "moment";

import {AssessmentStatus} from "../../../types/assessment-status";

interface AssessmentTimeBarProps {
    availableOn: string;
    duration?: number;
    status?: number;
}

const AssessmentTimeBar = ({ status, availableOn, duration }: AssessmentTimeBarProps) => {
    const [remainingHours, setRemainingHours] = useState(0);
    const [remainingMinutes, setRemainingMinutes] = useState(0);
    const [remainingSeconds, setRemainingSeconds] = useState(0);

    const [percentageCompleted, setPercentageCompleted] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timer | undefined = undefined;

        const updateValues = () => {
            const availableOnMoment = moment(availableOn);
            const deadline = availableOnMoment.add(duration, "minutes");
            const now = moment(new Date());

            const remainingTime = deadline.diff(now, "seconds");

            setRemainingHours(Math.floor(remainingTime / 3600));
            setRemainingMinutes(Math.floor((remainingTime % 3600) / 60));
            setRemainingSeconds(Math.floor((remainingTime % 3600) % 60));

            if (duration) setPercentageCompleted((duration - remainingTime / 60) / duration * 100);
        };

        updateValues();

        if (status === AssessmentStatus.STARTED) {
            interval = setInterval(updateValues, 1000);
        }

        return () => interval && clearInterval(interval);
    }, []);

    if (!duration) return null;

    let color = "bg-gray-200"

    if (percentageCompleted <= 50) color = "bg-green-500";
    else if (percentageCompleted <= 75) color = "bg-yellow-500";
    else color = "bg-red-500";

    return (
        <div className="overflow-x-hidden">
            <small className="text-overline">
                Tiempo restante:
                <b> {remainingHours}</b> horas
                <b> {remainingMinutes}</b> minutos
                <b> {remainingSeconds}</b> segundos</small>
            <div className="relative h-2 w-full rounded-md bg-gray-200">
                <div className={`absolute h-2 rounded-md ${color}`} style={{
                    width: `${percentageCompleted}%`
                }}></div>
            </div>
        </div>
    )
};

export default AssessmentTimeBar;
