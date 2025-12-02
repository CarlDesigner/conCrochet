//Estado para la aplicacion usando zustand
//Acá podremos crear el carrito y  guardarlo en el estado global
//Se puede guardar el total en el estate, pero momentaneamente no se hace
//contamos con el atributo productos que corresponde a la lista de productos en el carrito
//y con métodos como agregarProducto o eliminarProducto que con el id eliminan el producto del array productos
//o aumentarCantidad y disminuirCantidad que suman o restan al atributo cantidad del objeto producto en el array productos en 1
//por ultimo el clearCarrito que lo que hace es limiar el array 

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProductoCarrito {
  id: string;
  cantidad: number;
  precio: number;
  category: string;
  name:  string;
  image: string;
  ImagePublicId?: string;
  originalPrice?: number;
  tags?: string[];
  description?: string;
  
}

interface State {
  productos: ProductoCarrito[];
  agregarProducto: (producto: ProductoCarrito) => void;
  eliminarProducto: (id: string) => void;
  aumentarCantidad: (id: string) => void;
  disminuirCantidad: (id: string) => void;
    clearCarrito: () => void;
}
export const Carrito = create<State>()(
  persist(
    (set, get) => ({
      productos: [],

      agregarProducto: (producto) => {
        const productos = get().productos;
        const existente = productos.find(p => p.id === producto.id);
        
        if (existente) {
          // Si el producto ya existe, aumentar su cantidad
          set({
            productos: productos.map(p => 
              p.id === producto.id 
                ? { ...p, cantidad: p.cantidad + producto.cantidad }
                : p
            ),
          });
        } else {
          // Si no existe, agregarlo al carrito
          set({
            productos: [...productos, producto],
          });
        }
      },

      eliminarProducto: (id) => {
        set({
          productos: get().productos.filter((p) => p.id !== id),
        });
      },
      clearCarrito: () =>
        set({
          productos: [],
         }),

      aumentarCantidad: (id) => {
        const productosActuales = get().productos.map((producto) =>
          producto.id === id
            ? { ...producto, cantidad: producto.cantidad + 1 }
            : producto
        );

        set({ productos: productosActuales });
      },

      disminuirCantidad: (id) => {
        const productosActuales = get().productos.map((producto) =>
          producto.id === id && producto.cantidad > 1
            ? { ...producto, cantidad: producto.cantidad - 1 }
            : producto
        );

        set({ productos: productosActuales });
      },
    }),
    {
      name: "carrito-store",
    }
  )
);
