import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import ContactForm from "../components/ContactForm";
import { run as runHolder } from "holderjs/holder";
import { useEffect } from "react";
import img1 from "../assets/img/1.png";
import img2 from "../assets/img/2.png";
import img3 from "../assets/img/3.png";
import img4 from "../assets/img/4.jpg";
import img5 from "../assets/img/5.png";
import img6 from "../assets/img/6.png";
import img7 from "../assets/img/7.png";
import img8 from "../assets/img/8.png";
import img9 from "../assets/img/9.png";
import img10 from "../assets/img/10.png";
import img11 from "../assets/img/11.png";
import { Shop } from "react-bootstrap-icons";

const Home = () => {
  useEffect(() => {
    runHolder("image-class");
  });

  return (
    <Container className="text-center container-page">
      <section className="p-4">
        <h1 className="title">PKMstore</h1>
      </section>

      <section>
        <Carousel variant="dark">
          <Carousel.Item>
            <img className="d-block w-100" width={800} height={400} src={img1} alt="First slide" />
            <Carousel.Caption>
              <h3>Personaliza Cotillón</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" width={800} height={400} src={img2} alt="Second slide" />

            <Carousel.Caption>
              <h3>Personaliza tus esferas Navideñas</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" width={800} height={400} src={img3} alt="Third slide" />

            <Carousel.Caption>
              <h3 className="titulo">Personaliza tu hallowen</h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>

      <section className="p-4">
        <h2 className="pb-3 title">Especialidades</h2>

        <div className="d-flex justify-content-around">
          <img src={img4} alt="" className="rounded" />
          <img src={img5} alt="" className="rounded" />
          <img src={img6} alt="" className="rounded" />
        </div>
      </section>

      <section className="p-4">
        <h2 className="pb-3 title"> Colaboraciones</h2>

        <div className="d-flex justify-content-around">
          <img src={img7} className="rounded-circle" alt="" />
          <img src={img8} className="rounded-circle" alt="" />
          <img src={img9} className="rounded-circle" alt="" />
          <img src={img10} className="rounded-circle" alt="" />
        </div>
      </section>

      <section className="p-4">
        <div className="d-flex justify-content-around text-center">
          <div>
            <h3 className="pb-2 title">Ubicación</h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d208.08718462145333!2d-70.62909558671856!3d-33.439015316771666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e0!4m0!4m5!1s0x9662c583c8006a99%3A0x3e4d8eb84202a92b!2sMar%C3%ADa%20Luisa%20Santander%20304-294%2C%20Providencia%2C%20Regi%C3%B3n%20Metropolitana!3m2!1d-33.439032!2d-70.6291152!5e0!3m2!1ses!2scl!4v1667593655073!5m2!1ses!2scl"
              width="400"
              height="300"
              style={{ border: 0 }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Mapa de Tienda"
            ></iframe>
          </div>
          <div>
            <h3 className="pb-2 title">Zona de Reparto</h3>
            <img src={img11} alt="" className="rounded" /> 
          </div>
        </div>
      </section>

      <section className="text-center bg-section p-4 rounded">
        <h3 className="pb-3 title">Contactanos</h3>
        <ContactForm />
      </section>
    </Container>
  );
};

export default Home;
