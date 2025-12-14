# Juego de la Aventura al Cofre

La idea es que el usuario controle a un héroe en un tablero de 10x10 hasta llegar al cofre del tesoro, usando un dado para ir moviéndose por la cuadrícula.

Me ha servido para practicar JavaScript, manejo del DOM y también algo de `localStorage`.

---

## Cómo funciona el juego

Al abrir la página, lo primero que aparece es un formulario donde hay que escribir un **nombre de usuario**.

1. Escribes tu nombre.

2. Pulsas el botón **“Introducir nombre”**.
   - El nombre tiene que tener **4 letras o más**.
   - No puede llevar **números**.
   - Si algo está mal, salta un `alert` avisando.

3. Si el nombre es correcto, se activa el botón **Juga**.

4. Al pulsar **Jugar**:
   - Se crea un **tablero de 10x10**.
   - El héroe empieza en la esquina de arriba a la izquierda.
   - El cofre está en la esquina de abajo a la derecha.
   - Aparece el texto **Número de tiradas: 0** y el botón del dado.

A partir de ahí:

- Cada vez que pulsas **Tirar dado**, sale un número aleatorio del 1 al 6.
- La imagen del dado cambia según el número que ha salido.
- El juego marca con un **borde rojo** las casillas a las que te puedes mover en línea recta (arriba, abajo, izquierda, derecha), contando las casillas que indica el dado.
- Haces clic en una de esas casillas con borde rojo y el héroe se mueve allí.
- El contador de **“Número de tiradas”** va subiendo cada vez que lanzas el dado.

Cuando el héroe llega a la casilla del cofre, aparece un mensaje indicando en cuántas tiradas has llegado.

---

## El récord de tiradas

El juego guarda un **récord de la mejor partida** (la que llega al cofre en menos tiradas).

- Si es la primera vez que llegas al cofre, se guarda ese número de tiradas como récord.
- Si en otra partida tardas menos, el récord se actualiza.
- Si tardas igual o más, te avisa de que no has superado el récord.

Este récord se guarda en el **`localStorage` del navegador**, así que aunque cierres la página, al volver a entrar el récord sigue ahí.

Con el botón **Logro de Récord** puedes ver en cualquier momento cuál es el mejor récord guardado.  
Si todavía no se ha hecho ninguna partida completa, te avisa de que aún no hay récord.

---

## Archivos del proyecto

En el proyecto he usado estos archivos:

- `index.html`  
  Es el archivo principal. El `<body>` está vacío porque **todo el formulario y el tablero se crean desde JavaScript**.

- `estilos.css`  
  Aquí están los estilos del juego.  
  He intentado darle un ambiente tipo **aventura / exploradora**, con colores oscuros, marrones y verdes, como si fuera una jungla o unas ruinas.

- `ejercicio.js`  
  Contiene toda la lógica del juego:
  - Crear el formulario y el tablero dinámicamente.
  - Validar el nombre del jugador.
  - Calcular los movimientos según el dado.
  - Mover al héroe por el tablero.
  - Contar las tiradas y guardar el récord en `localStorage`.

- Carpeta `img/`  
  Imágenes del héroe, el cofre, el suelo/hierba y las caras del dado.

---

## Cómo probarlo

1. Descargar el proyecto.
2. Abrir `index.html` en un navegador.
3. Escribir un nombre válido, darle a **Introducir nombre** y luego a **Jugar**.
4. Pulsar **Tirar dado** e ir moviendo al héroe hasta llegar al cofre.

