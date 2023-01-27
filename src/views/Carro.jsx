import React from 'react'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import { Dash } from 'react-bootstrap-icons';
import { Plus } from 'react-bootstrap-icons';
import { Bag } from 'react-bootstrap-icons';
import Context from '../Context';
import { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const Carro = () => {

    const { usuario, session, addCart, removeCart } = useContext(Context);

    const usuarioActivoIndex = usuario.findIndex(u => u.id == session.id);

    const notify = (opcion) => {
        if (opcion === 1) {
            toast.success("Producto cargado al Carrito!", {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: 'foo-bar fs-6'
            });
        } else {
            toast.success("Producto eliminado del Carrito!", {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: 'foo-bar fs-6'
            });
        }

    }

    const subTotal = usuario[usuarioActivoIndex].carro.map(carro => carro.producto.precio * carro.cantidad).reduce((prev, curr) => prev + curr, 0);

    let valorEnvio = 0;
    let total = 0;

    if (subTotal !== 0) {
        valorEnvio = 5000;
        total = subTotal + valorEnvio;
    }

    return (
        <Container className='container-page'>
            <h2 className='pb-2 pt-2 title text-center'>Carro de Compras</h2>

            <div className='pb-3 p-4'>
                {usuario[usuarioActivoIndex].carro.map((carro) => (

                    <Row className=' pt-2 pb-2 border-bottom'>
                        <Col md={2}>
                            <img src={carro.producto.img} alt='imagen-producto' width={100} height={100}></img>
                        </Col>
                        <Col md={8} className='align-self-center'>
                            <div className='fw-bold d-flex justify-content-between'>
                                <span> {carro.producto.nombre}</span>
                                <span>${carro.producto.precio.toLocaleString("es-CL")}</span>
                            </div>

                        </Col>
                        <Col md={2} className='align-self-center'>
                            <div className="fw-bold d-flex justify-content-around">
                                <Button variant="dark" onClick={(e) => {
                                    removeCart(carro.producto.id);
                                    notify(2);
                                }}><Dash /></Button>
                                <span className='p-2'>{carro.cantidad}</span>
                                <Button variant="dark" onClick={(e) => {
                                    addCart(carro.producto.id);
                                    notify(1);
                                }}><Plus /></Button>
                            </div>
                        </Col>
                    </Row>
                ))}
                <div className='mb-5 d-flex justify-content-between'>

                    <div className='align-self-center'>
                        <Button variant='dark' className='fs-5'>Comprar <Bag /></Button>
                    </div>
                    <div className='mt-4 fw-bold fs-5 w-25'>
                        <Row className='border p-1'>
                            <Col>
                                <span>Sub-Total:</span>
                            </Col>
                            <Col >
                                <span>${subTotal.toLocaleString("es-CL")}</span>
                            </Col>
                        </Row  >
                        <Row className='border p-1' >
                            <Col >
                                <span>Envio:</span>
                            </Col>
                            <Col >
                                <span>${valorEnvio.toLocaleString("es-CL")}</span>
                            </Col>
                        </Row>
                        <Row className='border p-1 bg-dark text-white'>
                            <Col>
                                <span>Total:</span>
                            </Col>
                            <Col>
                                <span>${total.toLocaleString("es-CL")}</span>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </Container>
    )
}

export default Carro