'use strict'; 
// Espero a que la página cargue y luego muestro la interfaz
window.onload = iniciarJuego;       

// Creo las variables globales para saber en qué casilla está el héroe
let filaHeroe;
let columnaHeroe;
let tablaJuego;

// Creo la variable para el contador de tiradas que hace el jugador hasta llegar al cofre
let numeroTiradas = 0; // Lo pongo a 0 porque aún no ha hecho ninguna

// Creo la variable para guardar el mejor récord con el menor número de tiradas
let mejorRecord = null;

// Creo la variable donde guardo el récord de la partida
let recordGuardado;

// Creo la funcion cargarRecordDesdeLocalStorage() que intenta cargar desde el localStorage el récord de tiradas si ya existe
function cargarRecordDesdeLocalStorage() {
    // Obtengo el récord guardado
    recordGuardado = localStorage.getItem("recordTiradas");
    // Si hay un récord
    if (recordGuardado !== null) {
        // Lo convierto a número y lo guardo en la variable global
        mejorRecord = Number(recordGuardado);
        // Hago un console para ver si se ha cargado el localStorage
        // console.log("Récord cargado desde localStorage:", mejorRecord);
    } else {
        // Hago un console para ver si no hay ningun récord en el localStorage
        // console.log("No hay récord guardado aún en localStorage.");
    }
}


// Creo la funcion crearInterfaz() donde se encuentra todo el formulario del juego usando solo JavaScript
function crearInterfaz() {
    // Creo el formulario donde el jugador pondrá su nombre y usará los botones del juego
    let miFormulario = document.createElement("form");
    // Le añado el atributo action
    miFormulario.setAttribute("action", "");
    // Le añado un id para identificarlo
    miFormulario.id = "idFormulario";
    // Añado el formulario al body
    document.body.appendChild(miFormulario);

    // Creo el label "Nombre de usuario:"
    let miNombreUsuario = document.createElement("label");
    // Le añado un atributo for con 'nombre' para identificarlo
    miNombreUsuario.setAttribute("for", "nombre");
    // Le añado un id 
    miNombreUsuario.id = "idNombre";
    // Le añado el texto
    miNombreUsuario.textContent = "Nombre de usuario:";
    // Añado el label al formulario
    miFormulario.appendChild(miNombreUsuario);

    // Creo el input para el nombre
    let miInputNombre = document.createElement("input");
    // Le añado los atributos type, name e id para identificarlo
    miInputNombre.setAttribute("type", "text");
    miInputNombre.setAttribute("name", "nombre");
    miInputNombre.setAttribute("id", "nombre");
    // Añado el input al formulario
    miFormulario.appendChild(miInputNombre);

    // Creo dos saltos de línea para que los botones queden debajo del input
    let miBr = document.createElement("br");
    let miBr2 = document.createElement("br");
    // Los añado al formulario 
    miFormulario.appendChild(miBr);
    miFormulario.appendChild(miBr2);

    // Creo el botón "Introducir nombre"
    let miBotonNombre = document.createElement("button");
    // Lo dejamos como submit para el preventDefault() 
    miBotonNombre.setAttribute("type", "submit");
    // Añado un id para identificarlo
    miBotonNombre.setAttribute("id", "botonNombre");
    // Le añado texto al botón
    miBotonNombre.textContent = "Introducir nombre";
    // Que baje a la siguiente línea
    miBotonNombre.style.display = "block";
    // Lo añado al formulario
    miFormulario.appendChild(miBotonNombre);

    // Creo el botón "Jugar" (desactivado al inicio)
    let miBotonJugar = document.createElement("button");
    // Le añado un atributo type
    miBotonJugar.setAttribute("type", "button");
    // Le añado un id para identificarlo
    miBotonJugar.setAttribute("id", "botonJugar");
    // Hago que el botón aparezca desactivado al inicio
    miBotonJugar.disabled = true;
    // Añado el texto Jugar
    miBotonJugar.textContent = "Jugar";
    // Lo añado al formulario
    miFormulario.appendChild(miBotonJugar);

    // Creo el botón del dado (oculto al inicio, lo mostrará generarTablero())
    let miBotonDado = document.createElement("button");
    // Añado un atributo type
    miBotonDado.setAttribute("type", "button");
    // Le añado un id para identificarlo
    miBotonDado.setAttribute("id", "botonDado");
    // Lo añado al formulario
    miFormulario.appendChild(miBotonDado);

    // Imagen del dado dentro del botón
    let miImagenDado = document.createElement("img");
    // Añado una imagen al botón
    miImagenDado.setAttribute("src", "./img/cara1.PNG");
    miImagenDado.setAttribute("alt", "dado");
    // Le añado un id para identificarlo
    miImagenDado.setAttribute("id", "caraDado");
    // Añado la imagen al botón dado
    miBotonDado.appendChild(miImagenDado);

    // Creo el botón "Logro de Récord"
    let miBotonRecord = document.createElement("button");
    // Le pongo el atributo type 
    miBotonRecord.setAttribute("type", "button");
    // Le añado un id para identificarlo
    miBotonRecord.setAttribute("id", "botonRecord");
    // Añado texto al botón
    miBotonRecord.textContent = "Logro de Récord";
    // Lo añado al formulario
    miFormulario.appendChild(miBotonRecord);

    // Creo un p para el mensaje de validación del nombre
    let miP = document.createElement("p");
    // Le añado un id para identificarle
    miP.setAttribute("id", "mensaje");
    // Hago que se comporte como un bloque
    miP.style.display = "block";
    // Añado el p al formulario
    miFormulario.appendChild(miP);

    // P para mostrar el número de tiradas del usuario
    let miPTiradas = document.createElement("p");
    // Le añado el atributo id para identificarlo
    miPTiradas.setAttribute("id", "idPTiradas");
    // Hago que no se vea al cargar la interfaz
    miPTiradas.style.display = "none";
    // Lo añado al formulario
    miFormulario.appendChild(miPTiradas);
}


