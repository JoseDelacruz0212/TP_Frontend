import React, {FormEvent, useState} from "react";
import {IoCloseOutline} from "react-icons/io5";
import CoursesSelect from "../../containers/selects/CoursesSelect";
import Modal from "../common/modal/Modal";
import {User} from "../../types/communication/responses/user";

interface UserCourseAssignationModalProps {
    isOpen: boolean;
    handleClose: () => void;
    selectedUser?: User;
    onAssign: (userId: string, courseId: string) => void;
}

const UserCourseAssignationModal = ({ isOpen, handleClose, selectedUser, onAssign }: UserCourseAssignationModalProps) => {
    const [selectedCourse, setSelectedCourse] = useState<string | null>(null)

    const onAssignHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (selectedUser && selectedUser?.idUser && selectedCourse) {
            onAssign(selectedUser.idUser, selectedCourse);
        }
    };

    return (
        <Modal id="user-course-assignation-modal"
               isOpen={isOpen}
               handleClose={handleClose}>
            <div className="flex flex-col space-y-5 p-4">
                <div className="flex justify-between items-center">
                    <span className="subtitle">Asignar curso a {selectedUser?.name}</span>
                    <button onClick={handleClose}>
                        <IoCloseOutline />
                    </button>
                </div>
                <form className="flex flex-col space-y-5" onSubmit={onAssignHandler}>
                    <CoursesSelect onCourseChanged={setSelectedCourse} />
                    <div className="flex justify-end space-x-2">
                        <button type="submit" className="button-primary">
                            Asignar
                        </button>
                        <button type="button" className="button-secondary" onClick={handleClose}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    )
};

export default UserCourseAssignationModal;
