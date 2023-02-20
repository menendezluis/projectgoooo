import { Contenedor } from "../../contenedor/contenedorMongo.js";


class productosDaoMongo extends Contenedor{
    
    constructor(){
        super('productos',{
            nombre: { type: String, require: true },
            descripcion: { type: String, require: true },
            timestamp: { type: String, require: true },
            codigo: { type: String, require: true },
            precio: { type: Number, require: true },
            stock: { type: Number, require: true },
            foto: { type: String, require: true }
        });
    }

}

export default productosDaoMongo;

