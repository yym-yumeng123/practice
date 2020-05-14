/**
 * 通信
 */
const socket = new WebSocket("ws://localhost:8081")

socket.onmessage = function (event) {
  chessGame.setList(JSON.parse(event.data))
  chessGame.clearBoard()
  chessGame.drawCheckerBoard()
  chessGame.getList().forEach(chessGame.drawPiece)
}

socket.onopen = function (data) {
  window.addEventListener("updateChess", function (e) {
    socket.send(JSON.stringify(e.detail))
  })
}
