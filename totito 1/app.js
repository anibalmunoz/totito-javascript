let turno = 1;
let fichas = ["O", "X"];
let casillasOcupadas = 0;
let partidaAcabada = false;
let textoVictoria = document.getElementById("textoVictoria");
let botones = Array.from(document.getElementsByTagName("button"));

let jugadasGuardadas = [];
let jugadaGanadora = [];
let jugadaUsuario = [];

botones.forEach((x) => x.addEventListener("click", ponerFicha));

function ponerFicha(event) {
  let botonPulsado = event.target;
  if (!partidaAcabada && botonPulsado.innerHTML == "") {
    botonPulsado.innerHTML = fichas[turno];

    //
    jugadaUsuario.push(botonPulsado.id);
    //

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
    } else if (estadoPartida == 10) {
      textoVictoria.innerHTML = "Empate, vuelve a jugar";
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
    for (let i = 0; i < jugadaUsuario.length; i++) {
      let numero = jugadaUsuario[i];
      if (numero == 0 || numero == 1 || numero == 2)
        jugadaGanadora.push(numero);
    }
  } else if (sonIguales(botones[3], botones[4], botones[5])) {
    posicionVictoria = 2;
    for (let i = 0; i < jugadaUsuario.length; i++) {
      let numero = jugadaUsuario[i];
      if (numero == 3 || numero == 4 || numero == 5)
        jugadaGanadora.push(numero);
    }
  } else if (sonIguales(botones[6], botones[7], botones[8])) {
    posicionVictoria = 3;
    for (let i = 0; i < jugadaUsuario.length; i++) {
      let numero = jugadaUsuario[i];
      if (numero == 6 || numero == 7 || numero == 8)
        jugadaGanadora.push(numero);
    }
  } else if (sonIguales(botones[0], botones[3], botones[6])) {
    posicionVictoria = 4;
    for (let i = 0; i < jugadaUsuario.length; i++) {
      let numero = jugadaUsuario[i];
      if (numero == 0 || numero == 3 || numero == 6)
        jugadaGanadora.push(numero);
    }
  } else if (sonIguales(botones[1], botones[4], botones[7])) {
    posicionVictoria = 5;
    for (let i = 0; i < jugadaUsuario.length; i++) {
      let numero = jugadaUsuario[i];
      if (numero == 1 || numero == 4 || numero == 7)
        jugadaGanadora.push(numero);
    }
  } else if (sonIguales(botones[2], botones[5], botones[8])) {
    posicionVictoria = 6;
    for (let i = 0; i < jugadaUsuario.length; i++) {
      let numero = jugadaUsuario[i];
      if (numero == 2 || numero == 5 || numero == 8)
        jugadaGanadora.push(numero);
    }
  } else if (sonIguales(botones[0], botones[4], botones[8])) {
    posicionVictoria = 7;
    for (let i = 0; i < jugadaUsuario.length; i++) {
      let numero = jugadaUsuario[i];
      if (numero == 0 || numero == 4 || numero == 8)
        jugadaGanadora.push(numero);
    }
  } else if (sonIguales(botones[6], botones[4], botones[2])) {
    posicionVictoria = 8;
    for (let i = 0; i < jugadaUsuario.length; i++) {
      let numero = jugadaUsuario[i];
      if (numero == 6 || numero == 4 || numero == 2)
        jugadaGanadora.push(numero);
    }
  } else if (casillasOcupadas == 9) {
    posicionVictoria = -1;
  }

  if (posicionVictoria > 0) {
    if (turno == 1) {
      nEstado = 1;
    } else {
      nEstado = -1;
    }
  } else if (posicionVictoria == -1) {
    return 10;
  }
  return nEstado;
}

function ia() {
  function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function noAleatorio(repetido) {
    obtenerDatos();
    if (jugadasGuardadas.length == 0) return aleatorio(0, botones.length - 1);
    let numeroPosible = aleatorio(0, botones.length - 1);

    for (let i = 0; i < jugadasGuardadas.length; i++) {
      let jugada = [];
      jugada = jugadasGuardadas[i];

      ///////////////////////////////

      if (jugada[0] == jugadaUsuario[0]) {
        if (jugada[1] == jugadaUsuario[1]) {
          let index;
          if (casillasOcupadas == 1) {
            index = 0;
          } else if (casillasOcupadas == 3) {
            index = 1;
          } else if (casillasOcupadas == 5) {
            // index = 2;
            index = 1;
            jugadaUsuario.splice(1, 1);
          } else if (casillasOcupadas == 7) {
            // index = 2;
            index = 1;
          }
          console.log("LA JUGADA A EVALUAR ES ", jugada);
          if (jugadaUsuario[index] == jugada[index < 2 ? index : 2]) {
            numeroPosible = jugada[index + 1];
            console.log("EL NUMERO POSIBLE DEL JUGADOR SERÁ ", numeroPosible);
            return numeroPosible;
          }
        }
      }

      //////////////////////////////
    }
    return numeroPosible;
  }

  let valores = botones.map((x) => x.innerHTML);
  let pos = -1;

  if (valores[4] == "") {
    pos = 4;
  } else {
    // let n = aleatorio(0, botones.length - 1);
    n = noAleatorio();
    while (valores[n] != "") {
      let repetido = n;
      // n = aleatorio(0, botones.length - 1);
      n = noAleatorio(repetido);
    }
    pos = n;
  }
  ////////////////

  /////////////
  botones[pos].innerHTML = "O";
}

function reiniciarPartida() {
  href;
}

function reiniciarDatos() {
  textoVictoria.innerHTML = "Datos de IA borrados";
  textoVictoria.style.visibility = "visible";
  localStorage.clear();
}

function obtenerDatos() {
  jugadasGuardadas = JSON.parse(localStorage.getItem("jugadas")) ?? [];
}

function persistirDatos() {
  console.log("PERSISTIENDO DATOS");
  jugadasGuardadas = JSON.parse(localStorage.getItem("jugadas")) ?? [];
  if (jugadasGuardadas.length > 48) return;
  console.log("Jugada ganadora", jugadaGanadora);
  // for (let i in jugadasGuardadas) {
  //   if (jugadasGuardadas[i] == jugadaGanadora) {
  //     console.log("Esta jugada se repite");
  //   } else {
  //     console.log("Esta jugada se repite");
  //   }
  //   console.log("comparacion", i, jugadaGanadora);
  // }
  //TODO: EVITAR GUARDAR JUGADAS REPETIDAS
  jugadasGuardadas.push(jugadaGanadora);
  jugadaUsuario = [];
  jugadaGanadora = [];
  localStorage.setItem("jugadas", JSON.stringify(jugadasGuardadas));
}
