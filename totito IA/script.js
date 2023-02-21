var tablero = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

var jugador = -1;
var ia = +1;

function evalute(state) {
  var puntuacion = 0;

  if (finDelJuego(state, ia)) {
    puntuacion = +1;
  } else if (finDelJuego(state, jugador)) {
    puntuacion = -1;
  } else {
    puntuacion = 0;
  }

  return puntuacion;
}

function finDelJuego(state, jugador) {
  var win_state = [
    [state[0][0], state[0][1], state[0][2]],
    [state[1][0], state[1][1], state[1][2]],
    [state[2][0], state[2][1], state[2][2]],
    [state[0][0], state[1][0], state[2][0]],
    [state[0][1], state[1][1], state[2][1]],
    [state[0][2], state[1][2], state[2][2]],
    [state[0][0], state[1][1], state[2][2]],
    [state[2][0], state[1][1], state[0][2]],
  ];

  for (var i = 0; i < 8; i++) {
    var linea = win_state[i];
    var filled = 0;
    for (var j = 0; j < 3; j++) {
      if (linea[j] == jugador) filled++;
    }
    if (filled == 3) return true;
  }
  return false;
}

function gameOverAll(state) {
  return finDelJuego(state, jugador) || finDelJuego(state, ia);
}

function emptyCells(state) {
  var cells = [];
  for (var x = 0; x < 3; x++) {
    for (var y = 0; y < 3; y++) {
      if (state[x][y] == 0) cells.push([x, y]);
    }
  }

  return cells;
}

function validMove(x, y) {
  var empties = emptyCells(tablero);
  try {
    if (tablero[x][y] == 0) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
}

function setMove(x, y, jugador) {
  if (validMove(x, y)) {
    tablero[x][y] = jugador;
    return true;
  } else {
    return false;
  }
}

function minimax(state, depth, jugador) {
  var mejor;

  if (jugador == ia) {
    mejor = [-1, -1, -1000];
  } else {
    mejor = [-1, -1, +1000];
  }

  if (depth == 0 || gameOverAll(state)) {
    var score = evalute(state);
    return [-1, -1, score];
  }

  emptyCells(state).forEach(function (cell) {
    var x = cell[0];
    var y = cell[1];
    state[x][y] = jugador;
    var score = minimax(state, depth - 1, -jugador);
    state[x][y] = 0;
    score[0] = x;
    score[1] = y;

    if (jugador == ia) {
      if (score[2] > mejor[2]) mejor = score;
    } else {
      if (score[2] < mejor[2]) mejor = score;
    }
  });

  return mejor;
}

function aiTurn() {
  var x, y;
  var movimientos;
  var cell;

  if (emptyCells(tablero).length == 9) {
    x = parseInt(Math.random() * 3);
    y = parseInt(Math.random() * 3);
  } else {
    movimientos = minimax(tablero, emptyCells(tablero).length, ia);
    x = movimientos[0];
    y = movimientos[1];
  }

  if (setMove(x, y, ia)) {
    cell = document.getElementById(String(x) + String(y));
    cell.innerHTML = "O";
  }
}

function clickedCell(cell) {
  var button = document.getElementById("bnt-restart");
  button.disabled = true;
  var conditionToContinue =
    gameOverAll(tablero) == false && emptyCells(tablero).length > 0;

  if (conditionToContinue == true) {
    var x = cell.id.split("")[0];
    var y = cell.id.split("")[1];
    var movimientos = setMove(x, y, jugador);
    if (movimientos == true) {
      cell.innerHTML = "X";
      if (conditionToContinue) aiTurn();
    }
  }
  if (finDelJuego(tablero, ia)) {
    var linea;
    var cell;
    var msg;

    if (tablero[0][0] == 1 && tablero[0][1] == 1 && tablero[0][2] == 1)
      linea = [
        [0, 0],
        [0, 1],
        [0, 2],
      ];
    else if (tablero[1][0] == 1 && tablero[1][1] == 1 && tablero[1][2] == 1)
      linea = [
        [1, 0],
        [1, 1],
        [1, 2],
      ];
    else if (tablero[2][0] == 1 && tablero[2][1] == 1 && tablero[2][2] == 1)
      linea = [
        [2, 0],
        [2, 1],
        [2, 2],
      ];
    else if (tablero[0][0] == 1 && tablero[1][0] == 1 && tablero[2][0] == 1)
      linea = [
        [0, 0],
        [1, 0],
        [2, 0],
      ];
    else if (tablero[0][1] == 1 && tablero[1][1] == 1 && tablero[2][1] == 1)
      linea = [
        [0, 1],
        [1, 1],
        [2, 1],
      ];
    else if (tablero[0][2] == 1 && tablero[1][2] == 1 && tablero[2][2] == 1)
      linea = [
        [0, 2],
        [1, 2],
        [2, 2],
      ];
    else if (tablero[0][0] == 1 && tablero[1][1] == 1 && tablero[2][2] == 1)
      linea = [
        [0, 0],
        [1, 1],
        [2, 2],
      ];
    else if (tablero[2][0] == 1 && tablero[1][1] == 1 && tablero[0][2] == 1)
      linea = [
        [2, 0],
        [1, 1],
        [0, 2],
      ];

    for (var i = 0; i < linea.length; i++) {
      cell = document.getElementById(String(linea[i][0]) + String(linea[i][1]));
      cell.style.color = "red";
    }

    msg = document.getElementById("message");
    msg.innerHTML = "Gana la IA!";
  }
  if (emptyCells(tablero).length == 0 && !gameOverAll(tablero)) {
    var msg = document.getElementById("message");
    msg.innerHTML = "Empate!";
  }
  if (gameOverAll(tablero) == true || emptyCells(tablero).length == 0) {
    button.value = "Reiniciar";
    button.disabled = false;
  }
}

function restartBnt(button) {
  if (button.value == "Empieza IA") {
    aiTurn();
    button.disabled = true;
  } else if (button.value == "Reiniciar") {
    var htmlBoard;
    var msg;

    for (var x = 0; x < 3; x++) {
      for (var y = 0; y < 3; y++) {
        tablero[x][y] = 0;
        htmlBoard = document.getElementById(String(x) + String(y));
        htmlBoard.style.color = "#444";
        htmlBoard.innerHTML = "";
      }
    }
    button.value = "Empieza IA";
    msg = document.getElementById("message");
    msg.innerHTML = "";
  }
}