// Creo la función iniciarJuego(), es la función principal que se ejecuta al cargar la página y se encarga de preparar los eventos del formulario.
// También llamo a validarNombre() cuando se pulsa el botón de introducir nombre
function iniciarJuego() {
    // LLamo a crearInterfaz()
    crearInterfaz();
    // Carga un récord desde localStorage
    cargarRecordDesdeLocalStorage();

    // Creo las variables donde llamo a los botones
    let miBotonNombre = document.getElementById("botonNombre");
    let miBotonJugar = document.getElementById("botonJugar");
    let miBotonDado = document.getElementById("botonDado");
    let miBotonRecord = document.getElementById("botonRecord");

    // Evento del botón "Introducir nombre"
    miBotonNombre.addEventListener("click", (ev) => {
        ev.preventDefault(); // Evito que el formulario recargue la página

        // Llamo a validarNombre(), que devuelve true si el nombre es correcto
        let nombreEsValido = validarNombre();

        if (!nombreEsValido) {
            // Si el nombre no es válido, salgo de la función y no hago nada más
            return;
        }

        // Si el nombre es válido, habilito el botón "Jugar"
        miBotonJugar.disabled = false;

        // El botón "Jugar" activará el tablero cuando el usuario lo pulse
        miBotonJugar.addEventListener("click", generarTablero);

        // El botón del dado llamará a la función tirarDado cuando se pulse
        miBotonDado.addEventListener("click", tirarDado);

        // Añado un evento click a miBotonRecord que llamará a la función mostrarRecord
        miBotonRecord.addEventListener("click", mostrarRecord);
    });
}


// Creo la función validarNombre(), valido si el nombre tiene al menos 4 letras y si contiene números
function validarNombre() {
    // Recojo el valor del nombre del usuario
    let stringNombre = document.getElementById("nombre");
    // Quito los espacios en blanco al inicio y final del texto
    let nombre = stringNombre.value.trim();

    // 1. Valido si el nombre de usuario tiene menos de 4 letras
    if (nombre.length < 4) { // si tiene menos de 4 saco el mensaje
        alert("El nombre debe tener 4 o más letras");
        return false;
    }
    // Hago un console para ver la longitud del nombre
    // console.log("El nombre tiene " + nombre.length + " caracteres.");

    // Compruebo si el nombre tiene números recorriendo cada carácter del texto
    // Guardo en caracter cada letra del nombreUsuario en la posición i
    for (let i = 0; i < nombre.length; i++) {
        // Guardo en caracter cada letra del nombreUsuario en la posición i
        let caracter = nombre.charAt(i);

        // Si el caracter está en el rango de 0 y 9 es un número (No permitido)
        if (caracter >= "0" && caracter <= "9") {
            alert("Números no permitidos");
            return false;
        }
    }

    // Si el nombre es válido, modifico el contenido del p en el HTML mostrando un mensaje
    // Llamo al p "mensaje" y lo guardo en la variable mensaje
    let mensaje = document.getElementById("mensaje");
    // Le añado el texto correspondiente junto al nombre del usuario
    mensaje.textContent = `A luchar héroe: ${nombre}`;

    // Si todo ha ido bien, devuelvo true
    return true;
}



