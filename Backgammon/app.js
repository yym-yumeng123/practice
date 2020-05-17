const chessGame = (function () {
  const canvas = document.getElementById("canvas")
  const button = document.querySelector("button")
  const ctx = canvas.getContext("2d")
  const pieceWidth = 30
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

  function checkWin(checkInfo) {
    let winCase = []

    for (let k = 0; k < 4; k++) {
      winCase[k] = winCase[k] || []
      for (let j = 0; j < 5; j++) {
        // 设置每一个都是数组
        winCase[k][j] = winCase[k][j] || []
        // 每一项里面 push 数组
        for (let i = -j; i < 5 - j; i++) {
          if(k === 0) {
            winCase[k][j].push({
              x: checkInfo.x - i * pieceWidth,
              y: checkInfo.y,
              color: checkInfo.color,
            })
          }
          if(k === 1) {
            winCase[k][j].push({
              x: checkInfo.x,
              y: checkInfo.y - i * pieceWidth,
              color: checkInfo.color,
            })
          }
          if(k === 2) {
            winCase[k][j].push({
              x: checkInfo.x - i * pieceWidth,
              y: checkInfo.y - i * pieceWidth,
              color: checkInfo.color,
            })
          }
          if(k === 3) {
            winCase[k][j].push({
              x: checkInfo.x + i * pieceWidth,
              y: checkInfo.y - i * pieceWidth,
              color: checkInfo.color,
            })
          }
        }
      }
    }

    const win =winCase.some(winPosition => {
      return winPosition.some((winList) => {
        return winList.every((item) => {
          return list.some((chess) => {
            return (
              item.x === chess.x &&
              item.y === chess.y &&
              item.color === chess.color
            )
          })
        })
      })
    })

    console.log(win, "win..")
    if(win) {
      alert('赢了..')
    }
  }

  /**
   *
   * @param {传递 list} data
   */
  function setList(data) {
    list = data
  }

  function getList() {
    return list
  }

  function clearBoard() {
    ctx.clearRect(
      pieceWidth / 2,
      pieceWidth / 2,
      pieceWidth * size,
      pieceWidth * size
    )
  }

  function play(e) {
    // FIXME: 超出边界
    if (
      e.clientY <= pieceWidth / 2 ||
      e.clientY >= pieceWidth * size + pieceWidth / 2 ||
      e.clientX <= pieceWidth / 2 ||
      e.clientX >= pieceWidth * size + pieceWidth / 2
    ) {
      return
    }

    const { clientX, clientY } = e
    const X = Math.round(clientX / pieceWidth) * pieceWidth
    const Y = Math.round(clientY / pieceWidth) * pieceWidth

    let checkInfo = {
      x: X,
      y: Y,
      color: list.length % 2 === 0 ? "black" : "white",
    }

    // FIXME: 重复点击
    if (
      list.some((item) => {
        return item.x === checkInfo.x && item.y === checkInfo.y
      })
    ) {
      return false
    }

    list.push(checkInfo)

    window.dispatchEvent(
      new CustomEvent("updateChess", {
        detail: list,
      })
    )
    drawPiece(list[list.length - 1])

    checkWin(checkInfo)
  }

  function withDraw(e) {
    list.pop()
    window.dispatchEvent(
      new CustomEvent("updateChess", {
        detail: list,
      })
    )
    clearBoard()
    drawCheckerBoard()
    list.forEach(drawPiece)
  }

  function bindEvent() {
    canvas.addEventListener("click", play)
    button.addEventListener("click", withDraw)
  }

  function init() {
    drawCheckerBoard()
    bindEvent()
  }

  init()

  return {
    drawCheckerBoard,
    drawPiece,
    clearBoard,
    setList,
    getList,
  }
})()
