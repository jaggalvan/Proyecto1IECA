///// <reference path="modalmateria.js" />
///// <reference path="tablamateria.js" />
import ModalMateria from "../components/ModalMateria";
import TablaMateria from "../components/TablaMateria";



import { useEffect, useState } from "react"
import { Col, Container, Row, Card, CardHeader, CardBody, Button } from "reactstrap"


const Contact = () => {
    const [materias, setMaterias] = useState([])
    const [mostrarModal, setMostrarModal] = useState(false)
    const [editar, setEditar] = useState(null)


    const mostrarMaterias = async () => {

        const response = await fetch("api/materia/Lista");

        if (response.ok) {
            const data = await response.json();
            setMaterias(data)
        } else {
            console.log("Error en los datos de la lista")
        }

    }

    useEffect(() => {
        mostrarMaterias()
    }, [])

    const guardarMaterias = async (materia) => {

        const response = await fetch("api/materia/Guardar", {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(materia)
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarMaterias();
        }

    }

    const editarMateria = async (materia) => {

        const response = await fetch("api/materia/Editar", {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(materia)
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarMaterias();
        }

    }

    const eliminarMateria = async (id) => {

        var respuesta = window.confirm("Desea eliminar el materia?")

        if (!respuesta) {
            return;
        }

        const response = await fetch("api/materia/Eliminar/" + id, {
            method: 'DELETE'
        })

        if (response.ok) {
            mostrarMaterias();
        }

    }





    function Materia() {
        return (<Container>

            <CardHeader>

            </CardHeader>

            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5>Lista de Materias</h5>
                        </CardHeader>
                        <CardBody>
                            <Button size="sm" color="success" onClick={() => setMostrarModal(!mostrarModal)}>Nuevo Materia</Button>
                            <hr></hr>
                            <TablaMateria data={materias}
                                setEditar={setEditar}
                                mostrarModal={mostrarModal}
                                setMostrarModal={setMostrarModal}
                                eliminarMateria={eliminarMateria}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <ModalMateria
                mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal}
                guardarMateria={guardarMaterias}
                editar={editar}
                setEditar={setEditar}
                editarMateria={editarMateria}
            />
        </Container>)
    }





    //function Botones() {
    //    return (
    //        <Container>

    //            <CardHeader>

    //            </CardHeader>

    //            <Card>

    //                <CardBody>
    //                    <Button size="sm" color="success" onClick={() => Alumno()}>Alumno</Button>
    //                    <Button size="sm" color="success" onClick={() => setMostrarModal(!mostrarModal)}>Materia</Button>
    //                    <Button size="sm" color="success" onClick={() => setMostrarModal(!mostrarModal)}>Calificacion</Button>
    //                </CardBody>
    //            </Card>
    //        </Container>
    //    )
    //}



    return (Materia())
};

//export default Blogss;





//const Contact = () => {
//    return <h1>Contact Me</h1>;
//};

export default Contact;