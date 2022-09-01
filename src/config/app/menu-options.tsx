import React from "react";

import { IoBookOutline, IoBookmarksOutline, IoPeopleOutline, IoFileTrayFullOutline, IoShieldCheckmarkOutline, IoSettingsOutline, IoPersonOutline } from "react-icons/io5";

import {NavMenuItem} from "../../types/components/layouts/application-layouts";
import {Permissions} from "../../types/app/auth";

const items: NavMenuItem[] = [
    {
        key: 1,
        label: "Instituciones",
        icon: <IoBookOutline size={30} />,
        order: 1,
        link: '/institutions',
        permission: Permissions.INSTITUTIONS
    },
    {
        key: 2,
        label: "Cursos",
        icon: <IoBookOutline size={30} />,
        order: 2,
        link: '/courses',
        permission: Permissions.COURSES
    },
    {
        key: 3,
        label: "Evaluaciones",
        icon: <IoBookmarksOutline size={30} />,
        order: 3,
        link: '/assessments',
        permission: Permissions.ASSESSMENT
    },
    {
        key: 4,
        label: "Alumnos",
        icon: <IoPeopleOutline size={30} />,
        order: 4,
        link: '/students',
        permission: Permissions.USERS
    },
    {
        key: 5,
        label: "Reclamos",
        icon: <IoFileTrayFullOutline size={30} />,
        order: 5,
        link: '/requests',
        permission: Permissions.REQUEST
    },
    {
        key: 6,
        label: "Verificación",
        icon: <IoShieldCheckmarkOutline size={30} />,
        order: 6,
        link: '/verification',
        permission: Permissions.VERIFICATION
    },
    {
        key: 7,
        label: "Administración",
        icon: <IoSettingsOutline size={30} />,
        order: 7,
        link: '/administration',
        permission: Permissions.MANAGEMENT
    },
    {
        key: 8,
        label: "Cuenta",
        icon: <IoPersonOutline size={30} />,
        order: 8,
        link: '/profile',
        permission: Permissions.PROFILE
    }
];

export default items;
