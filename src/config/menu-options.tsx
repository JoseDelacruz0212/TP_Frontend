import React from "react";

import { IoBookOutline, IoBookmarksOutline, IoPeopleOutline, IoFileTrayFullOutline, IoShieldCheckmarkOutline, IoSettingsOutline, IoPersonOutline } from "react-icons/io5";

import {NavMenuItem} from "../types/components/layouts/application-layouts";

const items: NavMenuItem[] = [
    {
        key: 1,
        label: "Cursos",
        icon: <IoBookOutline size={30} />,
        order: 1,
        link: 'courses'
    },
    {
        key: 2,
        label: "Evaluaciones",
        icon: <IoBookmarksOutline size={30} />,
        order: 2,
        link: 'assessments'
    },
    {
        key: 3,
        label: "Alumnos",
        icon: <IoPeopleOutline size={30} />,
        order: 3,
        link: 'students'
    },
    {
        key: 4,
        label: "Reclamos",
        icon: <IoFileTrayFullOutline size={30} />,
        order: 4,
        link: 'requests'
    },
    {
        key: 5,
        label: "Verificación",
        icon: <IoShieldCheckmarkOutline size={30} />,
        order: 5,
        link: 'verification'
    },
    {
        key: 6,
        label: "Administración",
        icon: <IoSettingsOutline size={30} />,
        order: 6,
        link: 'administration'
    },
    {
        key: 7,
        label: "Cuenta",
        icon: <IoPersonOutline size={30} />,
        order: 7,
        link: 'profile'
    }
];

export default items;
