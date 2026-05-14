import { supabase } from "./supabase.js";

const CATEGORIA_ID = "1503a6a1-9e2c-481a-8a8e-e72408aee4a9";

async function cargarMarcas() {

  // 1️⃣ Traer productos de la categoría
  const { data: productos, error: errorProductos } = await supabase
    .from("productos")
    .select("marca_id")
    .eq("categoria_id", CATEGORIA_ID);

  if (errorProductos) {
    console.error("Error cargando productos:", errorProductos);
    return;
  }

  // 2️⃣ Obtener IDs únicos de marcas
  const marcasIds = [...new Set(productos.map(p => p.marca_id))];

  if (marcasIds.length === 0) {
    console.warn("No hay productos en esta categoría");
    return;
  }

  // 3️⃣ Buscar esas marcas
  const { data: marcas, error: errorMarcas } = await supabase
    .from("marcas")
    .select("*")
    .in("id", marcasIds)
    .eq("activo", true)
    .order("orden", { ascending: true });

  if (errorMarcas) {
    console.error("Error cargando marcas:", errorMarcas);
    return;
  }

  console.log("Marcas encontradas:", marcas);

  // 4️⃣ Pintar marcas
  const contenedor = document.querySelector(".grid-marcas");
  contenedor.innerHTML = "";

  marcas.forEach(marca => {
    const link = document.createElement("a");
    link.href = `marcas/facial/${marca.nombre.trim().toLowerCase()}.html`;
    link.className = "marca";
    link.textContent = marca.nombre.trim();
    contenedor.appendChild(link);
  });
}

cargarMarcas();