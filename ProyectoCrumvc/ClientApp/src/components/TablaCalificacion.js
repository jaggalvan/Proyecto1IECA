import { Button, Table } from "reactstrap"

const TablaCalificacion = ({ data, setEditar, mostrarModal, setMostrarModal, eliminarCalificacion }) => {

    const enviarDatos = (calificacion) => {
        setEditar(calificacion)
        setMostrarModal(!mostrarModal)
    }

    return (

        <Table striped responsive>
            <thead>
                <tr>
                    <th>Nombre Alumno</th>
                    <th>Materia</th>
                    <th>Calificacion</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    (data.length < 1) ? (
                        <tr>
                            <td colSpan="4">Sin registros</td>
                        </tr>
                    ) : (
                        data.map((item) => (
                            <tr key={item.idcalificacion}>
                                <td>{item.nombre}</td>
                                <td>{item.nombrem}</td>
                                <td>{item.calificacion1}</td>
                                <td>
                                   
                                    

                                    <Button color="primary" size="sm" className="me-2" onClick={() => enviarDatos(item)}>Editar</Button>
                                    <Button color="danger" size="sm" onClick={() => eliminarCalificacion(item.idcalificacion)}>Eliminar</Button>
                                </td>
                            </tr>
                        ))
                    )
                }
            </tbody>
        </Table>
    )

}

export default TablaCalificacion;