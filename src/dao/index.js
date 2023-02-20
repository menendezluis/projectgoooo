import * as dotenv from 'dotenv'; 

dotenv.config();

let productos;
let carritos;
let usuarios;

switch (process.env.DB) {
  
  case 'mongodb':
    const { default: UsuariosDaoMongo } = await import('./usuarios/usuariosDaoMongo.js');
    const { default: ProductosDaoMongo } = await import('./productos/productosDaoMongo.js');
    const { default: CarritosDaoMongo } = await import('./carritos/carritosDaoMongo.js');    

    usuarios = new UsuariosDaoMongo();
    productos = new ProductosDaoMongo();
    carritos = new CarritosDaoMongo();
    console.log('estamos en mongodb');
  break;
  
  case 'fs':
    const { default: ProductosDaoFs } = await import('./productos/productosDaoFs.js');
    const { default: CarritosDaoFs } = await import('./carritos/carritosDaoFs.js');

    productos = new ProductosDaoFs();
    carritos = new CarritosDaoFs();
    console.log('estamos en fs');
  break;

  case 'firebase':
      const { default: ProductosDaoFirebase } = await import('./productos/productosDaoFirebase.js');
      const { default: CarritosDaoFirebase } = await import('./carritos/carritosDaoFirebase.js');
  
      productos = new ProductosDaoFirebase();
      carritos = new CarritosDaoFirebase();
      console.log('estamos en firebase');
  break;

  default:
    const { default: ProductosDaoMemoria } = await import('./productos/productosDaoMemoria.js');
    const { default: CarritosDaoMemoria } = await import('./carritos/carritosDaoMemoria.js');

    productos = new ProductosDaoMemoria();
    carritos = new CarritosDaoMemoria();
    console.log('estamos en memoria');
    break;
}

export { productos, carritos, usuarios }