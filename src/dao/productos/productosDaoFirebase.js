import { Contenedor } from "../../contenedor/contenedorFirebase.js";

class productosDaoFirebase extends Contenedor{
    
    constructor(){
        super('productos');
    }

}

export default productosDaoFirebase;