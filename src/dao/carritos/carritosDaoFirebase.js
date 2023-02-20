import { Contenedor } from "../../contenedor/contenedorFirebase.js";


class CarritosDaoFirebase extends Contenedor{
    
    constructor(){
        super('carritos'/*, {
            productos: { type: [], require: true },
            timestamp: { type: String, require: true }

        }*/);
    }
}

export default CarritosDaoFirebase;