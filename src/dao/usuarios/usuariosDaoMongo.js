import { Contenedor } from "../../contenedor/contenedorMongo.js";


class UsuariosDaoMongo extends Contenedor{
    
    constructor(){
        super('usuarios', {
            username: { type: String, require: true },
            password: { type: String, require: true }, 
            email: { type: String, require: true },
            name: { type: String, require: true },
            address: { type: String, require: true },
            age: { type: String, require: true },
            tel: { type: String, require: true },
            img: { type: String, require: true },      
            type: { type: String, require: true },
            carritos: { type: [], require: true }
        });
    }
}

export default UsuariosDaoMongo;