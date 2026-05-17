import { supabase } from "./supabase.js"

const params = new URLSearchParams(window.location.search)
const marcaId = params.get("marca")?.trim()
const categoriaId = params.get("categoria")?.trim()   // ← LÍNEA NUEVA
const contenedor = document.querySelector(".grid-productos")
const tituloMarca = document.querySelector(".titulo-marca")

async function cargarProductos() {
  if (!marcaId) {
    contenedor.innerHTML = "<p>Marca no encontrada</p>"
    return
  }

  const { data: marca, error: errorMarca } = await supabase
    .from("marcas")
    .select("nombre, logo_url")
    .eq("id", marcaId)
    .single()

  if (errorMarca) {
    console.error(errorMarca)
    return
  }

  const clasesMarca = marca.nombre.toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
  document.body.className = clasesMarca

  if (marca.logo_url) {
    const logoDiv = document.createElement("div")
    logoDiv.className = "logo-marca"
    logoDiv.innerHTML = `<img src="${marca.logo_url}" alt="${marca.nombre}">`
    document.body.insertBefore(logoDiv, contenedor)
  } else {
    tituloMarca.textContent = marca.nombre
  }

  const { data: productos, error } = await supabase
    .from("productos")
    .select("*")
    .eq("marca_id", marcaId)
    .eq("categoria_id", categoriaId)   // ← LÍNEA NUEVA
    .eq("activo", true)
    .order("orden", { ascending: true })

  if (error) {
    console.error(error)
    contenedor.innerHTML = "<p>Error cargando productos</p>"
    return
  }

  contenedor.innerHTML = ""

  productos.forEach(producto => {
    const card = document.createElement("div")
    card.className = "producto"
    card.innerHTML = `
      <img src="${producto.imagen_url}" alt="${producto.nombre}">
      <div class="info-producto">
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion ?? ""}</p>
        <span class="precio">Bs ${producto.precio ?? ""}</span>
        <a class="btn-wsp"
           href="https://wa.me/59168807598?text=Hola,%20quiero%20consultar%20sobre:%20${encodeURIComponent(producto.nombre)}"
           target="_blank">
          Consultar por WhatsApp
        </a>
      </div>
    `
    contenedor.appendChild(card)
  })
}

cargarProductos()