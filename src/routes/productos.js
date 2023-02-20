//Ruta de Productos************
import express from 'express';

const rutaProducto = express.Router();

import { productos } from '../dao/index.js';

const where ="productos";

//middleware
const privilegio = (peticion,respuesta,next) => {
    const administrador = peticion.headers.administrador;
    if (administrador == 1234){
      next();
    } else {
      respuesta.status(401).send({error : -1, descripcion: `path ${peticion.url} no autorizada`});
    }
}

//Endpoints***
rutaProducto.get('/', async (peticion, respuesta) => {
  const listaProductos = await productos.getAll(where);
  respuesta.json(listaProductos);
});

rutaProducto.get('/:id', async(peticion, respuesta) => {
  const id = peticion.params.id;
  const productoId = await productos.getById(id);
  respuesta.json(productoId);
});

rutaProducto.post('/', privilegio, async (peticion, respuesta) => {
  const nuevoProducto = peticion.body;  
  await productos.save(nuevoProducto);  
  respuesta.status(200).json({

  status: 'Producto agregado'
  
    });  
  });

rutaProducto.put('/:id',  privilegio, async (peticion, respuesta) => {
  const id = peticion.params.id;
  const nuevoProducto = peticion.body;
  
  await productos.update(nuevoProducto,id);
  respuesta.status(200).json({
    status: 'Producto modidicado'
  });
});

rutaProducto.delete('/:id',  privilegio, async (peticion, respuesta) => {
  const id = peticion.params.id;
  await productos.deleteById(id);
  respuesta.status(200).json({
    status: 'Producto Eliminado'
  })
});

export { rutaProducto };