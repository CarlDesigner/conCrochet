//Vista del carrito de compras:
//Habrán 2 componentes y 1 interfaz para tipado
//la interfaz es para tipar las props de uno de los dos componentes que es el modal
//El otro componente es el que se exporta
//Se importa el estado de la ruta /store/state
//se importa un Footer de la ruta components/Footer
//la variable suma es formal, por lo que no se almacena en el estado global


import React, { useState} from "react";
import { Carrito } from "../store/State";
import Footer from "./components/Footer";

  type ConfirmModalProps = {
    open: boolean;
    title: string;
    message: string;
    onCancel: () => void;
    onConfirm: () => void;
  };

  const ConfirmModal = ({ open, title, message, onCancel, onConfirm }: ConfirmModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg min-w-[300px] text-center">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-700 mt-2">{message}</p>

        <div className="mt-4 flex justify-between gap-3">
          <button
            onClick={onCancel}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}



const ShoppingCart: React.FC = () => {

  const [mostrarModal, setMostrarModa] = useState(false);
  const carro = Carrito((state) => state.productos);
  const eliminarItem = Carrito((state) => state.eliminarProducto)
  // const total = Carrito((state) => state.total);
  // const setTotal = Carrito((state) => state.setTotal);
   
    const aumentarCantidad = Carrito((state)=> state.aumentarCantidad)
    const disminuirCantidad = Carrito((state)=> state.disminuirCantidad)
    const sumando = (id: string)=>{
      aumentarCantidad(id)
    }

    const restando = (id: string)=>{
      disminuirCantidad(id)
    }

    let suma = carro.reduce((acc, product) => acc + (product ? product.precio * product.cantidad : 0), 0);
 

    const deleteCartTotal = Carrito((state) => state.clearCarrito)

    const handleClear = ()=>{
      deleteCartTotal();
      setMostrarModa(false)
    }
 console.log("carro desde zustand:", carro);

  return (
    <main className="min-h-screen bg-white flex flex-col">
       <div className="flex-1">
        <div className="max-w-6xl mx-auto mt-[25%] md:mt-[15%] lg:mt-[7%] px-4">
        <h2 className="text-center text-3xl font-semibold mb-3">Shopping Cart</h2>
        <h5 className="text-center text-gray-600 mb-10">
          Precios por unidad del producto
        </h5>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-2 space-y-6">

            {carro.filter(Boolean).length === 0 &&(
              <p className="text-center text-gray-500">
                No hay productos en el carrito.
              </p>
            )}

            {carro
              .filter(Boolean)
              .map((product) => (

               <div
                key={product !== undefined ?product.id: ''}
                className="flex flex-col md:flex-row items-start gap-4"
              >
                
                 <img
                  className="w-40 rounded"
                  src={product !== undefined ?product.image: ''}
                  alt={ product !== undefined ?product.name: ''}
                />

                 <div className="flex-1">
                  <h6 className="text-lg font-semibold">{ product !== undefined ?product.name: ''}</h6>

                  <div className="flex text-sm text-gray-600 gap-3 mt-1">
                     <p className="border-l pl-3">{ product !== undefined ?product.category: ''}</p>
                  </div>

                  <div className="flex items-center mt-4 text-green-600">
                    <i className="fas fa-check"></i>
                  </div>
                </div>

                  <button
                  onClick={() => restando(product.id)}
                  className="
                    p-1 rounded-full
                    hover:bg-gray-200 
                    active:bg-gray-300
                    transition
                  "
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>

                <button
                  onClick={() => sumando(product.id)}
                  className="
                    p-1 rounded-full
                    hover:bg-gray-200 
                    active:bg-gray-300
                    transition
                  "
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>                 
                 <h4 className="mt-1">{product.cantidad}</h4>


                 <h4 className="text-xl font-semibold"> <span className="text-[16px] font-light">Precio unitario:</span> ${ product !== undefined ?product.precio: ''}</h4>

                <button 
                    onClick={()=>{ if (!product?.id) return; eliminarItem(product?.id)} }
                    className="
                    
                    p-1 rounded-full
                    hover:bg-gray-200 
                    active:bg-gray-300
                    transition
                  "
                  >
                  <svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M6 7h12M9 7V4h6v3m-7 4v7m4-7v7m4-7v7M4 7h16l-1 12a2 2 0 01-2 2H7a2 2 0 01-2-2L4 7z" />
              </svg>
                </button>

              
              </div>
            ))}

             <button onClick={ () => setMostrarModa(true)} className="bg-red-500 px-3 py-1 rounded-2xl text-white mt-5">
              Clear all
            </button>
            <ConfirmModal
            open={mostrarModal}
            title="Confirmar eliminación"
            message="¿Estás seguro de que deseas eliminar todos los productos del carrito?"
            onCancel={() => setMostrarModa(false)}            
            onConfirm={ handleClear }
            />

            {carro.length > 0 && <hr />}
          </div>

           <div>
            <div className="bg-gray-100 border rounded shadow p-6">
              <h5 className="text-xl font-semibold mb-4">Order Summary</h5>

              <ul className="space-y-4">
                <li className="flex justify-between">
                  <p className="text-gray-700">Subtotal</p>
                  <p className="font-semibold text-gray-700">${suma}</p>
                </li>

            

                <li className="flex justify-between">
                  <h5 className="text-xl">Total</h5>
                  <h5 className="text-xl font-semibold">${suma}</h5>
                </li>
              </ul>

              <button className="w-full bg-black text-white py-3 rounded mt-6">
                Checkout
              </button>

              <button className="w-full border py-3 rounded mt-3">
                Continue Shopping
              </button>

              <p className="text-center text-gray-600 mt-4">
    
              Impuestos incluidos    
              </p>
            </div>

            <p className="text-center text-gray-700 mt-4">
              Métodos de pago actuales: Pago contra entrega y transferencia bancaria.
            </p>
          </div>
        </div>
      </div>

 
         </div>
              <Footer />

     </main>
  );
};

export default ShoppingCart;
