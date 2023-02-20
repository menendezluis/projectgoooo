//Ruta de Productos************
import express from "express";

const rutaCarrito = express.Router();

import { productos, carritos, usuarios } from "../dao/index.js";

const where = "carritos";

//Endpoints
rutaCarrito.get("/", async (peticion, respuesta) => {
  //Usar con mongoose
  const listaCarritos = await carritos.getAll(where);
  respuesta.json(listaCarritos);
});

rutaCarrito.get("/:id/productos", async (peticion, respuesta) => {
  const { id } = peticion.params;

  //Usar con mongoose
  const listaCarritos = await carritos.getOne(where, id);
  respuesta.json(listaCarritos);
});
/* 
  //usar con firebase  
  const listaCarritos = await carritos.getAllCarritos();
  respuesta.json(listaCarritos); 
});*/

rutaCarrito.get("/:id/productos", async (peticion, respuesta) => {
  //Usar con mongoose
  const id = peticion.params.id;
  const listaProductos = await carritos.getById(id);
  respuesta.json(listaProductos.productos);
});

/* 
  //usar con firebase 
  const id = peticion.params.id;
  const listaProductos = await carritos.getByIdCarritos(id);
  respuesta.json(listaProductos.productos);
}); */

rutaCarrito.post("/", async (peticion, respuesta) => {
  const carrito = {
    timestamp: Date.now(),
    productos: [],
    usuario: peticion.session._id,
  };
  if (peticion.session._id) {
    //console.log(`ni idea que paso`);
    const usuario = await usuarios.getById(peticion.session._id);
    const carritoAll = await carritos.getAll(where);

    let idCarrito = "";
    carritoAll.forEach((item) => {
      if ((item.usuario = peticion.session._id)) {
        const myObjectIdString = item.id.toString();
        idCarrito = myObjectIdString;
        peticion.session.idCarrito = idCarrito;
        return myObjectIdString;
      }
    });

    if (usuario.carritos.length >= 1) {
      //ya tiene un carrito
      console.log("Tiene carritos");
      respuesta.render("carritos", {
        carrito: idCarrito,
        usuario: usuario.username,
      });
    } else {
      //crea un carrito nuevo
      console.log("No tiene carritos");
      const newCarritoId = await carritos.save(carrito);
      const newCarrito = await carritos.getById(newCarritoId);
      usuario.carritos.push(newCarrito);

      await usuarios.update(usuario);

      respuesta.render("carritos", {
        carrito: newCarritoId,
        usuario: usuario.username,
      });
    }
  } else {
    peticion.session.destroy();
    respuesta.redirect("/auth/login");
  }
  /*
  allUsuarios.forEach(usuario => {
    if (usuario.)
  }) 
  const usuarioCarrito = allUsuarios.find(usuarios => usuarios.carrito == )
  if (usuarios.carritos){
    respuesta.render('datos',{
      carrito: usuarios.carrito._id
    });
  } else {
    const id = await carritos.save(carrito);
    respuesta.render('datos',{
      carrito: id
    });
  };
  */
});

rutaCarrito.post("/:id/productos", async (peticion, respuesta) => {
  //Usar con mongoose
  const idCarrito = peticion.params.id;
  const idProducto = peticion.body.idProducto;

  const carrito = await carritos.getById(idCarrito);
  const producto = await productos.getById(idProducto);

  //console.log(carrito);
  //console.log(producto);
  await await carrito.productos.push(producto);

  //console.log(carrito);

  await carritos.update(carrito, idCarrito);
  respuesta.json({
    status: "su carrito ah sido actualizado con exito",
  });
});

/*   //usar con firebase
  const idCarrito = peticion.params.id;
  const idProducto = peticion.body.idProducto;

  const carrito = await carritos.getByIdCarritos(idCarrito);
  const producto = await productos.getById(idProducto);
  
  await carrito.productos.push(producto);
  
  await carritos.update(carrito,idCarrito);
  respuesta.json({
    status: 'ok'
  });
}); */

rutaCarrito.delete("/:id/productos/:id_prod", async (peticion, respuesta) => {
  console.log(`o se vino aca`);
  const idCarrito = peticion.params.id;
  const idProducto = peticion.params.id_prod;
  const carrito = await carritos.getById(idCarrito);
  console.log(carrito);
  let indexToDelete = -1;
  carrito.productos.forEach((producto, index) => {
    if (producto.id == idProducto) {
      indexToDelete = index;
    }
  });
  if ((indexToDelete) => 0) {
    carrito.productos.splice(indexToDelete, 1);
  }
  console.log(carrito);
  await carritos.update(carrito, idCarrito);
  respuesta.json({
    status: `Producto eliminado del carrito ${idCarrito}`,
  });
});

rutaCarrito.delete("/:id", async (peticion, respuesta) => {
  console.log(peticion.session.idCarrito);
  if (peticion.session.idCarrito) {
    console.log(`borro el carrito ${peticion.session.idCarrito}`);
    await carritos.deleteById(peticion.session.idCarrito);
  } else {
    console.log(`creo que entro aca`);
    const id = peticion.params.id;
    await carritos.deleteById(id);
    respuesta.json({
      status: "carrito eliminado",
    });
  }
});

export { rutaCarrito };
