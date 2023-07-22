/* eslint-disable no-undef */
import { useEffect, useState } from "react"
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, ModalFooter, Button } from "reactstrap"
import { SearchBar } from "../components/SearchBar";
import { SearchResultsList } from "../components/SearchResultsList";


const modeloCalificacion = {
    idalumno: 0,
    idmateria:0,
    calificacion1: 0,
}


const ModalCalificacion = ({ mostrarModal, setMostrarModal, guardarCalificacion, editar, setEditar, editarCalificacion }) => {

    const [calificacion, setCalificacion] = useState(modeloCalificacion);

    const [materianombre, setNombremateria] = useState("")
    const [MateriaList, setMateriaList] = useState([{ 'nombre': '', 'id': '' }])






    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("api/materia/Lista");
            const newData = await response.json();
            setMateriaList(newData);
            // console.log(newData);
        };
        fetchData();
    }, [])




    const actualizaDato = (e) => {
        console.log(e.target.name + " : " + e.target.value)
        setCalificacion(
            {
                ...calificacion,
                [e.target.name]: e.target.value
            }
        )
    }

    const enviarDatos = () => {

        if (calificacion.idalumno != 0) {
            guardarCalificacion() 
        }

        if (calificacion.idalumno == 0) {
            guardarCalificacion()
        } else {
           /* editarCalificacion(idalumno, idmaterial, calificacion)*/
        }

    }

    useEffect(() => {
        if (editar != null) {
            setCalificacion(editar)
        } else {
            setCalificacion(modeloCalificacion)
        }

    }, [editar])

    const cerrarModal = () => {
        setMostrarModal(!mostrarModal)
        setEditar(null)
    }


    const ca = () => {
        //setMostrarModal(!mostrarModal)
        //setEditar(null)



        if (calificacion.calificacion != 0) {
            //var valor = results[0].idalumno
            //var n = materianombre

            modeloCalificacion.idalumno = results[0].idalumno
            modeloCalificacion.idmateria = materianombre

            modeloCalificacion.calificacion1 = calificacion.calificacion
            guardarCalificacion(modeloCalificacion)
        }
    }

    const [results, setResults] = useState([]);


    const handleChange = (event) => {
        setNombremateria(event.target.value);
    }

   

   
    return (

        <Modal isOpen={mostrarModal}>
            <ModalHeader>
                {calificacion.idalumno == 0 ? "Nueva califacion" : "Editar Calificacion"}
               
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Nombre</Label>
                       

                        <div className="App">
                            <div className="search-bar-container">
                                <SearchBar setResults={setResults} />
                                {results && results.length > 0 && <SearchResultsList results={results} value={results.idalumno} />}
                            </div>
                        </div>

                        
                    </FormGroup>
                    <FormGroup>
                        <Label>Materia</Label>

                        <select    className="form-control" value={materianombre} onChange={handleChange}>
                            <option value="" defaultValue={calificacion.idmateria}  >Elije la materia</option>

                            {MateriaList.map(materia => (
                                <option value={materia.idmateria} key={materia.idmateria} >{materia.nombre}</option>

                            ))
                            }

                        </select>
                    </FormGroup>
                    <FormGroup>
                        <Label>Calificacion</Label>
                        <Input name="calificacion" onChange={(e) => actualizaDato(e)} value={calificacion.calificacion1} />
                    </FormGroup>

                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" size="sm" onClick={ca}>Guardar</Button>
                <Button color="danger" size="sm" onClick={cerrarModal}>Cerrar</Button>
                
            </ModalFooter>
        </Modal>

    )

}

export default ModalCalificacion;