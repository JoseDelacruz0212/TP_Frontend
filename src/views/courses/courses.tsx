import ICourses from '../../types/communication/responses/courses';
const defaultCourses: ICourses = {
  name: '',
  description: '',
  institution: '',
  createdAt:new Date(),
  updatedAt: new Date(),
  createdBy: '',
  updatedBy:'',
};

const Courses = () => {

}

const columns = ["Nombre", "Descripción", "Institución", "Creado por", "Fecha de creación", "Actualizado por", "Fecha de actualización", ""];