// Creo la función generarTablero(), que crea el tablero 10x10, coloca al héroe y el cofre
// También muestro el botón del dado para empezar a jugar
function generarTablero() {
    // Creo la tabla donde se moverá el héroe
    let miTabla = document.createElement("Table");
    // Añado un atributo id para identificarlo
    miTabla.setAttribute("id", "idTabla");
    // Lo añado al body
    document.body.appendChild(miTabla);

    // Cuando se cree la tabla el contador de tiradas estará a 0
    numeroTiradas = 0;

    // Genero 10 filas
    for (let fila = 0; fila < 10; fila++) {
        // Creo mi fila
        let miTr = document.createElement("tr");
        // Lo añado a la tabla
        miTabla.appendChild(miTr);

        // En cada fila, genero 10 celdas
        for (let columna = 0; columna < 10; columna++) {
            // Creo mis celdas
            let miTd = document.createElement("td");
            // Lo añado a la fila
            miTr.appendChild(miTd);

            // Creo la imagen de la celda (suelo, héroe o cofre)
            let imgSuelo = document.createElement("img");
            // Le añado un atributo para añadir la foto que quiero poner
            imgSuelo.setAttribute("src", "./img/tierra.jpg");
            imgSuelo.setAttribute("alt", "suelo");

            // Si la fila es 0 y la columa es 0
            if (fila === 0 && columna === 0) {
                // Añado el héroe a esa celda
                imgSuelo.setAttribute("src", "./img/heroe4.png");
                // Añado un alt a la imagen llamado heroe
                imgSuelo.setAttribute("alt", "heroe");
                // Si la fila y la columna son igual a 9
            } else if (fila === 9 && columna === 9) {
                // Añado la imagen del tesoro
                imgSuelo.setAttribute("src", "./img/cofre.jpg");
                // Le pongo un atributo alt llamado cofre
                imgSuelo.setAttribute("alt", "cofre");
                // Sino, las celdas tendrán la imagen de tierra
            } else {
                // Añado la imagen de tierra
                imgSuelo.setAttribute("src", "./img/hierba.png");
                // Añado un atributo alt llamado suelo
                imgSuelo.setAttribute("alt", "suelo");
            }
            // Añado la imagen del suelo a mi Td
            miTd.appendChild(imgSuelo);
        }
    }

    // Guardo la tabla en una variable global para usarla después y mover al héroe
        tablaJuego = miTabla;
        // Muestro la tabla
        tablaJuego.style.display = "table";

        // Ahora oculto el botón jugar
        let miBotonJugar = document.getElementById("botonJugar");
        miBotonJugar.style.display = "none";

        // Muestro el botón tirarDado
        let miBotonDado = document.getElementById("botonDado");
        miBotonDado.style.display = "inline-block";

        // Muestro la posición actual del héroe
        filaHeroe = 0;
        columnaHeroe = 0;
        // Hago un console para saber dónde se encuentra el héroe
        // console.log(`El héroe está en la fila ${filaHeroe} y columna ${columnaHeroe}`);

        // Añado un evento click a la tabla para que el héroe se pueda mover
        tablaJuego.addEventListener("click", moverHeroe);

        // Muestro el párrafo de número de tiradas y lo reinicio a 0
        let parrafoTiradas = document.getElementById("idPTiradas");
        parrafoTiradas.style.display = "block";
        parrafoTiradas.textContent = "Número de tiradas: 0";
}


