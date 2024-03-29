let turno = 1;
let fichas = ["O", "X"];
let casillasOcupadas = 0;
let partidaAcabada = false;
let textoVictoria = document.getElementById("textoVictoria");
let botones = Array.from(document.getElementsByTagName("button"));

let jugadasGuardadas = [];
let jugadaGanadora = [];
let jugadaUsuario = [];
let numerosRepetidos = [];

botones.forEach((x) => x.addEventListener("click", ponerFicha));

function ponerFicha(event) {
  let botonPulsado = event.target;
  if (!partidaAcabada && botonPulsado.innerHTML == "") {
    botonPulsado.innerHTML = fichas[turno];

    //
    jugadaUsuario.push(botonPulsado.id);
    numerosRepetidos.push(botonPulsado.id);
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

  function noAleatorio() {
    obtenerDatos();
    if (jugadasGuardadas.length == 0) return aleatorio(0, botones.length - 1);

    for (let i = 0; i < jugadasGuardadas.length; i++) {
      let jugada = [];
      jugada = jugadasGuardadas[i];
      ///////////////////////////////
      const jugadaModificada = jugadaUsuario.slice();
      if (
        jugada[0] == jugadaModificada[0] ||
        jugada[0] == jugadaModificada[1]
      ) {
        let index;
        if (casillasOcupadas == 1) {
          index = 0;
        } else if (casillasOcupadas == 3) {
          index = 1;
        } else if (casillasOcupadas == 5) {
          index = 1;
          if (jugadaModificada.length > 3) jugadaModificada.shift();
        } else if (casillasOcupadas == 7) {
          if (jugadaModificada.length > 3) jugadaModificada.shift();
          index = 1;
        }
        if (
          jugada[1] == jugadaModificada[1] ||
          jugada[1] == jugadaModificada[2]
        ) {
          if (
            jugadaModificada[index] == jugada[index] ||
            jugadaModificada[index + 1] == jugada[index]
          ) {
            let numeroPosible = jugada[index + 1];
            if (!numerosRepetidos.find((element) => element == numeroPosible)) {
              console.log("LA JUGADA A EVALUAR ES ", jugada);
              console.log("EL NUMERO POSIBLE DEL JUGADOR SERÁ ", numeroPosible);
              return numeroPosible;
            }
          }
        }
      }
      //////////////////////////////
    }
    let numeroAleatorio = aleatorio(0, botones.length - 1);
    return numeroAleatorio;
  }

  let valores = botones.map((x) => x.innerHTML);
  let pos = -1;

  if (valores[4] == "") {
    pos = 4;
  } else {
    n = noAleatorio();
    while (valores[n] != "") {
      n = aleatorio(0, botones.length - 1);
    }
    pos = n;
  }
  numerosRepetidos.push(pos);
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
  jugadasGuardadas = JSON.parse(localStorage.getItem("jugadas")) ?? [];
  if (jugadasGuardadas.length > 48) return;
  if (jugadaGanadora.length < 3) {
    return console.log("LA JUGADA incorrecta FUE ", jugadaGanadora);
  }
  console.log("GUARDANDO DATOS");
  console.log("Jugada ganadora nueva", jugadaGanadora);
  jugadasGuardadas.push(jugadaGanadora);
  jugadaUsuario = [];
  jugadaGanadora = [];
  localStorage.setItem("jugadas", JSON.stringify(jugadasGuardadas));
}
