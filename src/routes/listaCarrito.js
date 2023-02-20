import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  console.log(req.session);
  res.cookie("idCarrito", req.session.idCarrito);
  res.render("listaCarrito");
});

export const rutaListaCarrito = router;
