import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import Form from "react-bootstrap/Form";
import { CartPlus } from "react-bootstrap-icons";
import { Heart } from "react-bootstrap-icons";
import { Collection } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import Context from "../Context";
import { useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';

const Productos = () => {

  const { productos, usuario, setUsuario, session, addCart } = useContext(Context);
  const [busqueda, setBusqueda] = useState('');
  const [sort, setSort] = useState('');

  const usuarioActivo = usuario.find((u) => u.id === session.id);

  const getChecked = (id) => {
    const productoFavorito = usuarioActivo.favoritos.find((f) => f.id === id);

    let checked = productoFavorito ? true : false;
    return checked;
  }

  const notify = () => {
    toast.success("Producto cargado al Carrito!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: 'foo-bar fs-6'
    });
}

  const agregarFavorito = (id) => {

    const producto = productos.find(p => p.id === id);
    const findProducto = usuarioActivo.favoritos.findIndex(p => p.id === producto.id);
    const indexUsuarioActivo = usuario.findIndex(u => u.id === usuarioActivo.id);

    if (findProducto === -1) {
      usuario[indexUsuarioActivo].favoritos.push(producto);
      setUsuario([...usuario]);
    } else {
      usuario[indexUsuarioActivo].favoritos.splice(findProducto, 1);
      setUsuario([...usuario]);
    }
  }

  const navigate = useNavigate();


  return (
    <Container className="container-page">
      <h2 className="pb-3 pt-3 title text-center">Productos</h2>

      <div className="pb-3">
        <Row>
          <Col md={3}>
            <Form.Select onChange={(e) => setSort(e.target.value)}>
              <option>Filtro</option>
              <option value="1">Alfabetico (Ascendente)</option>
              <option value="-1">Alfabetico (Descendente)</option>
              <option value="2">Precio (Ascendente)</option>
              <option value="-2">Precio (Descendente)</option>
            </Form.Select>
          </Col>
          <Col md={9}>
            <Form.Control type="text" placeholder="Busqueda" onChange={((e) => setBusqueda(e.target.value))} />
          </Col>
        </Row>
      </div>

      <hr></hr>

      <Row>
        {productos
          .filter((producto) => {
            if (busqueda === "") {
              return producto;
            } else if (
              producto.nombre
                .toLocaleLowerCase()
                .includes(busqueda.toLocaleLowerCase())
            ) {
              return producto;
            }
          }).sort((a, b) => {
            if (sort === "1")
              return a.nombre > b.nombre
                ? 1
                : a.nombre < b.nombre
                  ? -1
                  : 0;
            else if (sort === "-1")
              return a.nombre < b.nombre
                ? 1
                : a.nombre > b.nombre
                  ? -1
                  : 0;
            else if (sort === "2")
              return a.precio > b.precio
                ? 1
                : a.precio < b.precio
                  ? -1
                  : 0;
            else if (sort === "-2")
              return a.precio < b.precio
                ? 1
                : a.precio > b.precio
                  ? -1
                  : 0;
          }).map((pro) => (
            <Col md={4} className="pb-4" key={pro.id}>
              <Card>
                <div>
                  <Card.Img
                    width='400'
                    height='400'
                    variant="top"
                    src={pro.img}
                    className="w-100"
                  />
                  <Card.Body>
                    <Card.Title className="text-center fs-5">
                      {pro.nombre}
                    </Card.Title>
                  </Card.Body>
                </div>
                <Card.Footer className="bg-transparent">
                  <h3 className="text-center mb-4">$ {pro.precio.toLocaleString("es-CL")}</h3>
                  <div className="d-flex justify-content-around">
                    <Button variant="dark" onClick={() => navigate(`/detalle/${pro.id}`)}>
                      Detalle <Collection />
                    </Button>
                    <ToggleButton
                      id="toggle-check"
                      type="checkbox"
                      variant="outline-dark"
                      checked={getChecked(pro.id)}
                      value="1"
                      onClick={() => agregarFavorito(pro.id)}
                    >
                      Favorito <Heart />
                    </ToggleButton>
                    <Button variant="dark" onClick={(e) => {
                      addCart(pro.id)
                      notify();
                    }}>
                      Añadir <CartPlus />
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))}
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default Productos;
