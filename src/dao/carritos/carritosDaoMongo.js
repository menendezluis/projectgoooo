import { Contenedor } from "../../contenedor/contenedorMongo.js";


class CarritosDaoMongo extends Contenedor{
    
    constructor(){
        super('carritos', {
            productos: { type: [], require: true },
            timestamp: { type: String, require: true },
            usuario: { type: String, require: true }

        });
    }
}

export default CarritosDaoMongo;