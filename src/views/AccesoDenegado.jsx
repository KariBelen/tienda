import React from 'react'
import { Container } from 'react-bootstrap'
import { DashCircle } from 'react-bootstrap-icons'

const AccesoDenegado = () => {
  return (
    <Container>
            <div className="text-center pt-5">
                <DashCircle size={300}/>
            </div>

            <div className="text-center pt-5 fs-1">
                <p>No tiene permisos para ingresar a esta pagina!</p>
            </div>

    </Container>
  )
}

export default AccesoDenegado