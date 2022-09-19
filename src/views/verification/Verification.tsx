import React, {FormEvent, useState} from "react";

import {useParams} from "react-router-dom";
import QualificationsTable from "../../containers/qualifications-table/QualificationsTable";
import QualificationBlockchainService from "../../services/QualificationBlockchainService";
import {Permissions} from "../../types/auth";
import withPermission from "../../hoc/with-permission/withPermission";

const Verification = () => {
    const { userIdentifier: userId } = useParams();

    const [userIdentifier, setUserIdentifier] = useState(userId);
    const [defaultFilters, setDefaultFilters] = useState({ userId });

    const verifyUserHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDefaultFilters({ userId: userIdentifier });
    };

    return (
        <div className="flex flex-col space-y-10">
            <form className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-5" onSubmit={verifyUserHandler}>
                <input className="form-input flex-1"
                       id="verification-user-identifier"
                       name="verification-user-identifier"
                       placeholder="Ingrese el identificador del usuario"
                       maxLength={100}
                       value={userIdentifier || ''}
                       onChange={(e) => setUserIdentifier(e.target.value)} />
                <button type="submit" className="button-primary w-full md:w-32">
                    Verificar
                </button>
            </form>
            <QualificationsTable service={QualificationBlockchainService} defaultFilters={defaultFilters} />
        </div>
    )
};

export default withPermission(Verification, Permissions.VERIFICATION);
