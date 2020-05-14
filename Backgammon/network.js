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
