import React from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import Context from '../Context';
import { useContext, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {

    const [errorMsj, setErrorMsj] = useState('');
    const {usuario, setSession } = useContext(Context);
    const [form, setForm] = useState({});

    const navigate = useNavigate();

    const notify = () => {
        toast.success("Ha Ingresado Correctamente!", {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: 'foo-bar fs-6'
          });
    }

    const validarLogin = () => {
        let usuarioEncontrado = usuario.find((e) => e.email === form.usuario);
        if(!usuarioEncontrado){
            setErrorMsj('Cuenta no Existe!');
            return;
        }else if(usuarioEncontrado.email !== form.usuario || usuarioEncontrado.contraseña !== form.contraseña){

            setErrorMsj('Usuario o Contraseña Incorrecta!!');
            return;
        }

        setSession({id: usuarioEncontrado.id, tipo: usuarioEncontrado.tipo});
        navigate('/home');
        notify();
    }


    return (
        <Container >
            <div className="align-middle p-5 vh-100">
                <div className='p-4 bg-section rounded'>
                    <h2 className='pb-3 title text-center'>Login</h2>
                    <Row className="justify-content-md-center">
                        <Col lg={3}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email"
                                className="mb-3"
                            >
                                <Form.Control type="email" placeholder="name@example.com"
                                onChange={(e) => setForm({ ...form, usuario: e.target.value })} />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col lg={3}>
                            <FloatingLabel controlId="floatingPassword" label="Contraseña" className="mb-3">
                                <Form.Control type="password" placeholder="Password"
                                onChange={(e) => setForm({ ...form, contraseña: e.target.value })} />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col lg={3}>
                            <Form.Check
                                type={'checkbox'}
                                id={`remember`}
                                label={`Recuerdame`}
                                className="mb-3"
                            />
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
                            <Button variant='dark' className='mb-3' onClick={validarLogin}>Ingresar</Button>
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center">
                        <Col lg={3} className='text-center'>
                            <p>¿Olvidaste tu contraseña? <Link className='link'><span className='fw-bold'>Recuperar</span></Link></p>
                        </Col>
                    </Row>    
                </div>
            </div>
            <ToastContainer />
        </Container>
    )
}

export default Login