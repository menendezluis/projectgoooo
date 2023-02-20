import express from "express";
import { engine } from "express-handlebars";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";

//importamos las rutas
import { rutaProducto } from "./routes/productos.js";
import { rutaCarrito } from "./routes/carrito.js";
import { rutaLogin } from "./routes/login.js";
import { rutaListaCarrito } from "./routes/listaCarrito.js";

const app = express();

//implementacion port & carpeta publica
const port = process.argv[2] || 3232;
const publicRoot = "./public";

//carpeta publica visible
app.use(express.static(publicRoot));

//uso de json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configuramos Mongo
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

//session
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://root:d1i9e8g8o@prueba.26ov04v.mongodb.net/sesiones?retryWrites=true&w=majority",
      mongoOptions: advancedOptions,
      ttl: 600,
    }),
    secret: "cualquier_cosa",
    resave: false,
    saveUninitialized: false,
  })
);

//uso de passport
app.use(passport.initialize());
app.use(passport.session());

//handlebars
app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main.hbs",
  })
);

app.set("view engine", ".hbs");

//implementamos las rutas
app.use("/api/productos", rutaProducto);
app.use("/api/carrito", rutaCarrito);
app.use("/api/listaCarrito", rutaListaCarrito);
app.use("/auth", rutaLogin);

//inicializacion sockets
//const httpServer = new HttpServer(app);
//const io = new IOServer(httpServer);

//middleware en rutas no implementadas
app.use((peticion, respuesta, next) => {
  if (!peticion.route) {
    respuesta
      .status(404)
      .send({ error: -2, descripcion: `path ${peticion.url} no autorizada` });
  } else {
    next();
  }
});

//inicializo el server
const servidor = app.listen(port, () => {
  console.log(`Servidor escuchando: ${servidor.address().port}`);
});

servidor.on("error", (error) => console.log(`Error: ${error}`));
