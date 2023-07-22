import { Button, Table } from "reactstrap"

const TablaMateria = ({ data, setEditar, mostrarModal, setMostrarModal, eliminarMateria}) => {

    const enviarDatos = (materia) => {
        setEditar(materia)
        setMostrarModal(!mostrarModal)
    }

    return (

        <Table striped responsive>
            <thead>
                <tr>
                    <th>Nombre</th>

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
                            <tr key={item.idmateria}>
                                <td>{item.nombre}</td>
                                
                                <td>
                                    <Button color="primary" size="sm" className="me-2" onClick={() => enviarDatos(item)}>Editar</Button>
                                    <Button color="danger" size="sm" onClick={() => eliminarMateria(item.idmateria)}>Eliminar</Button>
                                </td>
                            </tr>
                        ))
                    )
                }
            </tbody>
        </Table>
    )

}

export default TablaMateria;