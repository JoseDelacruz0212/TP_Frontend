import React from "react";

const ConfirmationToast = ({ text, onClose, onSend }: { text: string, onClose: () => void, onSend: () => void }) => (
    <>
        <span className="flex justify-center text-center">{ text }</span>
        <div className="grid grid-cols-2 gap-2 mt-5">
            <button className="button-default" onClick={onSend}>Sí</button>
            <button className="button-default" onClick={onClose}>No</button>
        </div>
    </>
);

export default ConfirmationToast;
