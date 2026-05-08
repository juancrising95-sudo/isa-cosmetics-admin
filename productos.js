async function obtenerProductos() {

    const { data, error } = await db
        .from("productos")
        .select("*");

    if(error){
        console.error("ERROR SUPABASE:", error);
        return;
    }

    console.log("PRODUCTOS DESDE SUPABASE:", data);
}

obtenerProductos();