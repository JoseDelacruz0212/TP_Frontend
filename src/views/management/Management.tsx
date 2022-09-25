import React from "react";
import {Link} from "react-router-dom";
import {IoArrowForwardOutline} from "react-icons/io5";

const Management = () => (
    <Link to="http://ec2-44-203-113-105.compute-1.amazonaws.com:8080/#/">
        <span className="text-primary-dark flex items-center space-x-1">
            <span>Ir a panel de administación de la red Blockchain</span>
            <span><IoArrowForwardOutline /></span>
        </span>
    </Link>
);

export default Management;
