import React, {FormEvent, useMemo, useState} from "react";
import {useLocation} from "react-router-dom";
import moment from "moment/moment";

import {useSliceActions} from "../../redux/providers/SliceProvider";
import {useDispatch} from "react-redux";

import {UserFilter} from "../../types/communication/requests/user";
import {User} from "../../types/communication/responses/user";
import {Permissions} from "../../types/auth";

import UserService from "../../services/UserService";

import Text from "../../components/common/table/filter-renderer/elements/Text";
import UserEditForm from "../../containers/edit-forms/UserEditForm";
import MenuOptions from "../../components/common/menu/MenuOptions";
import withPermission from "../../hoc/with-permission/withPermission";
import Modal from "../../components/common/modal/Modal";

import CoursesSelect from "../../containers/selects/CoursesSelect";

import {withUsersProvider} from "../../redux/providers/providers";

import TableView from "../layouts/TableView";
import {IoCloseOutline} from "react-icons/io5";
import {ConvertorCreator, FilterSchemaCreator} from "../../types/common";
import Chip from "../../components/common/chip/Chip";
import {toast} from "react-toastify";
import UsersMenuOptions from "../../components/menu-options/UsersMenuOptions";
import UserCourseAssignationModal from "../../components/user-course/UserCourseAssignationModal";

const defaultUser: User = {
    name: '',
    lastName: '',
    email: ''
};

interface LocationState {
    courseId: string | undefined;
}

const Users = () => {
    const location = useLocation();
    const state = location.state as LocationState;

    const courseId = state?.courseId;

    const dispatch = useDispatch();
    const { userStatusChanged } = useSliceActions();

    const defaultFilters = useMemo(() => ({ courseId: state?.courseId || '' }), [courseId]);

    const [isUserCourseAssignationModalOpen, setIsUserCourseAssignationModalOpen] = useState(false);
    const [selectedUserForCourseAssign, setSelectedUserForCourseAssign] = useState<User | undefined>(undefined);

    const onIsUserCourseAssignationModalOpened = (user: User) => {
        setIsUserCourseAssignationModalOpen(true);
        setSelectedUserForCourseAssign(user);
    }

    const onIsUserCourseAssignationModalClosed = () => {
        setIsUserCourseAssignationModalOpen(false);
        setSelectedUserForCourseAssign(undefined);
    }

    const onUserCourseAssigned = (userId: string, courseId: string) => {
        UserService.assignUserToCourse(userId, courseId).then(onIsUserCourseAssignationModalClosed)
    }

    const approveUser = (id: string) => UserService.approveUser(id).then(
        () => {
            dispatch(userStatusChanged(null));
            toast.success("El usuario se aprobó existosamente");
        }
    )
    const revokeUser = (id: string) => UserService.revokeUser(id).then(
        () => {
            dispatch(userStatusChanged(null));
            toast.success("El usuario se desaprobó exitosamente");
        }
    )

    const convertorCreator : ConvertorCreator<User> = (onEdit, onDelete) => (column, rowData) => {
        let value: React.ReactNode = null;

        switch (column) {
            case 1: value = <div className="py-4">{rowData.name}</div>; break;
            case 2: value = <div className="py-4">{rowData.lastName}</div>; break;
            case 3: value = <div className="py-4">{rowData.email}</div>; break;
            case 4: value = <div className="py-4">{rowData.institution?.name}</div>; break;
            case 5: value = <div className="py-4">{rowData.createdBy}</div>; break;
            case 6: value = <div className="py-4">{moment(rowData.createdOn).format('LLL')}</div>; break;
            case 7:
                value = (
                    <div className="py-4">
                        <Chip label={rowData.status ? "Aprobado" : "Desaprobado"}
                              className={`${rowData.status ? "bg-green-500" : "bg-red-500"} text-white w-28 text-center`} />
                    </div>
                );
                break;
            case 8: value = (
                    <div className="flex justify-end px-5">
                        <MenuOptions>
                            <UsersMenuOptions rowData={rowData}
                                              onEdit={onEdit}
                                              onDelete={onDelete}
                                              onApprove={approveUser}
                                              onRevoke={revokeUser}
                                              onAssign={onIsUserCourseAssignationModalOpened} />
                        </MenuOptions>
                    </div>
                );
                break;
        }

        return value;
    }

    return (
        <div className="flex flex-col space-y-5">
            <TableView title="Lista de usuarios"
                       filterSchemaCreator={createFilterSchema}
                       convertorCreator={convertorCreator}
                       columns={columns}
                       service={UserService}
                       sidePanelId="edit-assessment-side-panel"
                       sidePanelEditTitle="Editar usuario"
                       sidePanelCreateTitle="Agregar usuario"
                       formInputs={UserEditForm}
                       defaultItemSchema={defaultUser}
                       addButtonText="Crear usuario"
                       hideAddButton={courseId !== undefined}
                       canAddPermission={Permissions.USERS_ADD}
                       defaultFilters={defaultFilters} />
            <UserCourseAssignationModal isOpen={isUserCourseAssignationModalOpen}
                                        handleClose={onIsUserCourseAssignationModalClosed}
                                        selectedUser={selectedUserForCourseAssign}
                                        onAssign={onUserCourseAssigned} />
        </div>
    )
}

const createFilterSchema: FilterSchemaCreator<UserFilter> = (filters, onFiltersUpdate) => ([
    {
        id: "course-name-filter",
        type: Text,
        initialValue: filters.name,
        onChange: (value: string) => onFiltersUpdate({ ...filters, name: value }),
        withLabel: true,
        label: 'Nombre',
        placeholder: 'Nombre'
    }
])

const columns = ["Nombre", "Apellido", "Correo", "Institución", "Creado por", "Fecha de creación", "Estado", ""];

export default withPermission(withUsersProvider(Users), Permissions.USERS);
