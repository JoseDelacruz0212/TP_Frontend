import React, {useLayoutEffect, useState} from "react";
import { createPortal } from "react-dom";

interface ModalProps {
    children: React.ReactNode;
    wrapperId: string;
}

const Modal = ({ children, wrapperId }: ModalProps) => {
    const [wrapper, setWrapper] = useState<HTMLElement | null>(null);

    useLayoutEffect(() => {
        let element = document.getElementById(wrapperId);
        let created = false;

        if (!element) {
            created = true;
            element = createModalWrapper(wrapperId);
        }

        setWrapper(element);

        return () => {
            if (created && element?.parentNode) {
                element.parentNode.removeChild(element);
            }
        }
    }, [wrapperId]);

    if (!wrapper) return null;

    return createPortal(children, wrapper);
};

const createModalWrapper = (wrapperId: string) => {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('id', wrapperId);
    document.body.appendChild(wrapper);
    return wrapper;
};

export default Modal;
