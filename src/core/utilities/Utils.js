export default class Utils {
  static clamp (val, min = -Infinity, max = Infinity) {
    if (max < min) max = min

    return Math.min(max, Math.max(min, val))
  }

  static degreesToRadians (degrees) {
    return degrees * (Math.PI / 180)
  }

  static radiansToDegrees (radians) {
    return radians * (180 / Math.PI)
  }

  static lerp (min = 0, max = 1, amount = 1) {
    amount = Utils.clamp(amount, 0, 1)
    if (max < min) max = min

    return (1 - amount) * min + amount * max
  }
}