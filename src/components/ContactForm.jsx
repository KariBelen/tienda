import React from 'react'
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const ContactForm = () => {
    return (
        <div>
            <Row className="justify-content-md-center pb-3">
                <Col md lg="10">
                    <FloatingLabel controlId="floatingName" label="Nombre">
                        <Form.Control type="text" placeholder="Nombre" />
                    </FloatingLabel>
                </Col>
            </Row>
            <Row className="justify-content-md-center pb-3">
                <Col md lg="10">
                    <FloatingLabel controlId="floatingEmail" label="E-mail">
                        <Form.Control type="email" placeholder="correo@email.cl" />
                    </FloatingLabel>
                </Col>
            </Row>
            <Row className="justify-content-md-center pb-3 g-2">
                <Col md lg="5">
                    <FloatingLabel controlId="floatingNumber" label="Telefono">
                        <Form.Control type="number" placeholder="987654432" />
                    </FloatingLabel>
                </Col>

                <Col md lg="5">
                    <FloatingLabel controlId="floatingAsunto" label="Asunto">
                        <Form.Control type="text" placeholder="Asunto" />
                    </FloatingLabel>
                </Col>
            </Row>
            <Row className="justify-content-md-center pb-3">
                <Col md lg="10">
                    <FloatingLabel controlId="floatingMessage" label="Mensaje">
                        <Form.Control as="textarea" rows={10} />
                    </FloatingLabel>
                </Col>
            </Row>

            <div className="text-center">
                <Button variant='dark'>Enviar</Button>
            </div>
        </div>
    )
}

export default ContactForm