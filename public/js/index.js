const elementExists = (id) => document.getElementById(id) !== null;

const getCarritoList = async (id) => {
  try {
    const response = await fetch(`/api/carrito/${id}/productos`);
    const data = await response.json();
    console.log(data);
    elementExists("listaCarrito") && renderCarrito(data.productos);
  } catch (err) {
    console.log(err);
  }
};

const deleteItem = async (id) => {
  console.log("aqui", id);
  const myCarrito = document.cookie.split("=")[1];
  try {
    const response = await fetch(`/api/carrito/${myCarrito}/productos/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    window.location.reload();
    console.log(`/api/carrito/${myCarrito}/productos/${id}`);
  } catch (err) {
    console.log(err);
  }
};
const renderCarrito = (data) => {
  const listaCarrito = document.getElementById("listaCarrito");
  listaCarrito.innerHTML = "";
  data.forEach((producto) => {
    const item = document.createElement("li");

    item.innerHTML = `
        <img src="${producto.foto}" alt="...">
        <div >
          <h5 >${producto.nombre}</h5>
          <p >${producto.precio}</p>
          <button id=${producto._id}>Eliminar</button>
        </div>
    `;
    listaCarrito.appendChild(item);

    const btn = document.getElementById(producto._id);
    btn.addEventListener("click", () => {
      deleteItem(producto._id);
    });
  });
};

//console.log(document.cookie.split("=")[1]);
getCarritoList(document.cookie.split("=")[1]);
