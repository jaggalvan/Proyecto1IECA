
import ModalCalificacion from "../components/ModalCalificacion";
import TablaCalificacion from "../components/TablaCalificacion";

import { useEffect, useState } from "react"
import { Col, Container, Row, Card, CardHeader, CardBody, Button } from "reactstrap"


const Calificaciones = () => {
    const [calificacion, setCalificacion] = useState([])
    const [mostrarModal, setMostrarModal] = useState(false)
    const [editar, setEditar] = useState(null)


    const mostrarCalificacion = async () => {

        const response = await fetch("api/calificacion/Lista");

        if (response.ok) {
            const data = await response.json();
            setCalificacion(data)
        } else {
            console.log("Error en los datos de la lista")
        }

    }

    useEffect(() => {
        mostrarCalificacion()
    }, [])

    const guardarCalificacion = async(calificacion) => {

        const response = await fetch("api/calificacion/Guardar", {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(calificacion)

            
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarCalificacion();
        }

    }






    const editarCalificacion = async (calificacion) => {

        const response = await fetch("api/calificacion/Editar", {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(calificacion)
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarCalificacion();
        }

    }

    const eliminarCalificacion = async (id) => {

        var respuesta = window.confirm("Desea eliminar la calificacion?")

        if (!respuesta) {
            return;
        }

        const response = await fetch("api/calificacion/Eliminar/" + id, {
            method: 'DELETE'
        })

        if (response.ok) {
            mostrarCalificacion();
        }

    }


    function Materia() {

        return (<div>
            <h1>Hello!</h1>
            <h2>Good to see you here.</h2>
        </div>)
    }


    function Calificacion() {
        return (<Container>

            <CardHeader>

            </CardHeader>

            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5>Lista de Calificaciones</h5>
                        </CardHeader>
                        <CardBody>
                            <Button size="sm" color="success" onClick={() => setMostrarModal(!mostrarModal)}>Nuevo Calificacion</Button>
                            <hr></hr>
                            <TablaCalificacion data={calificacion}
                                setEditar={setEditar}
                                mostrarModal={mostrarModal}
                                setMostrarModal={setMostrarModal}
                                eliminarCalificacion={eliminarCalificacion}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <ModalCalificacion
                mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal}
                guardarCalificacion={guardarCalificacion}
                editar={editar}
                setEditar={setEditar}
                editarCalificacion={editarCalificacion}
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



    return (Calificacion())
};

export default Calificaciones;