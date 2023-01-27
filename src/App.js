import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Context from './Context';

//Hook LocalStorage
import { useLocalStorage } from './useLocalStorage';


//Componentes
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

//Views
//Publicas
import Home from "./views/Home";
import Login from "./views/Login";
import Registro from "./views/Registro";
import NoEncontrado from './views/NoEncontrado';
import AccesoDenegado from './views/AccesoDenegado';

//Privadas
import Detalle from "./views/Detalle";
import Favoritos from "./views/Favoritos";
import Carro from "./views/Carro";
import Productos from "./views/Productos";
import ModificarDatos from './views/ModificarDatos';

//Administrador
import AdministrarProductos from './views/AdministrarProductos';
import NuevoProducto from './views/NuevoProducto';

function App() {


  //Credenciales Administrador: usuario: admin@pkstore.cl - Contraseña: 12345
  //Deploy Netlify: https://cheerful-cobbler-4e18bf.netlify.app/home

  const [usuario, setUsuario] = useLocalStorage('usuarios', [{ id: 1, nombre: 'Administrador', apellido: 'Tienda', email: 'admin@pkstore.cl', contraseña: '12345', tipo: 0, carro: [], favoritos: [] }]);
  const [session, setSession] = useLocalStorage('sesion', null);
  const [imagen, setImagen] = useLocalStorage('imagen', '');
  const [productos, setProductos] = useLocalStorage('productos',[]);


  const endpoint = "/productos.json";

  const usuarioActivo = session ? usuario.find((u) => u.id === session.id) : null;


  const obtenerProductos = async () => {

    if (productos.length > 0) {
      return;
    }

    const response = await fetch(endpoint);
    const data = await response.json();

    setProductos(data);
  }

  const addCart = (id) => {

    const producto = productos.find(p => p.id == id);
    const usuarioIndex = usuario.findIndex(u => u.id == usuarioActivo.id);
    const productoIndexCart = usuario[usuarioIndex].carro.findIndex(p => p.producto.id == id);

    const productoCart = {
      producto: producto,
      cantidad: 1,
    }

    console.log(usuario[usuarioIndex], 'usuarioIndex');

    if (productoIndexCart >= 0) {
      usuario[usuarioIndex].carro[productoIndexCart].cantidad = usuario[usuarioIndex].carro[productoIndexCart].cantidad + 1;
      setUsuario([...usuario]);
    } else {
      usuario[usuarioIndex].carro.push(productoCart);
      setUsuario([...usuario]);
    }
  }

  const removeCart = (id) => {
    const usuarioIndex = usuario.findIndex(u => u.id == usuarioActivo.id);
    const productoIndexCart = usuario[usuarioIndex].carro.findIndex(p => p.producto.id == id);

    if (productoIndexCart >= 0) {
      usuario[usuarioIndex].carro[productoIndexCart].cantidad = usuario[usuarioIndex].carro[productoIndexCart].cantidad - 1;

      if (usuario[usuarioIndex].carro[productoIndexCart].cantidad >= 1) {
        setUsuario([...usuario]);
      } else {
        usuario[usuarioIndex].carro.splice(productoIndexCart, 1);
        setUsuario([...usuario]);      
      }
    }
  }

  useEffect(() => {
    obtenerProductos();
  }, []);

  const shareShop = { usuario, setUsuario, session, setSession, imagen, setImagen, productos, setProductos, addCart, removeCart };


  return (
    <div className="App">
      <Context.Provider value={shareShop}>
        <BrowserRouter>
          <NavBar></NavBar>
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/home" replace />}
            />
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={!session ? <Login /> : <AccesoDenegado />} />
            <Route path='/registro' element={!session ? <Registro /> : <AccesoDenegado />} />
            <Route path='/productos' element={session && session.tipo == 1 ? <Productos /> : <AccesoDenegado />} />
            <Route path='/carro' element={session && session.tipo == 1 ? <Carro /> : <AccesoDenegado />} />
            <Route path='/favoritos' element={session && session.tipo == 1 ? <Favoritos /> : <AccesoDenegado />} />
            <Route path='/detalle/:idProducto' element={session && session.tipo == 1 ? <Detalle /> : <AccesoDenegado />} />
            <Route path='/gestion' element={session && session.tipo == 0 ? <AdministrarProductos /> : <AccesoDenegado />} />
            <Route path='/nuevoproducto' element={session && session.tipo == 0 ? <NuevoProducto /> : <AccesoDenegado />} />
            <Route path='/modificarDatos' element={session ? <ModificarDatos /> : <AccesoDenegado />} />

            <Route path='/*' element={<NoEncontrado />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Context.Provider>
    </div>
  );
}

export default App;
