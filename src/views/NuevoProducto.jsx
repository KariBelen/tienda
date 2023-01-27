import React, { useContext, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import Context from '../Context'
import axios from 'axios'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';


const NuevoProducto = () => {
  const {productos, setProductos} = useContext(Context);
  const [form, setForm] = useState({});
  const [errorMsj, setErrorMsj] = useState('');
  const [response, setResponse] = useState('')

  const uploadImageApi = (img, id) => {
    let body = new FormData()
    body.set('key', '14d7b50988cd10898d5fa4101b18747d')
    body.append('image', img)

    axios.post('https://api.imgbb.com/1/upload', body).then((resolve) => {
      setResponse(resolve.data.data.image.url);
      setProductos([...productos, {id: id, nombre: form.nombre, descripcion: form.apellido, img: resolve.data.data.image.url, precio: form.precio, tipo: 1}]);
      navigate('/gestion');
    });
  }


  const navigate = useNavigate();

  const notify = () => {
      toast.success("Producto Creado Exitosamente!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: 'foo-bar fs-6'
        });
  }

  const agregarProducto = () => {

      setErrorMsj('');

      console.log(form);

      if(form.nombre == null || form.descripcion == null || form.file == null || form.precio == null || form.tipo == 0){
          setErrorMsj('Todos los campos son obligatorios!!');
          return;
      } 

      let id = 1;
      //Codigo autogenera ID segun el ultimo usuario
      if(productos.length !== 0){
          id = productos[productos.length -1].id + 1;
      }

      uploadImageApi(form.file, id);

      notify();
  }

  return (
    <Container >
      <div className="align-middle p-5 container-page">
        <div className='p-4 bg-section rounded'>
          <h2 className='pb-3 title text-center'>Nuevo Producto</h2>
          <Row className="justify-content-md-center">
            <Col lg={6}>
              <FloatingLabel
                controlId="floatingInputNombre"
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
            <Col lg={6}>
              <FloatingLabel
                controlId="floatingInputDesc"
                label="Descripcion"
                className="mb-3"
              >
                <Form.Control as="textarea" rows={10} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} />
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col lg={6}>
              <FloatingLabel
                controlId="floatingInputFile"
                label="Imagen"
                className="mb-3"
              >
                <Form.Control type="file"
                  onChange={(e) => setForm({ ...form, file: e.target.files[0] })} />
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col lg={6}>
              <FloatingLabel controlId="floatingPassword" label="Precio" className="mb-3">
                <Form.Control type="number" placeholder="9990"
                  onChange={(e) => setForm({ ...form, precio: e.target.value })} />
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="justify-content-md-center pb-4">
            <Col lg={6}>
            <Form.Select onChange={(e) => setForm({ ...form, tipo: e.target.value })}>
              <option value="0">Tipo de Producto</option>
              <option value="1">Poleras</option>
              <option value="2">Carcasas</option>
              <option value="3">Agendas</option>
              <option value="4">Tazones</option>
              <option value="5">Cotillon</option>
            </Form.Select>
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
              <Button variant='dark' className='mb-3' onClick={agregarProducto}>Agregar Producto</Button>
            </Col>
          </Row>

        </div>
      </div>
      <ToastContainer />
    </Container>
  )
}

export default NuevoProducto