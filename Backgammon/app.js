const chessGame = (function () {
  const canvas = document.getElementById("canvas")
  const button = document.querySelector("button")
  const ctx = canvas.getContext("2d")
  const pieceWidth = 24
  const size = 20
  canvas.width = pieceWidth * (size + 1)
  canvas.height = canvas.width
  let list = []

  function drawCheckerBoard() {
    for (let i = 1; i < size + 1; i++) {
      ctx.beginPath()
      ctx.moveTo(pieceWidth, i * pieceWidth)
      ctx.lineTo(pieceWidth * size, i * pieceWidth)
      ctx.moveTo(i * pieceWidth, pieceWidth)
      ctx.lineTo(pieceWidth * i, pieceWidth * size)
      ctx.stroke()
    }
  }

  function drawPiece(item) {
    ctx.beginPath()
    ctx.arc(item.x, item.y, pieceWidth / 2, 0, 2 * Math.PI, false)
    ctx.fillStyle = item.color
    ctx.fill()
  }

  function clearBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  canvas.addEventListener(
    "click",
    (e) => {
      const { clientX, clientY } = e
      const X = Math.round(clientX / pieceWidth) * pieceWidth
      const Y = Math.round(clientY / pieceWidth) * pieceWidth
      list.push({
        x: X,
        y: Y,
        color: list.length % 2 === 0 ? "black" : "white",
      })
      socket.send(JSON.stringify(list))
      drawPiece({
        x: X,
        y: Y,
        color: list.length % 2 === 0 ? "white" : "black",
      })
    },
    false
  )

  button.addEventListener("click", (e) => {
    list.pop()
    socket.send(JSON.stringify(list))
    clearBoard()
    drawCheckerBoard()
    list.forEach(drawPiece)
  })

  drawCheckerBoard()

  return {
    drawCheckerBoard,
    drawPiece,
    clearBoard,
  }
})()
