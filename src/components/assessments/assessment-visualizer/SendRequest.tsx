import React from "react";
import {toast} from "react-toastify";

const StartRequestMessage = ({ onClose, onSend }: { onClose: () => void, onSend: () => void }) => (
    <>
        <span className="flex justify-center text-center">¿Desea enviar una nueva solicitud de reclamo?</span>
        <div className="grid grid-cols-2 gap-2 mt-5">
            <button className="button-default" onClick={onSend}>Sí</button>
            <button className="button-default" onClick={onClose}>No</button>
        </div>
    </>
);

const SendRequest = ({ onSendRequest }: { onSendRequest: () => void }) => {
    const toastId = React.useRef<any>(null);

    const showStartRequestMessage = () => {
        toastId.current = toast(<StartRequestMessage onClose={onStartRequestMessageClose} onSend={onSendRequestHandler} />, {
            closeButton: true,
            autoClose: false,
            closeOnClick: false,
            progress: 100
        })
    }

    const onStartRequestMessageClose = () => toast.dismiss(toastId.current);
    const onSendRequestHandler = () => {
        toast.dismiss(toastId.current);
        onSendRequest();
    }

    return (
        <div className="flex justify-end">
            <button className="button-default" onClick={showStartRequestMessage}>
                Iniciar reclamo
            </button>
        </div>
    );
}

export default SendRequest;
