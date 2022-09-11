import React from "react";

import {
    IoBookOutline,
    IoBookmarksOutline,
    IoPeopleOutline,
    IoPersonOutline,
    IoSchoolOutline,
    IoExitOutline,
    IoShieldCheckmarkOutline
} from "react-icons/io5";

import {Permissions} from "../../types/auth";
import {NavMenuItem} from "../../types/common";

const items: NavMenuItem[] = [
    {
        key: 1,
        label: "Instituciones",
        icon: <IoSchoolOutline size={30} />,
        order: 1,
        link: '/institutions',
        permission: Permissions.INSTITUTIONS,
        type: 'link',
        title: "Instituciones"
    },
    {
        key: 2,
        label: "Cursos",
        icon: <IoBookOutline size={30} />,
        order: 2,
        link: '/courses',
        permission: Permissions.COURSES,
        type: 'link',
        title: "Cursos"
    },
    {
        key: 3,
        label: "Evaluaciones",
        icon: <IoBookmarksOutline size={30} />,
        order: 3,
        link: '/assessments',
        permission: Permissions.ASSESSMENT,
        type: 'link',
        title: "Evaluaciones"
    },
    {
        key: 4,
        label: "Usuarios",
        icon: <IoPeopleOutline size={30} />,
        order: 4,
        link: '/users',
        permission: Permissions.USERS,
        type: 'link',
        title: "Usuarios"
    },
    // {
    //     key: 5,
    //     label: "Reclamos",
    //     icon: <IoFileTrayFullOutline size={30} />,
    //     order: 5,
    //     link: '/requests',
    //     permission: Permissions.REQUEST,
    //     type: 'link',
    //     title: "Reclamos"
    // },
    {
        key: 6,
        label: "Verificación",
        icon: <IoShieldCheckmarkOutline size={30} />,
        order: 6,
        link: '/verification',
        permission: Permissions.VERIFICATION,
        type: 'link',
        title: "Verificación"
    },
    // {
    //     key: 7,
    //     label: "Administración",
    //     icon: <IoSettingsOutline size={30} />,
    //     order: 7,
    //     link: '/administration',
    //     permission: Permissions.MANAGEMENT,
    //     type: 'link',
    //     title: "Administración"
    // },
    {
        key: 8,
        label: "Cuenta",
        icon: <IoPersonOutline size={30} />,
        order: 8,
        link: '/profile',
        permission: Permissions.PROFILE,
        type: 'link',
        title: "Cuenta"
    },
    {
        key: 9,
        label: "Cerrar sesión",
        icon: <IoExitOutline size={30} />,
        order: 9,
        type: 'logout'
    }
];

export default items;
