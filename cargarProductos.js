import { supabase } from "./supabase.js"

export async function cargarProductos(marca_id){
  const contenedor = document.getElementById("contenedor-productos")

  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .eq("marca_id", marca_id)
    .eq("activo", true)
    .order("orden", { ascending: true })

  if(error){
    console.error("Error cargando productos:", error)
    return
  }

  console.log("Productos encontrados:", data)

  contenedor.innerHTML = ""

  data.forEach(producto => {
    const card = document.createElement("div")
    card.className = "producto-card"

    card.innerHTML = `
      <img src="${producto.imagen_url}" class="producto-img">
      <h3>${producto.nombre}</h3>
      <p>${producto.descripcion ?? ""}</p>
    `

    contenedor.appendChild(card)
  })
}