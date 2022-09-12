import React, {FormEvent, useEffect, useState} from "react";

import BlockchainService from "../../services/BlockchainService";

import Table from "../../components/common/table/Table";
import Chip from "../../components/common/chip/Chip";
import {useParams} from "react-router-dom";

const Verification = () => {
    const { userIdentifier: userId } = useParams();

    const [userIdentifier, setUserIdentifier] = useState(userId);
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        if (userIdentifier) {
            BlockchainService.getByUserId(userIdentifier).then(response => setData(response.data.response));
        }
    }, [userIdentifier]);

    const verifyUserHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (userIdentifier) {
            BlockchainService.getByUserId(userIdentifier).then(response => setData(response.data.response));
        }
    };

    const getValueForRow = (column: number, rowData: any) => {
        switch (column) {
            case 0: return rowData.model;
            case 1: return rowData.make;
            case 2: return rowData.model;
            case 3:
                let color = "bg-green-500 text-white";

                if (parseFloat(rowData.owner) < 13) color = "bg-yellow-50";
                else if (parseFloat(rowData.owner) < 10) color = "bg-red-50 text-white";

                return (
                    <div className="py-4">
                        <Chip label={rowData.owner?.toString()} className={color} />
                    </div>
                );
        }
    };

    const rows = data ? [data].map((rowData: any, index: number) => ({
        key: index,
        rowValues: columns.map((column, index) => ({
            key: index,
            value: getValueForRow(index, rowData)
        }))
    })) : [];

    return (
        <div className="flex flex-col space-y-10">
            <form className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-5" onSubmit={verifyUserHandler}>
                <input className="form-input flex-1"
                       id="verification-user-identifier"
                       name="verification-user-identifier"
                       placeholder="Ingrese el identificador del usuario"
                       maxLength={100}
                       value={userIdentifier}
                       onChange={(e) => setUserIdentifier(e.target.value)} />
                <button type="submit" className="button-primary w-full md:w-32">
                    Verificar
                </button>
            </form>
            <Table title="Lista de calificaciones"
                   columns ={columns}
                   rows={rows}
                   hidePagination />
        </div>
    )
};

const columns = [
    { key: 1, label: 'Evaluación' },
    { key: 2, label: 'Curso' },
    { key: 3, label: 'Institución' },
    { key: 4, label: 'Calificación' }
]

export default Verification;
