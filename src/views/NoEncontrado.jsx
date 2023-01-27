import React from 'react'
import { Container, Image } from 'react-bootstrap'
import { EmojiFrown  } from 'react-bootstrap-icons'


const NoEncontrado = () => {
    return (
        <Container className='vh-100'>

            <div className="text-center pt-5">
                <EmojiFrown size={300}/>
            </div>

            <div className="text-center pt-5 fs-1">
                <p>Lo Sentimos, Pagina no Encontrada! </p>
            </div>


        </Container>
    )
}

export default NoEncontrado