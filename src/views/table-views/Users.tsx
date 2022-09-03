import React from "react";
import moment from "moment/moment";

import {User} from "../../types/communication/responses/user";
import {ConvertorCreator} from "../../types/hooks/table";
import TableView from "../layouts/TableView";
import {Entity} from "../../types/communication/responses/entity";
import {UserFilter} from "../../types/communication/requests/user";
import UserService from "../../services/UserService";
import withPermission from "../../components/hoc/withPermission";
import {withUsersProvider} from "../../redux/providers/providers";
import {Permissions} from "../../types/app/auth";
import Text from "../../components/common/table/filter-renderer/elements/Text";
import {IoCheckboxOutline, IoLockClosedOutline, IoPencilOutline, IoTrashOutline} from "react-icons/io5";
import MenuOptions from "../../components/common/menu/MenuOptions";

const defaultUser: User = {
    name: '',
    lastName: '',
    email: ''
};

const Users = () => {
    const convertorCreator : ConvertorCreator<User> = (onEdit, onDelete) => (column, rowData) => {
        let value: React.ReactNode = null;

        switch (column) {
            case 1: value = <div className="py-4">{rowData.name}</div>; break;
            case 2: value = <div className="py-4">{rowData.lastName}</div>; break;
            case 3: value = <div className="py-4">{rowData.email}</div>; break;
            case 4: value = <div className="py-4">{rowData.status ? "Aprobado" : "Desaprobado"}</div>; break;
            case 5: value = <div className="py-4">{rowData.createdBy}</div>; break;
            case 6: value = <div className="py-4">{moment(rowData.createdOn).format('LLL')}</div>; break;
            case 7: value = (
                    <div className="flex justify-end px-5">
                        <MenuOptions options={getMenuOptions<User>(onEdit, onDelete, rowData)} />
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
                       formInputs={() => null}
                       defaultItemSchema={defaultUser}
                       addButtonText="Crear usuario" />
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

const columns = ["Nombre", "Apellido", "Correo", "Estado", "Creado por", "Fecha de creación", ""];

const getMenuOptions = <T extends Entity>(onEdit: (x: T) => void, onDelete: (x: string) => void, rowData: T) => [
    <div role="button" className="menu-option">
        <div><IoCheckboxOutline /></div>
        <span>Aprobar usuario</span>
    </div>,
    <div role="button" className="menu-option">
        <div><IoLockClosedOutline /></div>
        <span>Desaprobar usuario</span>
    </div>,
    <div role="button" className="menu-option text-secondary-dark" onClick={() => onEdit(rowData)}>
        <div><IoPencilOutline /></div>
        <span>Editar</span>
    </div>,
    <div role="button" className="menu-option text-error" onClick={() => onDelete(rowData.id!)}>
        <div><IoTrashOutline /></div>
        <span>Eliminar</span>
    </div>
];

export default withPermission(withUsersProvider(Users), Permissions.USERS);
