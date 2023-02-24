let turno = 1;
let fichas = ["O", "X"];
let casillasOcupadas = 0;
let partidaAcabada = false;
let textoVictoria = document.getElementById("textoVictoria");
let botones = Array.from(document.getElementsByTagName("button"));

let jugadasGuardadas = [];
let jugadaGanadora = [];

botones.forEach((x) => x.addEventListener("click", ponerFicha));

function ponerFicha(event) {
  let botonPulsado = event.target;
  if (!partidaAcabada && botonPulsado.innerHTML == "") {
    botonPulsado.innerHTML = fichas[turno];
    casillasOcupadas += 1;

    let estadoPartida = estado();
    if (estadoPartida == 0) {
      cambiarTurno();
      if (casillasOcupadas < 9) {
        ia();
        estadoPartida = estado();
        casillasOcupadas += 1;
        cambiarTurno();
      }
    }

    if (estadoPartida == 1) {
      textoVictoria.style.visibility = "visible";
      partidaAcabada = true;
      persistirDatos();
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
  let posicionVictoria = 0;
  let nEstado = 0;

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
    jugadaGanadora = [0, 1, 2];
  } else if (sonIguales(botones[3], botones[4], botones[5])) {
    posicionVictoria = 2;
    jugadaGanadora = [3, 4, 5];
  } else if (sonIguales(botones[6], botones[7], botones[8])) {
    posicionVictoria = 3;
    jugadaGanadora = [6, 7, 8];
  } else if (sonIguales(botones[0], botones[3], botones[6])) {
    posicionVictoria = 4;
    jugadaGanadora = [0, 3, 6];
  } else if (sonIguales(botones[1], botones[4], botones[7])) {
    posicionVictoria = 5;
    jugadaGanadora = [1, 4, 7];
  } else if (sonIguales(botones[2], botones[5], botones[8])) {
    posicionVictoria = 6;
    jugadaGanadora = [2, 5, 8];
  } else if (sonIguales(botones[0], botones[4], botones[8])) {
    posicionVictoria = 7;
    jugadaGanadora = [0, 4, 8];
  } else if (sonIguales(botones[6], botones[4], botones[2])) {
    posicionVictoria = 8;
    jugadaGanadora = [6, 4, 2];
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

function ia() {
  function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let valores = botones.map((x) => x.innerHTML);
  let pos = -1;

  if (valores[4] == "") {
    pos = 4;
  } else {
    let n = aleatorio(0, botones.length - 1);
    while (valores[n] != "") {
      n = aleatorio(0, botones.length - 1);
    }
    pos = n;
  }

  botones[pos].innerHTML = "O";
  return pos;
}

// function reiniciarPartida() {}

function reiniciarDatos() {
  textoVictoria.innerHTML = "Perdiste :(";
  textoVictoria.style.visibility = "visible";
}

function persistirDatos() {
  console.log("PERSISTIENDO DATOS");
  jugadasGuardadas = JSON.parse(localStorage.getItem("jugadas"));
  jugadasGuardadas.push(jugadaGanadora);
  localStorage.setItem("jugadas", JSON.stringify(jugadasGuardadas));
}
