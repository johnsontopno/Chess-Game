var Bishop_b =
  '<img class="piece B" id="BishopB" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Chess_bdt45.svg/50px-Chess_bdt45.svg.png">';
var Bishop_w =
  '<img class="piece W" id="BishopW" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Chess_blt45.svg/50px-Chess_blt45.svg.png">';
var King_b =
  '<img class="piece B" id="KingB" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Chess_kdt45.svg/50px-Chess_kdt45.svg.png">';
var King_w =
  '<img class="piece W" id="KingW" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Chess_klt45.svg/50px-Chess_klt45.svg.png">';
var Knight_b =
  '<img class="piece B" id="KnightB" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Chess_ndt45.svg/50px-Chess_ndt45.svg.png">';
var Knight_w =
  '<img class="piece W" id="KnightW" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Chess_nlt45.svg/50px-Chess_nlt45.svg.png">';
var Pawn_b =
  '<img class="piece B" id="PawnB" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/50px-Chess_pdt45.svg.png">';
var Pawn_w =
  '<img class="piece W" id="PawnW" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/50px-Chess_plt45.svg.png">';
var Queen_b =
  '<img class="piece B" id="QueenB" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Chess_qdt45.svg/50px-Chess_qdt45.svg.png">';
var Queen_w =
  '<img class="piece W" id="QueenW" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Chess_qlt45.svg/50px-Chess_qlt45.svg.png">';
var Rook_b =
  '<img class="piece B" id="RookB" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Chess_rdt45.svg/50px-Chess_rdt45.svg.png">';
var Rook_w =
  '<img class="piece W" id="RookW" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Chess_rlt45.svg/50px-Chess_rlt45.svg.png">';
