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


const Registro = () => {


    const {usuario, setUsuario } = useContext(Context);
    const [form, setForm] = useState({});
    const [errorMsj, setErrorMsj] = useState('');

    const navigate = useNavigate();

    const notify = () => {
        toast.success("Cuenta creada Exitosamente!", {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: 'foo-bar fs-6'
          });
    }

    const registrarUsuario = () => {

        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; //eslint-disable-line

        setErrorMsj('');

        const usuarioEncontrado = usuario.find((e) => e.email === form.email);

        if(form.nombre == null || form.apellido == null || form.email == null || form.contraseña1 == null || form.contraseña2 == null){
            setErrorMsj('Todos los campos son obligatorios!!');
            return;
        } 
        else if (form.contraseña1 !== form.contraseña2) {
            setErrorMsj('Las contraseñas no coinciden!!');
            return;
        }else if(regex.test(form.email) === false){
            setErrorMsj('El email es invalido!!');
            return;
        }else if(usuarioEncontrado){
            setErrorMsj('Este email ya se encuentra registrado!!');
            return;
        }

        let id = 1;
        //Codigo autogenera ID segun el ultimo usuario
        if(usuario.length !== 0){
            id = usuario[usuario.length -1].id + 1;
        }

        setUsuario([...usuario, {id: id, nombre: form.nombre, apellido: form.apellido, email: form.email, contraseña: form.contraseña1, tipo: 1, carro: [], favoritos: []}]);
        
        navigate('/login');
        notify();
    }

    return (
        <Container >
            <div className="align-middle p-5 vh-100">
                <div className='p-4 bg-section rounded'>
                    <h2 className='pb-3 title text-center'>Registro</h2>
                    <Row className="justify-content-md-center">
                        <Col lg={4}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Nombre"
                                className="mb-3"
                            >
                                <Form.Control type="text"
                                    placeholder="Nombre"
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
                                    onChange={(e) => setForm({ ...form, email: e.target.value })} />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col lg={4}>
                            <FloatingLabel controlId="floatingPassword" label="Contraseña" className="mb-3">
                                <Form.Control type="password" placeholder="Contraseña"
                                    onChange={(e) => setForm({ ...form, contraseña1: e.target.value })} />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col lg={4}>
                            <FloatingLabel controlId="floatingPassword" label="Repita Contraseña" className="mb-3">
                                <Form.Control type="password" placeholder="Contraseña"
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
                            <Button variant='dark' className='mb-3' onClick={registrarUsuario}>Registrarse</Button>
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center">
                        <Col lg={4} className='text-center'>
                            <p>¿Ya tienes una cuenta? <Link className='link' to="/login"><span className='fw-bold'>Iniciar Sesion</span></Link></p>
                        </Col>
                    </Row>
                </div>
            </div>
            <ToastContainer />
        </Container>
    )
}

export default Registro