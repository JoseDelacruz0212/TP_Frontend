import React from "react";
import {IoBowlingBallOutline} from "react-icons/io5";

const Loading = () => (
    <small className="flex justify-center items-center">
        Cargando
        <IoBowlingBallOutline className="animate-spin ml-2" size={15} />
    </small>
);

export default Loading;
