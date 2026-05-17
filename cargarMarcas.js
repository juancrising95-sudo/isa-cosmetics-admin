import { supabase } from "./supabase.js"

document.addEventListener("DOMContentLoaded", async () => {
  const categoriaSlug = window.location.pathname
    .split("/").pop().replace(".html", "")

  const contenedor = document.querySelector(".grid-marcas")

  // PASO 1: obtener el id de la categoría por su slug
  const { data: categoria, error: errorCat } = await supabase
    .from("categorias")
    .select("*")
    .eq("slug", categoriaSlug)
    .single()

  if (errorCat || !categoria) {
    console.error("No se encontró la categoría:", categoriaSlug)
    contenedor.innerHTML = "<p>No se encontró la categoría</p>"
    return
  }

  // PASO 2: buscar marcas a través de productos (no directamente en marcas)
  const { data: productosData, error } = await supabase
    .from("productos")
    .select("marca_id, marcas(id, nombre, logo_url, orden)")
    .eq("categoria_id", categoria.id)
    .eq("activo", true)

  if (error) {
    console.error("Error cargando marcas:", error)
    return
  }

  // PASO 3: eliminar marcas duplicadas
  const marcasUnicas = []
  const idsVistos = new Set()

  productosData.forEach(item => {
    if (item.marcas && !idsVistos.has(item.marcas.id)) {
      idsVistos.add(item.marcas.id)
      marcasUnicas.push(item.marcas)
    }
  })

  // PASO 4: ordenar y mostrar
  marcasUnicas.sort((a, b) => (a.orden ?? 99) - (b.orden ?? 99))

  contenedor.innerHTML = ""

  marcasUnicas.forEach(marca => {
    console.log("ID de marca:", marca.id, "| Nombre:", marca.nombre) // ← AGREGA ESTA LÍNEA

    const link = document.createElement("a")
    link.href = `productos?marca=${marca.id}&categoria=${categoria.id}`
    link.className = "marca"
    link.textContent = marca.nombre.trim()
    contenedor.appendChild(link)
  })
})