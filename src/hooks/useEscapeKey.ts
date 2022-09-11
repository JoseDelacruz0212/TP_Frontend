import {useEffect} from "react";

const useEscapeKey = (handleClose?: () => void, closeOnEscapeKey: boolean = true) => {
    useEffect(() => {
        const closeOnEscapeKeyHandler = (e: KeyboardEvent) => e.key === 'Escape' ? handleClose && handleClose() : null;

        closeOnEscapeKey && document.body.addEventListener('keydown', closeOnEscapeKeyHandler);

        return () => {
            closeOnEscapeKey && document.body.removeEventListener('keydown', closeOnEscapeKeyHandler);
        }
    }, [handleClose]);
};

export default useEscapeKey;
