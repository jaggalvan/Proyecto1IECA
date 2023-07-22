/// <reference path="modalalumno.js" />
/// <reference path="tablaalumno.js" />
import ModalAlumno from "../components/ModalAlumno";
import TablaAlumno from "../components/TablaAlumno";

import { useEffect, useState } from "react"
import { Col, Container, Row, Card, CardHeader, CardBody, Button } from "reactstrap"


const Blogss = () => {
    const [alumnos, setAlumnos] = useState([])
    const [mostrarModal, setMostrarModal] = useState(false)
    const [editar, setEditar] = useState(null)


    const mostrarAlumnos = async () => {

        const response = await fetch("api/alumno/Lista");

        if (response.ok) {
            const data = await response.json();
            setAlumnos(data)
        } else {
            console.log("Error en los datos de la lista")
        }

    }

    useEffect(() => {
        mostrarAlumnos()
    }, [])

    const guardarAlumno = async (alumno) => {

        const response = await fetch("api/alumno/Guardar", {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(alumno)
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarAlumnos();
        }

    }

    const editarAlumno = async (alumno) => {

        const response = await fetch("api/alumno/Editar", {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(alumno)
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarAlumnos();
        }

    }

    const eliminarAlumno = async (id) => {

        var respuesta = window.confirm("Desea eliminar el alumno?")

        if (!respuesta) {
            return;
        }

        const response = await fetch("api/alumno/Eliminar/" + id, {
            method: 'DELETE'
        })

        if (response.ok) {
            mostrarAlumnos();
        }

    }


    function Materia() {

        return (<div>
            <h1>Hello!</h1>
            <h2>Good to see you here.</h2>
        </div>)
    }


    function Alumno() {
        return (<Container>

            <CardHeader>

            </CardHeader>

            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5>Lista de Alumnos</h5>
                        </CardHeader>
                        <CardBody>
                            <Button size="sm" color="success" onClick={() => setMostrarModal(!mostrarModal)}>Nuevo Alumno</Button>
                            <hr></hr>
                            <TablaAlumno data={alumnos}
                                setEditar={setEditar}
                                mostrarModal={mostrarModal}
                                setMostrarModal={setMostrarModal}
                                eliminarAlumno={eliminarAlumno}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <ModalAlumno
                mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal}
                guardarAlumno={guardarAlumno}
                editar={editar}
                setEditar={setEditar}
                editarAlumno={editarAlumno}
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



    return (Alumno())
};

export default Blogss;