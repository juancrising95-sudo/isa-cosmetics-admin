async function obtenerProductos() {

    const { data, error } = await db
        .from("productos_isa")   // 👈 ESTE ES EL CAMBIO CLAVE
        .select("*");

    if (error) {
        console.error(error);
        return;
    }

    console.log("PRODUCTOS DESDE SUPABASE:", data);
}

obtenerProductos();