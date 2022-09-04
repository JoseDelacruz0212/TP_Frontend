import React from "react";
import moment from "moment/moment";

import {useSliceActions} from "../../redux/providers/SliceProvider";
import {useDispatch} from "react-redux";

import {ConvertorCreator} from "../../types/hooks/table";
import {UserFilter} from "../../types/communication/requests/user";
import {User} from "../../types/communication/responses/user";
import {Permissions} from "../../types/app/auth";

import UserService from "../../services/UserService";

import Text from "../../components/common/table/filter-renderer/elements/Text";
import UserEditForm from "../../containers/edit-forms/UserEditForm";
import MenuOptions from "../../components/common/menu/MenuOptions";
import withPermission from "../../hoc/with-permission/withPermission";
import HasPermission from "../../hoc/with-permission/HasPermission";
import If from "../../components/common/logic/If";

import {withUsersProvider} from "../../redux/providers/providers";

import TableView from "../layouts/TableView";
import {IoCheckboxOutline, IoLockClosedOutline, IoPencilOutline, IoTrashOutline} from "react-icons/io5";
import {useLocation} from "react-router-dom";
import {WithCourseLocationState} from "../../types/location/state";

const defaultUser: User = {
    name: '',
    lastName: '',
    email: ''
};

const Users = () => {
    const location = useLocation();
    const state = location.state as WithCourseLocationState;

    const dispatch = useDispatch();
    const { userStatusChanged } = useSliceActions();

    const approveUser = (id: string) => UserService.approveUser(id).then(
        () => dispatch(userStatusChanged(null))
    )
    const revokeUser = (id: string) => UserService.revokeUser(id).then(
        () => dispatch(userStatusChanged(null))
    )

    const convertorCreator : ConvertorCreator<User> = (onEdit, onDelete) => (column, rowData) => {
        let value: React.ReactNode = null;

        switch (column) {
            case 1: value = <div className="py-4">{rowData.name}</div>; break;
            case 2: value = <div className="py-4">{rowData.lastName}</div>; break;
            case 3: value = <div className="py-4">{rowData.email}</div>; break;
            case 4: value = <div className="py-4">{rowData.institution?.name}</div>; break;
            case 5: value = <div className="py-4">{rowData.status ? "Aprobado" : "Desaprobado"}</div>; break;
            case 6: value = <div className="py-4">{rowData.createdBy}</div>; break;
            case 7: value = <div className="py-4">{moment(rowData.createdOn).format('LLL')}</div>; break;
            case 8: value = (
                    <div className="flex justify-end px-5">
                        <MenuOptions options={[
                            <If condition={!rowData.status}>
                                <HasPermission permission={Permissions.USERS_APPROVE}>
                                    <div role="button" className="menu-option" onClick={() => approveUser(rowData.id!)}>
                                        <div><IoCheckboxOutline /></div>
                                        <span>Aprobar usuario</span>
                                    </div>
                                </HasPermission>
                            </If>,
                            <If condition={rowData.status === true}>
                                <HasPermission permission={Permissions.USERS_REVOKE}>
                                    <div role="button" className="menu-option" onClick={() => revokeUser(rowData.id!)}>
                                        <div><IoLockClosedOutline /></div>
                                        <span>Desaprobar usuario</span>
                                    </div>
                                </HasPermission>
                            </If>,
                            <HasPermission permission={Permissions.USERS_EDIT}>
                                <div role="button" className="menu-option text-secondary-dark" onClick={() => onEdit(rowData)}>
                                    <div><IoPencilOutline /></div>
                                    <span>Editar</span>
                                </div>
                            </HasPermission>,
                            <HasPermission permission={Permissions.USERS_DELETE}>
                                <div role="button" className="menu-option text-error" onClick={() => onDelete(rowData.id!)}>
                                    <div><IoTrashOutline /></div>
                                    <span>Eliminar</span>
                                </div>
                            </HasPermission>
                        ]} />
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
                       canAddPermission={Permissions.USERS_ADD}
                       defaultFilters={{ courseId: state?.courseId || '' }} />
        </div>
    )
}

const createFilterSchema = (filters: UserFilter, onFiltersUpdate: (x: UserFilter) => any) => ([
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

const columns = ["Nombre", "Apellido", "Correo", "Institución", "Estado", "Creado por", "Fecha de creación", ""];

export default withPermission(withUsersProvider(Users), Permissions.USERS);
