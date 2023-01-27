import React from 'react'
import Container from 'react-bootstrap/Container';
import { Instagram } from 'react-bootstrap-icons';
import { Facebook } from 'react-bootstrap-icons';
import webpayLogo from '../assets/img/webpay.png'


export const Footer = () => {
    return (
        <footer className='bg-dark p-1 text-white position-absolute bottom-0 w-100'>
            <Container>
                <hr></hr>
                <div className='d-flex justify-content-around'>
                    <div>
                        <Instagram size={30} className='mx-2'/>
                        <Facebook size={30}/>
                    </div>
                    <div>
                        <p>Karina Gonzalez 2022 - Todos los derechos reservados</p>
                    </div>
                    <div>
                        <img src={webpayLogo} alt='logowebpay'></img>
                    </div>
                </div>
            </Container>
        </footer>
    )
}

export default Footer