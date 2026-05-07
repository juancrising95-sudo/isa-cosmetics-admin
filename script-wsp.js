document.querySelectorAll(".btn-wsp").forEach(boton => {

    boton.addEventListener("click", function(e){
        e.preventDefault();

        const producto = boton.closest(".producto");

        const nombre = producto.querySelector("h3").innerText;
        const imagenLocal = producto.querySelector("img").getAttribute("src");

const imagen = "https://isa-cosmetics.onrender.com/" + imagenLocal.replace("../../", "");

        const numero = "59168807598";

        const mensaje =
`Hola, quiero consultar por este producto:%0A
${nombre}%0A
${imagen}`;

        const url = `https://wa.me/${numero}?text=${mensaje}`;

        window.open(url, "_blank");
    });

});