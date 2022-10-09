import React, {FormEvent, useState} from "react";

import {useParams} from "react-router-dom";
import QualificationsTable from "../../containers/qualifications-table/QualificationsTable";
import QualificationBlockchainService from "../../services/QualificationBlockchainService";
import AssessmentQualificationHistoryModal from "../../components/verification/AssessmentQualificationHistoryModal";
import BlockchainInformationHelper from "../../components/helpers/BlockchainInformationHelper";

const Verification = () => {
    const { userIdentifier: userId } = useParams();

    const [userIdentifier, setUserIdentifier] = useState(userId);
    const [defaultFilters, setDefaultFilters] = useState({ userId });

    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [history, setHistory] = useState<{ points: number; transactionDate?: string }[] | undefined>();

    const verifyUserHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDefaultFilters({ userId: userIdentifier });
    };

    const onHistoryClick = (history: { points: number; transactionDate?: string }[]) => {
        setIsHistoryOpen(true);
        setHistory(history);
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
            <div className="pl-1">
                <BlockchainInformationHelper text="Esta página obtiene la información de la red Blockchain de EduChain" />
            </div>
            <QualificationsTable service={QualificationBlockchainService}
                                 defaultFilters={defaultFilters}
                                 showHistory
                                 onHistoryClick={onHistoryClick} />
            <AssessmentQualificationHistoryModal isOpen={isHistoryOpen}
                                                 handleClose={() => setIsHistoryOpen(false)}
                                                 history={history} />
        </div>
    )
};

export default Verification;
