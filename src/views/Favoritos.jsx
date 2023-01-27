import React, { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import { CartPlus } from "react-bootstrap-icons";
import { Heart } from "react-bootstrap-icons";
import { Collection } from "react-bootstrap-icons";
import Context from "../Context";
import { Link } from "react-router-dom";

const Favoritos = () => {
  const { productos, usuario, setUsuario, session, addCart } = useContext(Context);

  const usuarioActivo = usuario.find((u) => u.id === session.id);

  const getChecked = (id) => {
    const productoFavorito = usuarioActivo.favoritos.find((f) => f.id === id);

    let checked = productoFavorito ? true : false;
    return checked;
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


  return (
    <Container className="container-page">
      <h2 className="pb-3 pt-3 title text-center">Mis Productos Favoritos</h2>

      <Row>
        {usuarioActivo.favoritos.map((pro) => (
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
                    <Link to="/detalle">
                      <Button variant="dark">
                        Detalle <Collection />
                      </Button>
                    </Link>
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
                    <Button variant="dark" onClick={(e) => addCart(pro.id)}>
                      Añadir <CartPlus />
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Favoritos;
