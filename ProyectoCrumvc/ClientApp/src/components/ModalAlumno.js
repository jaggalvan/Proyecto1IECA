import { useEffect, useState } from "react"
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, ModalFooter, Button } from "reactstrap"

const modeloAlumno = {
    idalumno: 0,
    nombre: "",
    correo: "",
    telefono: "",
    direccion: ""
}

const ModalAlumno = ({ mostrarModal, setMostrarModal, guardarAlumno, editar, setEditar, editarAlumno }) => {

    const [alumno, setAlumno] = useState(modeloAlumno);

    const actualizaDato = (e) => {
        console.log(e.target.name + " : " + e.target.value)
        setAlumno(
            {
                ...alumno,
                [e.target.name]: e.target.value
            }
        )
    }

    const enviarDatos = () => {

        if (alumno.idalumno == 0) {
            guardarAlumno(alumno)
        } else {
            editarAlumno(alumno)
        }

    }

    useEffect(() => {
        if (editar != null) {
            setAlumno(editar)
        } else {
            setAlumno(modeloAlumno)
        }

    }, [editar])

    const cerrarModal = () => {
        setMostrarModal(!mostrarModal)
        setEditar(null)
    }

    return (

        <Modal isOpen={mostrarModal}>
            <ModalHeader>
                {alumno.idalumno == 0 ? "Nuevo Alumno" : "Editar Alumno"}
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input name="nombre" onChange={(e) => actualizaDato(e)} value={alumno.nombre} />
                        
                    </FormGroup>
                    <FormGroup>
                        <Label>Correo</Label>
                        <Input name="correo" onChange={(e) => actualizaDato(e)} value={alumno.correo} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Telefono</Label>
                        <Input name="telefono" onChange={(e) => actualizaDato(e)} value={alumno.telefono} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Direccion</Label>
                        <Input name="direccion" onChange={(e) => actualizaDato(e)} value={alumno.direccion} />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" size="sm" onClick={enviarDatos}>Guardar</Button>
                <Button color="danger" size="sm" onClick={cerrarModal}>Cerrar</Button>
            </ModalFooter>
        </Modal>

    )

}

export default ModalAlumno;