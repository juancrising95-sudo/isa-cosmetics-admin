async function cargarPromocion() {
  try {
    const res = await fetch("data/promociones.json");
    const promo = await res.json();

    if (!promo.activa) return;

    // Evitar mostrar siempre si está activado
    if (promo.mostrarSoloUnaVez && localStorage.getItem("promoVista")) return;

    crearPopup(promo);

  } catch (error) {
    console.log("No hay promociones activas");
  }
}

function crearPopup(promo) {

  const fondo = document.createElement("div");
  fondo.id = "promoFondo";

  const ventana = document.createElement("div");
  ventana.id = "promoVentana";

  const cerrar = document.createElement("span");
  cerrar.innerHTML = "✕";
  cerrar.id = "promoCerrar";
  cerrar.onclick = () => {
    fondo.remove();
    localStorage.setItem("promoVista", "true");
  };

  let contenido;

  if (promo.tipo === "video") {
    contenido = document.createElement("video");
    contenido.src = promo.url;
    contenido.controls = true;
    contenido.autoplay = true;
  } else {
    contenido = document.createElement("img");
    contenido.src = promo.url;
  }

  contenido.className = "promoContenido";

  ventana.appendChild(cerrar);
  ventana.appendChild(contenido);
  fondo.appendChild(ventana);
  document.body.appendChild(fondo);
}

window.addEventListener("load", cargarPromocion);