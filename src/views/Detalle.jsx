import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Cart } from 'react-bootstrap-icons';
import img12 from "../assets/img/12.png";
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Context from '../Context';
import { useNavigate } from 'react-router-dom/dist';
import { ToastContainer, toast } from 'react-toastify';



const Detalle = () => {

    const { idProducto } = useParams();

    const { productos, addCart } = useContext(Context);

    const productoSeleccionado = productos.find(p => p.id == idProducto);
    const navigate = useNavigate();

    const notify = () => {
        toast.success("Producto cargado al Carrito!", {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: 'foo-bar fs-6'
        });
    }

    if (!productoSeleccionado) {
        navigate('/home');
    }

    console.log(idProducto);
    console.log(productos);
    console.log(productoSeleccionado);

    return (
        <Container>
            <div className='vh-100'>
                <h2 className='pb-3 pt-3 title text-center'>{productoSeleccionado.nombre}</h2>

                <Row >
                    <Col md={4} ><img src={productoSeleccionado.img} width='400' height='400' alt="imagen-producto" className='w-100'></img></Col>
                    <Col>
                        <div className='text-center'>
                            <p>{productoSeleccionado.descripcion}
                            </p>
                        </div>
                        {productoSeleccionado.tipo == 1 &&
                            <div>
                                <div className='text-center fw-bold'>
                                    <Form.Label>Seleccione Color</Form.Label>
                                    <div className='d-flex justify-content-center'>
                                        <Form.Control
                                            type="color"
                                            defaultValue="#red"
                                            title="Seleccione su Color"
                                            className='mx-4 mb-4'
                                        />
                                    </div>
                                </div>
                                <div className='text-center fw-bold'>
                                    <Form.Label>Seleccione Talla</Form.Label>
                                    <div className='d-flex justify-content-center mb-5'>
                                        <Form.Select aria-label="talla">
                                            <option>Seleccione Talla</option>
                                            <option value="1">S</option>
                                            <option value="2">M</option>
                                            <option value="3">L</option>
                                            <option value="4">XL</option>
                                            <option value="5">XXL</option>
                                            <option value="6">XXXL</option>
                                        </Form.Select>
                                    </div>
                                </div>
                            </div>
                        }

                        <div className='mt-4 d-flex justify-content-between'>
                            <span className='fs-3 fw-bold'>$ {productoSeleccionado.precio.toLocaleString("es-CL")}</span>
                            <Button variant="dark" onClick={(e) => {
                                addCart(productoSeleccionado.id);
                                notify();
                            }}>Añadir <Cart /></Button>
                        </div>


                    </Col>
                </Row>
            </div>
            <ToastContainer />
        </Container>


    )
}

export default Detalle