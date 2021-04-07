/**
 * 枚举: 初始默认为 0
 */

enum Direction {
  Up,
  Dowm,
  Left,
  Right,
}
console.log(Direction.Up, Direction.Right, Direction[0], Direction[2])

enum Direction1 {
  Up = "up",
  Dowm = "down",
  Left = "left",
  Right = "right",
}
const value = "up"
if (value === Direction1.Up) {
  console.log("go up")
}

// 常量枚举: 提升了性能
const enum Direction2 {
  Up = "up",
  Dowm = "down",
  Left = "left",
  Right = "right",
}
