import {
    IoDocumentOutline,
    IoEllipsisVerticalOutline,
    IoPencilOutline,
    IoPeopleOutline,
    IoTrashOutline
} from "react-icons/io5";

import { CoursesActionsProps } from "../../types/components/courses/courses";
import {useState} from "react";

const CourseActions = ({ onEdit, onDelete }: CoursesActionsProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="absolute">
            <button className="hover:bg-gray-100 p-1 rounded-full absolute -top-3 -right-3" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <IoEllipsisVerticalOutline />
            </button>
            {
                isMenuOpen &&
                <div className="relative top-3 bg-surface border rounded-md shadow-md">
                    <ul>
                        <li>
                            <div role="button" className="px-2 py-1 flex items-center space-x-2 hover:bg-gray-100">
                                <div><IoPeopleOutline /></div>
                                <span>Ver usuarios</span>
                            </div>
                        </li>
                        <li>
                            <div role="button" className="px-2 py-1 flex items-center space-x-2 hover:bg-gray-100">
                                <div><IoDocumentOutline /></div>
                                <span>Ver evaluaciones</span>
                            </div>
                        </li>
                        <li>
                            <div role="button" className="px-2 py-1 flex items-center space-x-2 hover:bg-gray-100 text-secondary-dark" onClick={onEdit}>
                                <div><IoPencilOutline /></div>
                                <span>Editar</span>
                            </div>
                        </li>
                        <li>
                            <div role="button" className="px-2 py-1 flex items-center space-x-2 hover:bg-gray-100 text-error" onClick={onDelete}>
                                <div><IoTrashOutline /></div>
                                <span>Eliminar</span>
                            </div>
                        </li>
                    </ul>
                </div>
            }
        </div>
    );
}

export default CourseActions;