// Creo la función tirarDado(), que lanza el dado, determina las posibles celdas de movimiento, actualiza el número de tiradas
// y marca en rojo las casillas a las que se puede mover el héroe
function tirarDado() {
    // Capturo la img del dado para cambiar la cara según el número que salga
    let miCaraDado = document.getElementById("caraDado");

    // Hago un for para quitar los bordes rojos del tablero
    for (let fila = 0; fila < 10; fila++) {
        for (let columna = 0; columna < 10; columna++) {
            let celda = tablaJuego.rows[fila].cells[columna];
            celda.style.border = ""; // les quito el color
        }
    }

    // Aumento en 1 el número de tiradas que pulsa el usuario
    numeroTiradas = numeroTiradas +1;
    // Hago un console para ver cuántas tiradas lleva
    // console.log(`LLeva ${numeroTiradas} de tiradas.`);

    // Actualizo el párrafo donde indico el número de tiradas
    let parrafoTiradas = document.getElementById("idPTiradas");
    parrafoTiradas.textContent = "Número de tiradas: " + numeroTiradas;

    // Genero un numero aleatorio del 1 al 6
    let numeroAleatorio = Math.floor(Math.random() * 6) + 1;
    // console.log("El número aleatorio es: " + numeroAleatorio);
    // console.log("");

    // Tengo que hacer if.. para que si sale 1 la cara del dado sea 1, si sale 2, cara del dado 2...
    if (numeroAleatorio === 1) {
        miCaraDado.src = "./img/cara1.PNG";
    } else if (numeroAleatorio === 2) {
        miCaraDado.src = "./img/cara2.PNG";
    } else if (numeroAleatorio === 3) {
        miCaraDado.src = "./img/cara3.PNG";
    } else if (numeroAleatorio === 4) {
        miCaraDado.src = "./img/cara4.PNG";
    } else if (numeroAleatorio === 5) {
        miCaraDado.src = "./img/cara5.PNG";
    } else if (numeroAleatorio === 6) {
        miCaraDado.src = "./img/cara6.PNG";
    }

    // Hago un console para saber dónde se encuentra el héroe
    // console.log(`El héroe está en la fila ${filaHeroe} y columna ${columnaHeroe}`);
    // console.log("");
    // Pinto la celda donde está el héroe
    let celdaHeroe = tablaJuego.rows[filaHeroe].cells[columnaHeroe];
    // celdaHeroe.style.border =  "3px solid red !important";

    // Calculo las opciones de movimiento hacia la derecha
    let haciaDerecha = columnaHeroe + numeroAleatorio;
    // Solo pinto si la casilla de destino sigue dentro del tablero (entre 0 y 9)
    if (haciaDerecha >= 0 && haciaDerecha <= 9) {
        // console.log(`Hacia la derecha -> fila ${filaHeroe} y columna ${haciaDerecha} `);

        // Hago un bucle for para recorrer desde la columna siguiente al héroe hasta la columna del destino
        for (let columna = columnaHeroe + 1; columna <= haciaDerecha; columna++) {
            let celdaDerecha = tablaJuego.rows[filaHeroe].cells[columna];
            // Pinto las celdas de color rojo
            celdaDerecha.style.border =  "3px solid red";
        }
    } else {
        // console.log(`Hacia la derecha-> No puedes, te saldrías del tablero.`);
    }

    // Calculo las opciones de movimiento hacia la izquierda
    let haciaIzquierda = columnaHeroe - numeroAleatorio;
    // Solo pinto si la casilla de destino sigue dentro del tablero (entre 0 y 9)
    if (haciaIzquierda >= 0 && haciaIzquierda <= 9) {
        // console.log(`Hacia la izquierda -> fila ${filaHeroe} y columna ${haciaIzquierda} `);
        // Hago un bucle for para recorrer desde la columna de la izquierda del héroe hasta la columna del destino
        for (let columna = columnaHeroe - 1; columna >= haciaIzquierda; columna--) {
            let celdaIzquierda = tablaJuego.rows[filaHeroe].cells[columna];
            // Pinto las celdas de color rojo
            celdaIzquierda.style.border =  "3px solid red";
        }
    } else {
        // console.log(`Hacia la izquierda -> No puedes, te saldrías del tablero.`);
    }

    // Calculo las opciones de movimiento hacia arriba
    let haciaArriba = filaHeroe - numeroAleatorio;
    // Solo pinto si la casilla de destino sigue dentro del tablero (entre 0 y 9)
    if (haciaArriba >= 0 && haciaArriba <= 9) {
        // console.log(`Hacia arriba -> fila ${haciaArriba} y columna ${columnaHeroe} `);
        // Recorro desde la fila de encima del héroe hasta la fila destino
        for (let fila = filaHeroe - 1; fila >= haciaArriba; fila--) {
            let celdaArriba = tablaJuego.rows[fila].cells[columnaHeroe];
            // Pinto las celdas de color rojo
            celdaArriba.style.border =  "3px solid red";
        }
    } else {
        // console.log(`Hacia arriba -> No puedes, te saldrías del tablero.`);
    }
    
    // Calculo las opciones de movimiento hacia abajo
    let haciaAbajo = filaHeroe + numeroAleatorio;
    // Solo pinto si la casilla de destino sigue dentro del tablero (entre 0 y 9)
    if (haciaAbajo >= 0 && haciaAbajo <= 9) {
        // console.log(`Hacia abajo -> fila ${haciaAbajo} y columna ${columnaHeroe} `);
        // Hago un console para obtener la celda HTML correspondiente
        // Recorro desde la fila de debajo del héroe hasta la fila destino
        for (let fila = filaHeroe + 1; fila <= haciaAbajo; fila++) {
            let celdaAbajo = tablaJuego.rows[fila].cells[columnaHeroe];
            // Pinto las celdas de color rojo
            celdaAbajo.style.border =  "3px solid red";
        }
    } else {
        // console.log(`Hacia abajo -> No puedes, te saldrías del tablero.`);
    }

}



