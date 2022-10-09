import React, {useState} from "react";
import {IoCloseOutline, IoInformationCircle} from "react-icons/io5";
import Modal from "../common/modal/Modal";

const BlockchainInformationHelper = ({ text }: { text: string }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex items-center space-x-2">
            <small>{ text }</small>
            <button className="text-secondary-dark">
                <IoInformationCircle onClick={() => setIsModalOpen(true)} />
            </button>
            <Modal id="blockchain-information-helper" isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)}>
                <div className="flex flex-col space-y-5 p-5">
                    <div className="flex justify-between">
                        <span className="subtitle">Información</span>
                        <button onClick={() => setIsModalOpen(false)}><IoCloseOutline size={20} /></button>
                    </div>
                    <div>
                        {/* ¿Qué es blockchain */}
                        {/* ¿Para qué usa esta página blockchain */}
                        {/* ¿Cómo usa esta página blockchain */}
                        {/* ¿Qué información se almacena en la red blockchain de EduChain */}
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button type="button" className="button-secondary" onClick={() => setIsModalOpen(false)}>
                            Regresar
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
};

export default BlockchainInformationHelper;
