/**
 * 通信
 */
const socket = new WebSocket("ws://localhost:8081")

socket.onmessage = function (event) {
  const eList = JSON.parse(event.data)
  list = eList

  chessGame.clearBoard()
  chessGame.drawCheckerBoard()
  list.forEach(chessGame.drawPiece)
}
