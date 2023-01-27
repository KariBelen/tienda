import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { CartFill, HeartFill, Shop, BoxArrowRight } from 'react-bootstrap-icons';
import Context from '../Context';
import { ToastContainer, toast } from 'react-toastify';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavBar = () => {

    const { session, setSession, usuario } = useContext(Context);


    const usuarioActivo = session ? usuario.find((u) => u.id === session.id) : { nombre: '', apellido: '' };

    const notify = () => {
        toast.success("Sesion Cerrada Exitosamente", {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: 'foo-bar fs-6'
        });
    }

    const cerrarSesion = () => {
        setSession(null);
        notify();
    }

    return (
        <Navbar className='fs-5' bg="dark" variant='dark'>
            <Container>
                <Navbar.Brand><Shop /> PKMstore</Navbar.Brand>
                <Navbar.Collapse>
                    <Nav>
                        <Link className='navlink' to="/home">Inicio</Link>
                        {session && session.tipo === 1 &&
                            <Link className='navlink' to="/productos">Productos</Link>
                        }
                        {session && session.tipo === 0 &&
                            <Link className='navlink' to="/gestion">Administrar Productos</Link>
                        }
                    </Nav>
                </Navbar.Collapse>
                <div className=" d-flex justify-content-end">
                    <Navbar.Collapse>
                        <Nav>
                            {!session &&
                                <div>
                                    <Link className='navlink' to="/registro">Registro</Link>
                                    <Link className='navlink' to="/login">Login</Link>
                                </div>
                            }
                            {session && session.tipo === 1 &&
                                <div>
                                    <Link className='navlink' to="/favoritos"><HeartFill /></Link>
                                    <Link className='navlink' to="/carro"><CartFill /></Link>
                                </div>
                            }
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse>
                        <Nav>
                            {session &&
                                <div>
                                    <NavDropdown title={`${usuarioActivo.nombre} ${usuarioActivo.apellido}`}>
                                        <NavDropdown.Item>
                                            <Link className='droplink' to="/modificarDatos">Modificar Mis Datos</Link>
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item>
                                            <Link className='droplink' onClick={cerrarSesion} to="/home">Cerrar Sesion <BoxArrowRight /></Link>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </div>
                            }

                        </Nav>
                    </Navbar.Collapse>
                </div>

            </Container>
            <ToastContainer />
        </Navbar>
    )
}

export default NavBar