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

  static lerp (amount = 1, min = 0, max = 1) {
    amount = Utils.clamp(amount, 0, 1)
    if (max < min) max = min

    return (1 - amount) * min + amount * max
  }

  static map (val, minOld, maxOld, minNew, maxNew) {
    const mappedVal = (val - minOld) / (maxOld - minOld) * (maxNew - minNew) + minNew
    return mappedVal
  }

  static random (maxOrMin = 1, max) {
    const min = max ? maxOrMin : 0
    max = max ? max : maxOrMin
    if (max < min) max = min
    
    const deltaBounds = max - min

    return min + Math.random() * deltaBounds
  }

  static randomInt(maxOrMin = 1, max) {
    return Math.round(Utils.random(maxOrMin, max))
  }
}