// Creo la funcion moverHeroe() que se ejecuta cuando el usuario hace clic en el tablero y mueve al héroe
function moverHeroe(evento) {
    // Indico sobre qué elemento se ha hecho clic en la tabla
    let celdaClicada = evento.target;

    // Si hace clic en la imagen, subo al padre <td>
    if(celdaClicada.tagName === "IMG"){
        celdaClicada = celdaClicada.parentElement;
    }

    // Si no ha clicado en una celda <td> no se hace nada
    if(celdaClicada.tagName !== "TD"){
        return;
    }

    // Solo se puede mover si la celda tiene el borde rojo
    if(celdaClicada.style.border !== "3px solid red"){
        // Hago un console para ver que funciona la validación
        // console.log("Has hecho clic en una casilla que no es válida");
        return;
    }

    // Calcula la fila y columna de la celda dentro de la tabla
    let filaDestino = celdaClicada.parentElement.rowIndex; // nº fila 
    let columnaDestino = celdaClicada.cellIndex; // nº de columna
    // Hago un console para ver a donde se movería el héroe
    // console.log(`Mover héroe a fila ${filaDestino}, columna ${columnaDestino}`);


    // Quito al héroe de su posición actual
    let celdaActualHeroe = tablaJuego.rows[filaHeroe].cells[columnaHeroe];
    let imagenActualHeroe = celdaActualHeroe.querySelector("img");

    imagenActualHeroe.setAttribute("src", "./img/hierba.png");
    imagenActualHeroe.setAttribute("alt", "suelo");

    // Coloco al héroe en la celda clicada
    let imagenDestinoHeroe = celdaClicada.querySelector("img");
    imagenDestinoHeroe.setAttribute("src", "./img/heroe4.png");
    imagenDestinoHeroe.setAttribute("alt", "heroe");

    // Limpio todos los "rojos" del tablero para cuando vuelva a tirar el dado
    for(let fila = 0; fila < 10; fila++){
        for(let columna = 0; columna < 10; columna++){
            let celdaTablero = tablaJuego.rows[fila].cells[columna];
            celdaTablero.style.border = "";
        }
    }

    // Actualizo la posición actual del héroe
    filaHeroe = filaDestino;
    columnaHeroe = columnaDestino;
    // console.log(`El héroe está en la fila ${filaHeroe} y columna ${columnaHeroe}`);

    // Compuebo si ha llegado al cofre
    if(filaHeroe === 9 && columnaHeroe === 9){
        // Hago un alert para indicar que el usuario ha llegado al cofre
        alert("¡Has encontrado el cofre en " + numeroTiradas + " tiradas!");
    
        // Si todavía no hay récord guardado (es la primera vez que llega)
        if (mejorRecord === null) {
            mejorRecord = numeroTiradas;     // Guardo estas tiradas como récord
            localStorage.setItem("recordTiradas", mejorRecord);
            alert("Este es tu primer récord.");
        } 
        // Si ya había un récord y ahora ha tardado menos tiradas
        else if (numeroTiradas < mejorRecord) {
            mejorRecord = numeroTiradas;     // Actualizo el récord
            localStorage.setItem("recordTiradas", mejorRecord);
            alert("¡Has batido tu récord anterior!");
        } 
        // Si ha tardado igual o más, no hay nuevo récord
        else {
            alert("Récord no superado, el actual récord es: " + mejorRecord + " tiradas.");
        }

        // Reinicio el numero de tiradas a cero para una nueva partida
        numeroTiradas = 0;

        // Actualizo el párrafo del número de tiradas a 0
        let parrafoTiradas = document.getElementById("idPTiradas");
        parrafoTiradas.textContent = "Número de tiradas: 0";
    }
}



// Creo la función mostrarRecord() que muestra en un alert el mejor récord guardado hasta ahora
function mostrarRecord() {
    // Si no tengo récord en memoria, intento cargarlo desde localStorage
    if (mejorRecord === null) {
        recordGuardado = localStorage.getItem("recordTiradas");
        // Si no hay nada en localStorage, aún no hay ningún récord
        if(recordGuardado === null){
            alert("Todavía no has conseguido ningún récord. ¡Llega primero al cofre!");
            return;
        }
        // Si hay algo guardado, lo paso a número y lo guardo en la variable global
        mejorRecord = Number(recordGuardado);
    } 
    // Hago un alert para mostrar cuál es el mejor récord
    alert("Mejor récord actual: " + mejorRecord + " tiradas.")
}


