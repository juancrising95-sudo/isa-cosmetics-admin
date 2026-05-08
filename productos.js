async function obtenerProductos() {
    const { data, error } = await supabase
        .from("productos")
        .select("*");

    console.log("PRODUCTOS DESDE SUPABASE:", data);
}

obtenerProductos();