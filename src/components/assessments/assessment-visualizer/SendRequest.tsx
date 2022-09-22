import React from "react";
import {toast} from "react-toastify";
import ConfirmationToast from "../../common/confirmation-toast/ConfirmationToast";

const SendRequest = ({ onSendRequest }: { onSendRequest: () => void }) => {
    const toastId = React.useRef<any>(null);

    const showStartRequestMessage = () => {
        toastId.current = toast(<ConfirmationToast text="¿Desea enviar una nueva solicitud de reclamo?"
                                                   onClose={onStartRequestMessageClose}
                                                   onSend={onSendRequestHandler} />, {
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
