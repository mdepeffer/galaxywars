export default class Utils {
  static clamp (val, min = -Infinity, max = Infinity) {
    if (max < min) max = min

    return Math.min(max, Math.max(min, val))
  }
}