var points = null;
var pointsB = null;
var pointsW = null;
var pWC = null;
var pBc = null;
var index = null;
var piece = null;
var x = null;
var y = null;
var lock = null;
function init() {
  //----------------clear All---------------//
  points = [].slice.call(document.getElementsByClassName("point"));
  pointsB = [].slice.call(document.getElementsByClassName("pointB"));
  pointsW = [].slice.call(document.getElementsByClassName("pointW"));
  points.forEach(function (n) {
    n.innerHTML = "";
  });
  for (var i = 0; i < 64; i++) {
    points[i].setAttribute("id", i);
  }
  pointsB.forEach(function (n) {
    n.innerHTML = "";
  });
  pointsW.forEach(function (n) {
    n.innerHTML = "";
  });
  clear();
  //-----------------init------------------//
  fill();
  pWC = 0;
  pBc = 0;
  index = null;
  piece = null;
  x = 0;
  y = 0;
  lock = 0;
  start();
}
function fill() {
  points[0].innerHTML = Rook_b;
  points[1].innerHTML = Knight_b;
  points[2].innerHTML = Bishop_b;
  points[3].innerHTML = Queen_b;
  points[4].innerHTML = King_b;
  points[5].innerHTML = Bishop_b;
  points[6].innerHTML = Knight_b;
  points[7].innerHTML = Rook_b;
  for (var i = 8; i < 16; i++) {
    points[i].innerHTML = Pawn_b;
  }
  for (i = 55; i > 47; i--) {
    points[i].innerHTML = Pawn_w;
  }
  points[56].innerHTML = Rook_w;
  points[57].innerHTML = Knight_w;
  points[58].innerHTML = Bishop_w;
  points[59].innerHTML = Queen_w;
  points[60].innerHTML = King_w;
  points[61].innerHTML = Bishop_w;
  points[62].innerHTML = Knight_w;
  points[63].innerHTML = Rook_w;
}
function getXY() {
  x = 0;
  y = 0;
  if (index < 8) {
    y = index;
  } else {
    x = parseInt(index / 8);
    y = index - x * 8;
  }
}
function changePlayer() {
  if (player == "W") {
    player = "B";
    document.getElementsByClassName("headcell")[1].innerText = "Turn : Black";
  } else {
    player = "W";
    document.getElementsByClassName("headcell")[1].innerText = "Turn : White";
  }
}
function outTable(pieceType) {
  if (pieceType.childNodes[0].classList.contains("W")) {
    pointsW[pWC].innerHTML = pieceType.innerHTML;
    pWC++;
  } else {
    pointsB[pBc].innerHTML = pieceType.innerHTML;
    pBc++;
  }
}
function start() {
  points.forEach(function (point, i) {
    point.addEventListener("click", movePiece);
    point.addEventListener("click", select);
  });
}
function movePiece() {
  lock = 0;
  if (this.classList.contains("select")) {
    this.innerHTML = piece;
    points[index].innerHTML = "";
    lock = 1;
    changePlayer();
  }
  if (this.classList.contains("kill")) {
    if (this.childNodes[0].getAttribute("id") == "KingW") {
      document.getElementById("winnerPlayer").innerHTML = "Black";
      document.getElementsByClassName("winner")[0].style.display = "block";
      document.getElementsByClassName("plan")[0].style.pointerEvents = "none";
    }
    if (this.childNodes[0].getAttribute("id") == "KingB") {
      document.getElementById("winnerPlayer").innerHTML = "White";
      document.getElementsByClassName("winner")[0].style.display = "block";
      document.getElementsByClassName("plan")[0].style.pointerEvents = "none";
    }
    outTable(this);
    this.innerHTML = piece;
    points[index].innerHTML = "";
    lock = 1;
    changePlayer();
  }
  index = parseInt(this.getAttribute("id"));
  clear();
}
function clear() {
  points.forEach(function (point) {
    point.classList.remove("select");
    point.classList.remove("me");
    point.classList.remove("kill");
  });
}
function select() {
  if (this.innerHTML != "" && lock == 0) {
    if (this.childNodes[0].classList.contains(player)) {
      clear();
      this.classList.add("me");
      piece = this.innerHTML;
      pieceOption(this);
    }
  }
}
function pieceOption(point) {
  var piece = point.childNodes[0].getAttribute("id");
  switch (piece) {
    case "BishopB":
      bishopMove("W");
      break;
    case "KingB":
      kingMove("W");
      break;
    case "KnightB":
      knightMove("W");
      break;
    case "PawnB":
      pownMove("W");
      break;
    case "QueenB":
      rookMove("W");
      bishopMove("W");
      break;
    case "RookB":
      rookMove("W");
      break;
    case "BishopW":
      bishopMove("B");
      break;
    case "KingW":
      kingMove("B");
      break;
    case "KnightW":
      knightMove("B");
      break;
    case "PawnW":
      pownMove("B");
      break;
    case "QueenW":
      rookMove("B");
      bishopMove("B");
      break;
    case "RookW":
      rookMove("B");
      break;
  }
}
function rookMove(pieceType) {
  getXY();
  var lock1 = true;
  var lock2 = true;
  var lock3 = true;
  var lock4 = true;
  for (i = 1; i < 8; i++) {
    if (x - i >= 0 && x - i < 8 && lock1 == true) {
      points[(x - i) * 8 + y].classList.add("select");
      if (points[(x - i) * 8 + y].innerHTML != "") {
        lock1 = false;
        if (
          points[(x - i) * 8 + y].childNodes[0].classList.contains(pieceType)
        ) {
          points[(x - i) * 8 + y].classList.remove("select");
          points[(x - i) * 8 + y].classList.add("kill");
        } else points[(x - i) * 8 + y].classList.remove("select");
      }
    }
    if (x + i >= 0 && x + i < 8 && lock2 == true) {
      points[(x + i) * 8 + y].classList.add("select");
      if (points[(x + i) * 8 + y].innerHTML != "") {
        lock2 = false;
        if (
          points[(x + i) * 8 + y].childNodes[0].classList.contains(pieceType)
        ) {
          points[(x + i) * 8 + y].classList.remove("select");
          points[(x + i) * 8 + y].classList.add("kill");
        } else points[(x + i) * 8 + y].classList.remove("select");
      }
    }
    if (y - i >= 0 && y - i < 8 && lock3 == true) {
      points[x * 8 + (y - i)].classList.add("select");
      if (points[x * 8 + (y - i)].innerHTML != "") {
        lock3 = false;
        if (
          points[x * 8 + (y - i)].childNodes[0].classList.contains(pieceType)
        ) {
          points[x * 8 + (y - i)].classList.remove("select");
          points[x * 8 + (y - i)].classList.add("kill");
        } else points[x * 8 + (y - i)].classList.remove("select");
      }
    }
    if (y + i >= 0 && y + i < 8 && lock4 == true) {
      points[x * 8 + (y + i)].classList.add("select");
      if (points[x * 8 + (y + i)].innerHTML != "") {
        lock4 = false;
        if (
          points[x * 8 + (y + i)].childNodes[0].classList.contains(pieceType)
        ) {
          points[x * 8 + (y + i)].classList.remove("select");
          points[x * 8 + (y + i)].classList.add("kill");
        } else points[x * 8 + (y + i)].classList.remove("select");
      }
    }
  }
}
function knightMove(pieceType) {
  getXY();
  var pointArr = [
    [x - 1, y + 2],
    [x - 1, y - 2],
    [x - 2, y - 1],
    [x - 2, y + 1],
    [x + 1, y + 2],
    [x + 1, y - 2],
    [x + 2, y + 1],
    [x + 2, y - 1]
  ];
  pointArr.forEach(function (n) {
    if (n[0] >= 0 && n[0] < 8 && n[1] >= 0 && n[1] < 8) {
      points[n[0] * 8 + n[1]].classList.add("select");
      if (points[n[0] * 8 + n[1]].innerHTML != "") {
        if (
          points[n[0] * 8 + n[1]].childNodes[0].classList.contains(pieceType)
        ) {
          points[n[0] * 8 + n[1]].classList.remove("select");
          points[n[0] * 8 + n[1]].classList.add("kill");
        } else points[n[0] * 8 + n[1]].classList.remove("select");
      }
    }
  });
}
function bishopMove(pieceType) {
  getXY();
  var lock1 = true;
  var lock2 = true;
  var lock3 = true;
  var lock4 = true;
  for (var i = 1; i < 8; i++) {
    if (x - i >= 0 && x - i < 8 && y - i >= 0 && y - i < 8 && lock1 == true) {
      points[(x - i) * 8 + (y - i)].classList.add("select");
      if (points[(x - i) * 8 + (y - i)].innerHTML != "") {
        lock1 = false;
        if (
          points[(x - i) * 8 + (y - i)].childNodes[0].classList.contains(
            pieceType
          )
        ) {
          points[(x - i) * 8 + (y - i)].classList.remove("select");
          points[(x - i) * 8 + (y - i)].classList.add("kill");
        } else points[(x - i) * 8 + (y - i)].classList.remove("select");
      }
    }
    if (x - i >= 0 && x - i < 8 && y + i >= 0 && y + i < 8 && lock2 == true) {
      points[(x - i) * 8 + (y + i)].classList.add("select");
      if (points[(x - i) * 8 + (y + i)].innerHTML != "") {
        lock2 = false;
        if (
          points[(x - i) * 8 + (y + i)].childNodes[0].classList.contains(
            pieceType
          )
        ) {
          points[(x - i) * 8 + (y + i)].classList.remove("select");
          points[(x - i) * 8 + (y + i)].classList.add("kill");
        } else points[(x - i) * 8 + (y + i)].classList.remove("select");
      }
    }
    if (x + i >= 0 && x + i < 8 && y - i >= 0 && y - i < 8 && lock3 == true) {
      points[(x + i) * 8 + (y - i)].classList.add("select");
      if (points[(x + i) * 8 + (y - i)].innerHTML != "") {
        lock3 = false;
        if (
          points[(x + i) * 8 + (y - i)].childNodes[0].classList.contains(
            pieceType
          )
        ) {
          points[(x + i) * 8 + (y - i)].classList.remove("select");
          points[(x + i) * 8 + (y - i)].classList.add("kill");
        } else points[(x + i) * 8 + (y - i)].classList.remove("select");
      }
    }
    if (x + i >= 0 && x + i < 8 && y + i >= 0 && y + i < 8 && lock4 == true) {
      points[(x + i) * 8 + (y + i)].classList.add("select");
      if (points[(x + i) * 8 + (y + i)].innerHTML != "") {
        lock4 = false;
        if (
          points[(x + i) * 8 + (y + i)].childNodes[0].classList.contains(
            pieceType
          )
        ) {
          points[(x + i) * 8 + (y + i)].classList.remove("select");
          points[(x + i) * 8 + (y + i)].classList.add("kill");
        } else points[(x + i) * 8 + (y + i)].classList.remove("select");
      }
    }
  }
}
function kingMove(pieceType) {
  getXY();
  var pointArr = [
    [x, y - 1],
    [x, y + 1],
    [x - 1, y],
    [x - 1, y - 1],
    [x - 1, y + 1],
    [x + 1, y],
    [x + 1, y - 1],
    [x + 1, y + 1]
  ];
  pointArr.forEach(function (n) {
    if (n[0] >= 0 && n[0] < 8 && n[1] >= 0 && n[1] < 8) {
      points[n[0] * 8 + n[1]].classList.add("select");
      if (points[n[0] * 8 + n[1]].innerHTML != "") {
        if (
          points[n[0] * 8 + n[1]].childNodes[0].classList.contains(pieceType)
        ) {
          points[n[0] * 8 + n[1]].classList.remove("select");
          points[n[0] * 8 + n[1]].classList.add("kill");
        } else points[n[0] * 8 + n[1]].classList.remove("select");
      }
    }
  });
}
function pownMove(pieceType) {
  var i = index;
  if (pieceType == "B") {
    if (
      i == 48 ||
      i == 49 ||
      i == 50 ||
      i == 51 ||
      i == 52 ||
      i == 53 ||
      i == 54 ||
      i == 55
    ) {
      if (points[i - 8].innerHTML == "" && points[i - 8 * 2].innerHTML == "") {
        points[i - 8].classList.add("select");
        points[i - 8 * 2].classList.add("select");
      } else if (points[i - 8].innerHTML == "") {
        points[i - 8].classList.add("select");
      }
      if (points[i - 9].innerHTML != "") {
        if (points[i - 9].childNodes[0].classList.contains(pieceType)) {
          points[i - 9].classList.remove("select");
          points[i - 9].classList.add("kill");
        }
      }
    } else if (points[i - 8].innerHTML == "") {
      points[i - 8].classList.add("select");
    }
    if (points[i - 9].innerHTML != "") {
      if (points[i - 9].childNodes[0].classList.contains(pieceType)) {
        points[i - 9].classList.remove("select");
        points[i - 9].classList.add("kill");
      }
    }
  } else {
    if (
      i == 8 ||
      i == 9 ||
      i == 10 ||
      i == 11 ||
      i == 12 ||
      i == 13 ||
      i == 14 ||
      i == 15
    ) {
      if (points[i + 8].innerHTML == "" && points[i + 8 * 2].innerHTML == "") {
        points[i + 8].classList.add("select");
        points[i + 8 * 2].classList.add("select");
      } else if (points[i + 8].innerHTML == "") {
        points[i + 8].classList.add("select");
      }
      if (points[i + 9].innerHTML != "") {
        if (points[i + 9].childNodes[0].classList.contains(pieceType)) {
          points[i + 9].classList.remove("select");
          points[i + 9].classList.add("kill");
        }
      }
    } else if (points[i + 8].innerHTML == "") {
      points[i + 8].classList.add("select");
    }
    if (points[i + 9].innerHTML != "") {
      if (points[i + 9].childNodes[0].classList.contains(pieceType)) {
        points[i + 9].classList.remove("select");
        points[i + 9].classList.add("kill");
      }
    }
  }
}
