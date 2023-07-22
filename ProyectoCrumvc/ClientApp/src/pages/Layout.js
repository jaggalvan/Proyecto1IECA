import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Inicio</Link>
                    </li>
                    <li>
                        <Link to="/blogs">Alumno</Link>
                    </li>
                    <li>
                        <Link to="/contact">Materia</Link>
                    </li>
                    <li>
                        <Link to="/calificaciones">Calificaciones</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    )
};

export default Layout;