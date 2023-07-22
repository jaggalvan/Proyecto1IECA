import { useEffect, useState } from "react"
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, ModalFooter, Button } from "reactstrap"

const modeloMateria = {
    idmateria: 0,
    nombre: "",
    
}

const ModalMateria = ({ mostrarModal, setMostrarModal, guardarMateria, editar, setEditar, editarMateria }) => {

    const [materia, setMateria] = useState(modeloMateria);

    const actualizaDato = (e) => {
        console.log(e.target.name + " : " + e.target.value)
        setMateria(
            {
                ...materia,
                [e.target.name]: e.target.value
            }
        )
    }

    const enviarDatos = () => {

        if (materia.idmateria == 0) {
            guardarMateria(materia)
        } else {
            editarMateria(materia)
        }

    }

    useEffect(() => {
        if (editar != null) {
            setMateria(editar)
        } else {
            setMateria(modeloMateria)
        }

    }, [editar])

    const cerrarModal = () => {
        setMostrarModal(!mostrarModal)
        setEditar(null)
    }

    return (

        <Modal isOpen={mostrarModal}>
            <ModalHeader>
                {materia.idmateria == 0 ? "Nueva materia" : "Editar MAteria"}
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input name="nombre" onChange={(e) => actualizaDato(e)} value={materia.nombre} />
                        
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

export default ModalMateria;