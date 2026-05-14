import { supabase } from "./supabase.js";

const CATEGORIA_ID = "1503a6a1-9e2c-481a-8a8e-e72408aee4a9";

async function cargarMarcas() {

  const { data, error } = await supabase
    .from("marcas")
    .select("*")
    .eq("categoria_id", CATEGORIA_ID)
    .eq("activo", true)
    .order("orden", { ascending: true });

  if (error) {
    console.error("Error cargando marcas:", error);
    return;
  }

  console.log("Marcas encontradas:", data);

  const contenedor = document.querySelector(".grid-marcas");
  contenedor.innerHTML = "";

  data.forEach(marca => {
    const link = document.createElement("a");
    link.href = `marcas/facial/${marca.nombre.toLowerCase()}.html`;
    link.className = "marca";
    link.textContent = marca.nombre;
    contenedor.appendChild(link);
  });
}

cargarMarcas();