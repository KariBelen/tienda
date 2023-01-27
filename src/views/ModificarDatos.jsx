import React, { useState } from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import Context from '../Context';
import { useContext } from 'react';
import { Alert } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

const ModificarDatos = () => {

    const { usuario, setUsuario, session } = useContext(Context);

    const usuarioEncontrado = usuario.find((e) => e.id === session.id);
    const indexUsuario = usuario.findIndex((e) => e.id == session.id);
    const [form, setForm] = useState({
        nombre: usuarioEncontrado.nombre,
        apellido: usuarioEncontrado.apellido,
        email: usuarioEncontrado.email,
        contraseña1: usuarioEncontrado.contraseña,
        contraseña2: usuarioEncontrado.contraseña
    });
    const [errorMsj, setErrorMsj] = useState('');

    const navigate = useNavigate();

    const notify = () => {
        toast.success("Cuenta modificada Exitosamente!", {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: 'foo-bar fs-6'
        });
    }

    const modificarDatosUsuario = () => {

        setErrorMsj('');

        if (form.nombre == null || form.apellido == null || form.email == null || form.contraseña1 == null || form.contraseña2 == null) {
            setErrorMsj('Todos los campos son obligatorios!!');
            return;
        }
        else if (form.contraseña1 !== form.contraseña2) {
            setErrorMsj('Las contraseñas no coinciden!!');
            return;
        }

        usuario[indexUsuario] = {
            id: usuarioEncontrado.id,
            nombre: form.nombre,
            apellido: form.apellido,
            email: form.email,
            contraseña: form.contraseña1,
            tipo: usuarioEncontrado.tipo,
            carro: usuarioEncontrado.carro,
            favoritos: usuarioEncontrado.favoritos
        }

        setUsuario([...usuario]);

        navigate('/productos');
        notify();
    }

    return (
        <Container >
            <div className="align-middle p-5 vh-100">
                <div className='p-4 bg-section rounded'>
                    <h2 className='pb-3 title text-center'>Mis Datos</h2>
                    <Row className="justify-content-md-center">
                        <Col lg={4}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Nombre"
                                className="mb-3"
                            >
                                <Form.Control type="text"
                                    placeholder="Nombre"
                                    defaultValue={usuarioEncontrado.nombre}
                                    onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col lg={4}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Apellido"
                                className="mb-3"
                            >
                                <Form.Control type="text" placeholder="Apellido"
                                    defaultValue={usuarioEncontrado.apellido}
                                    onChange={(e) => setForm({ ...form, apellido: e.target.value })} />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col lg={4}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email"
                                className="mb-3"
                            >
                                <Form.Control type="email" placeholder="name@example.com"
                                    defaultValue={usuarioEncontrado.email}
                                    disabled
                                    onChange={(e) => setForm({ ...form, email: e.target.value })} />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col lg={4}>
                            <FloatingLabel controlId="floatingPassword" label="Contraseña" className="mb-3">
                                <Form.Control type="password" placeholder="Contraseña"
                                    defaultValue={usuarioEncontrado.contraseña}
                                    onChange={(e) => setForm({ ...form, contraseña1: e.target.value })} />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col lg={4}>
                            <FloatingLabel controlId="floatingPassword" label="Repita Contraseña" className="mb-3">
                                <Form.Control type="password" placeholder="Contraseña" defaultValue={usuarioEncontrado.contraseña}
                                    onChange={(e) => setForm({ ...form, contraseña2: e.target.value })} />
                            </FloatingLabel>
                        </Col>
                    </Row>

                    {errorMsj !== '' &&
                        <Row className="justify-content-md-center text-center">
                            <Col lg={4}>
                                <Alert key={'danger'} variant={'danger'}>{errorMsj}</Alert>
                            </Col>
                        </Row>
                    }
                    <Row className="justify-content-md-center">
                        <Col lg={3} className='text-center'>
                            <Button variant='dark' className='mb-3' onClick={modificarDatosUsuario}>Modificar Datos</Button>
                        </Col>
                    </Row>
                </div>
            </div>
            <ToastContainer />
        </Container>
    )
}

export default ModificarDatos