const APP_VERSION = "2";
const INSTALL_KEY = "isa_app_instalada_v" + APP_VERSION;



let deferredPrompt;


// Detectar si la app ya está instalada
function appYaInstalada() {
    return localStorage.getItem(INSTALL_KEY) === "si";
}

// Escuchar evento de instalación disponible
window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;

    if (!appYaInstalada()) {
        mostrarBannerInstalacion();
    }
});

function mostrarBannerInstalacion() {

    const banner = document.createElement("div");
    banner.id = "bannerApp";
    banner.innerHTML = `
        <div class="banner-contenido">
            📲 Descarga el catálogo como APP y accede más rápido
            <button id="btnInstalar">Instalar</button>
            <span id="cerrarBanner">✕</span>
        </div>
    `;

    document.body.appendChild(banner);

    document.getElementById("btnInstalar").onclick = instalarApp;
    document.getElementById("cerrarBanner").onclick = cerrarBanner;
}

async function instalarApp() {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;

    if (choice.outcome === "accepted") {
        localStorage.setItem(INSTALL_KEY, "si");
    }

    deferredPrompt = null;
    cerrarBanner();
}

function cerrarBanner() {
    const banner = document.getElementById("bannerApp");
    if (banner) banner.remove();
}