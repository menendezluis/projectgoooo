import mongoose from "mongoose";
import config from "../config.js";

await mongoose.set("strictQuery", true);
await mongoose.connect(config.mongodb.url);

export class Contenedor {
  constructor(nombreColeccion, esquema) {
    this.coleccion = mongoose.model(nombreColeccion, esquema);
  }

  async save(objeto) {
    let doc = await this.coleccion.create(objeto);

    doc.id = doc._id;

    return doc.id;
  }

  async getById(id) {
    const doc = await this.coleccion.findOne({ _id: id });
    if (doc) {
      doc.id = doc._id;
      return doc;
    }
    return null;
  }

  async update(producto, id) {
    //console.log(producto._id);
    await this.coleccion.updateOne(
      { _id: producto._id },
      { $set: { ...producto } }
    );
  }

  async getAll(where) {
    if (where == "carritos") {
      let carritos = await this.coleccion.find({});
      let nuevoArray = [];

      carritos.forEach((carrito) => {
        nuevoArray.push({
          id: carrito._id,
          timestamp: carrito.timestamp,
          usuario: carrito.usuario,
          productos: carrito.productos,
        });
      });
      return nuevoArray;
    } else if (where == "productos") {
      let productos = await this.coleccion.find({});
      let nuevoArray = [];

      productos.forEach((producto) => {
        nuevoArray.push({
          id: producto.id,
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          timestamp: producto.timestamp,
          codigo: producto.codigo,
          precio: producto.precio,
          stock: producto.stock,
          foto: producto.foto,
        });
      });
      return nuevoArray;
    } else if (where == "usuarios") {
      let productos = await this.coleccion.find({});
      let nuevoArray = [];

      productos.forEach((producto) => {
        nuevoArray.push({
          id: producto.id,
          username: producto.username,
          password: producto.password,
          email: producto.email,
          name: producto.name,
          address: producto.address,
          age: producto.age,
          tel: producto.tel,
          img: producto.img,
          type: producto.type,
          carritos: producto.carritos,
        });
      });
      return nuevoArray;
    }
  }

  //get one
  async getOne(where, id) {
    if (where == "carritos") {
      let carrito = await this.coleccion.findOne({ _id: id });
      return carrito;
    }
  }

  async deleteById(id) {
    await this.coleccion.deleteOne({ _id: id });
  }

  async deleteAll() {
    const doc = await this.coleccion.delete();
  }
}
