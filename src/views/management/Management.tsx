import React from "react";
import {Link} from "react-router-dom";
import {IoArrowForwardOutline} from "react-icons/io5";

const Management = () => (
    <Link to={process.env.REACT_APP_ADMINISTRATION_PANEL}>
        <span className="text-primary-dark flex items-center space-x-1">
            <span>Ir a panel de administación de la red Blockchain</span>
            <span><IoArrowForwardOutline /></span>
        </span>
    </Link>
);

export default Management;
