import React from "react";
import Chip from "../common/chip/Chip";

const QualificationChip = ({ points }: { points: number }) => {
    let color = "bg-green-500 text-white";

    if (points < 10) color = "bg-red-500 text-white";
    else if (points < 13) color = "bg-yellow-500";

    return <Chip label={points.toString()} className={`${color} w-20`} />;
}

export default QualificationChip;
