let numeroPokemon = ObtenNumeroAleatorio(primerPokemon, ultimoPokemon+1);

ObtenerDatosPokemon(API_URL + numeroPokemon);
function ObtenerDatosPokemon(enlace) {
    // Obtener JSON del Pokémon
    HTTP.ajax('GET', enlace).then((respuesta) => {
        new Pokemon(respuesta);
        let barraBusqueda = document.querySelector(".barra-busqueda"); // Restear el color
        barraBusqueda.style.outline = "none";
    }).catch((error) => {
        console.log(error)
        let barraBusqueda = document.querySelector(".barra-busqueda");
        barraBusqueda.style.outline = "3px solid red";
    });
}

function ObtenNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

class Pokemon {
    constructor(datosPokemon) {
        this.imagen = datosPokemon.sprites.other.home.front_default || "../img/InterfazPublicaciones/PokeballAbierta.png";
        this.nombre = datosPokemon.name || "?";
        this.vida = datosPokemon.stats[0].base_stat || "?";
        this.ataque = datosPokemon.stats[1].base_stat || "?";
        this.defensa = datosPokemon.stats[2].base_stat || "?";
        this.tipos = datosPokemon.types || "?";
        this.PintaPokemon();
    }

    PintaPokemon() {
        let tarjetaPokemon, informacion, tipoPokemon, imagen, texto, titulo, informacionTiposPokemon;
        
        tarjetaPokemon = document.querySelector(".tarjeta-pokemon");
        tarjetaPokemon.textContent = ""; // Vaciamos el contenido de la carta para asegurarnos de que no haya nada.
        // Imagen
        imagen = document.createElement("img");
        imagen.className = "imagenPokemon";
        imagen.src = this.imagen;
        imagen.alt = "Pokémon";
        tarjetaPokemon.appendChild(imagen);
        // Nombre
        titulo = document.createElement("p");
        titulo.appendChild(document.createTextNode(this.nombre));
        titulo.className = "nombre-pokemon";
        tarjetaPokemon.appendChild(titulo);
        // Información
        informacion = document.createElement("div");
        informacion.className += "informacion";
        imagen = document.createElement("img");
        imagen.src = "../img/IconosEstadisticas/Ataque.png"
        informacion.appendChild(imagen);
        texto = document.createTextNode(this.ataque);
        informacion.appendChild(texto);
        imagen = document.createElement("img");
        imagen.src = "../img/IconosEstadisticas/Defensa.png"
        informacion.appendChild(imagen);
        texto = document.createTextNode(this.defensa);
        informacion.appendChild(texto);
        imagen = document.createElement("img");
        imagen.src = "../img/IconosEstadisticas/Vida.png"
        informacion.appendChild(imagen);
        texto = document.createTextNode(this.vida);
        informacion.appendChild(texto);
        tarjetaPokemon.appendChild(informacion);        
        // Tipos
        informacionTiposPokemon = document.createElement("div");
        informacionTiposPokemon.className += "informacion-tipos-pokemon";
        this.tipos.forEach(t => {
            let tipo = t.type.name;
            tipoPokemon = document.createElement("div");
            tipoPokemon.className += "tipo-pokemon";
            tipoPokemon.style.backgroundColor = colorDivTipoPokemon[t.type.name] || "#FFFFFF"; 
            imagen = document.createElement("img");
            imagen.className += "imagen-tipo-pokemon";
            imagen.src = `../img/TiposPokemon/${tipo}.png`;
            tipoPokemon.appendChild(imagen);
            informacionTiposPokemon.appendChild(tipoPokemon);
        });
        tarjetaPokemon.appendChild(informacionTiposPokemon);
    }
}

// Buscar Pokémon
document.querySelector(".btn-buscar").addEventListener("click", function () {
    let barraBusqueda, textoBusqueda;

    barraBusqueda = document.querySelector(".barra-busqueda");
    textoBusqueda = barraBusqueda.value;
    ObtenerDatosPokemon(API_URL + textoBusqueda);
})

// Pokémon Siguiente

document.getElementById("btn-izq").addEventListener("click", function () {
    numeroPokemon = (numeroPokemon - 1 > 0) ? numeroPokemon - 1 : 1000;
    ObtenerDatosPokemon(API_URL + numeroPokemon);
})

// Pokémon Anterior

document.getElementById("btn-drch").addEventListener("click", function () {
    numeroPokemon = (numeroPokemon + 1 < 1000) ? numeroPokemon + 1 : 1;
    ObtenerDatosPokemon(API_URL + numeroPokemon);
})