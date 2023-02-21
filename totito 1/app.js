let turno = 1;
let fichas = ["O", "X"];
let puestas = 0;
let partidaAcabada = false;
let textoVictoria = document.getElementById("textoVictoria");
let botones = Array.from(document.getElementsByTagName("button"));

botones.forEach((x) => x.addEventListener("click", ponerFicha));

function ponerFicha(event) {
  let botonPulsado = event.target;
  if (!partidaAcabada && botonPulsado.innerHTML == "") {
    botonPulsado.innerHTML = fichas[turno];
    puestas += 1;

    let estadoPartida = estado();
    if (estadoPartida == 0) {
      cambiarTurno();
      if (puestas < 9) {
        ia();
        estadoPartida = estado();
        puestas += 1;
        cambiarTurno();
      }
    }

    if (estadoPartida == 1) {
      textoVictoria.style.visibility = "visible";
      partidaAcabada = true;
    } else if (estadoPartida == -1) {
      textoVictoria.innerHTML = "Perdiste :(";
      partidaAcabada = true;
      textoVictoria.style.visibility = "visible";
    }
  }
}

function cambiarTurno() {
  turno == 1 ? (turno = 0) : (turno = 1);
}

function estado() {
  posicionVictoria = 0;
  nEstado = 0;

  function sonIguales(...args) {
    valores = args.map((x) => x.innerHTML);
    if (valores[0] != "" && valores.every((x, i, arr) => x === arr[0])) {
      args.forEach((x) => (x.style.backgroundColor = "Green"));
      return true;
    } else {
      return false;
    }
  }

  if (sonIguales(botones[0], botones[1], botones[2])) {
    posicionVictoria = 1;
  } else if (sonIguales(botones[3], botones[4], botones[5])) {
    posicionVictoria = 2;
  } else if (sonIguales(botones[6], botones[7], botones[8])) {
    posicionVictoria = 3;
  } else if (sonIguales(botones[0], botones[3], botones[6])) {
    posicionVictoria = 4;
  } else if (sonIguales(botones[1], botones[4], botones[7])) {
    posicionVictoria = 5;
  } else if (sonIguales(botones[2], botones[5], botones[8])) {
    posicionVictoria = 6;
  } else if (sonIguales(botones[0], botones[4], botones[8])) {
    posicionVictoria = 7;
  } else if (sonIguales(botones[6], botones[4], botones[2])) {
    posicionVictoria = 8;
  }

  if (posicionVictoria > 0) {
    if (turno == 1) {
      nEstado = 1;
    } else {
      nEstado = -1;
    }
  }
  return nEstado;
}