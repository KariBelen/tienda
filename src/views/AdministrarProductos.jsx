import React, { useContext, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Plus } from 'react-bootstrap-icons';
import { Trash } from 'react-bootstrap-icons';
import Context from '../Context';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const AdministrarProductos = () => {

  const { productos, setProductos, usuario, setUsuario } = useContext(Context);
  const navigate = useNavigate();

  const notify = () => {
    toast.success("Producto Eliminado Exitosamente!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: 'foo-bar fs-6'
    });
  }

  const borrarProducto = (id) => {

    const productoIndx = productos.findIndex(p => p.id == id);
    console.log(productoIndx);
    productos.splice(productoIndx, 1);
    setProductos([...productos]);

    //Al borrar algun producto, se debe de borrar de los favoritos de cada usuario.

    usuario.forEach((usu) => {

      const productoUsuarioIndx = usu.favoritos.findIndex((p) => p.id == id);

      // const usuarioIndex = usuario.findIndex(u => u.id == usu.id);

      if (productoUsuarioIndx >= 0) {
        usu.favoritos.splice(productoUsuarioIndx, 1);
      }

      setUsuario([...usuario]);

      notify();

    });
  }


  return (
    <Container className='container-page'>
      <h2 className='pb-2 pt-4 title text-center'>Administrador de Productos</h2>

      <div className='pb-3 p-4'>

        <div className='pb-4 d-flex justify-content-end'>
          <Button variant='dark' className='fs-5' onClick={() => navigate('/nuevoproducto')}><Plus size={30} /> Nuevo Producto </Button>
        </div>
        <div>
          <Row className=' pt-2 pb-2 border-bottom'>
            <Col md={2}>
              <span className='fw-bold'>Imagen</span>
            </Col>
            <Col md={8} className='align-self-center'>
              <div className='fw-bold d-flex justify-content-between'>
                <span className='fw-bold'> Nombre</span>
                <span className='fw-bold'>Precio</span>
              </div>

            </Col>
            <Col md={2} className='align-self-center'>
              <div className="fw-bold d-flex justify-content-center">
                <span className='fw-bold'>Acciones</span>
              </div>
            </Col>
          </Row>
        </div>

        {
          productos.map((producto) => (
            <div key={producto.id}>
              <Row className=' pt-2 pb-2 border-bottom'>
                <Col md={2}>
                  <img src={producto.img} alt='imagen-producto' width={100} height={100}></img>
                </Col>
                <Col md={8} className='align-self-center'>
                  <div className='fw-bold d-flex justify-content-between'>
                    <span> {producto.nombre}</span>
                    <span>${producto.precio.toLocaleString("es-CL")}</span>
                  </div>

                </Col>
                <Col md={2} className='align-self-center'>
                  <div className="fw-bold d-flex justify-content-around">
                    <Button variant="dark" onClick={(e) => borrarProducto(producto.id)}><Trash /></Button>
                  </div>
                </Col>
              </Row>
            </div>
          ))}
      </div>
      <ToastContainer />

    </Container>


  )
}

export default AdministrarProductos