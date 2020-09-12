import Utils from './Utils'

export default class Color {
  constructor () {
    this.__r = 0
    this.__g = 0
    this.__b = 0
    this.__a = 1
  }

  static convertRGBtoCMYK (rgbArray = [0, 0, 0]) {
    const r = Utils.clamp(rgbArray[0] || 0, 0, 255) / 255
    const g = Utils.clamp(rgbArray[1] || 0, 0, 255) / 255
    const b = Utils.clamp(rgbArray[2] || 0, 0, 255) / 255
    
    const k = 1 - Math.max(r, g, b)
    const kreverse = 1 - k

    const c = (1 - r - k) / kreverse
    const m = (1 - g - k) / kreverse
    const y = (1 - b - k) / kreverse

    return [c * 100, m * 100, y * 100, k * 100]
  }

  static convertCYMKtoRGB (cmykArray = [0, 0, 0, 0]) {
    const c = Utils.clamp(cmykArray[0] || 0, 0, 100) / 100
    const m = Utils.clamp(cmykArray[1] || 0, 0, 100) / 100
    const y = Utils.clamp(cmykArray[2] || 0, 0, 100) / 100
    const k = Utils.clamp(cmykArray[3] || 0, 0, 100) / 100

    const r = 255 * (1 - c) * (1 - k)
    const g = 255 * (1 - m) * (1 - k)
    const b = 255 * (1 - y) * (1 - k)

    return [r, g, b]
  }

  static convertRGBtoHSV (rgbArray = [0, 0, 0]) {
    const r = Utils.clamp(rgbArray[0] || 0, 0, 255) / 255
    const g = Utils.clamp(rgbArray[1] || 0, 0, 255) / 255
    const b = Utils.clamp(rgbArray[2] || 0, 0, 255) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const delta = max - min

    let h = 0
    let s = 0
    let v = max

    if (!delta) return [h, s, v]

    s = delta / max

    const dr = (((max - r) / 6) + (delta / 2)) / delta
    const dg = (((max - g) / 6) + (delta / 2)) / delta
    const db = (((max - b) / 6) + (delta / 2)) / delta

    if (r == max) {
      h = db - dg
    } else if (g == max) {
      h = (1 / 3) + dr - db
    } else if (b == max) {
      h = (2 / 3) + dg - dr
    }

    if (h < 0) h++
    if (h > 1) h--

    return [h * 360, s * 100, v * 100]
  }

  static convertHSVtoRGB (hsvArray = [0, 0, 0]) {
    const h = Utils.clamp(hsvArray[0] || 0, 0, 360) / 360
    const s = Utils.clamp(hsvArray[1] || 0, 0, 100) / 100
    const v = Utils.clamp(hsvArray[2] || 0, 0, 100) / 100

    const i = Math.floor(h * 6)
    const f = h * 6 - i
    const p = v * (1 - s)
    const q = v * (1 - f * s)
    const t = v * (1 - (1 - f) * s)

    let r = 0
    let g = 0
    let b = 0

    switch (i % 6) {
      case 0: r = v; g = t; b = p; break
      case 1: r = q; g = v; b = p; break
      case 2: r = p; g = v; b = t; break
      case 3: r = p; g = q; b = v; break
      case 4: r = t; g = p; b = v; break
      case 5: r = v; g = p; b = q; break
    }

    return [r * 255, g * 255, b * 255]
  }

  static convertRGBtoHEX (rgbArray = [0, 0, 0]) {
    const r = Utils.clamp(rgbArray[0] || 0, 0, 255)
    const g = Utils.clamp(rgbArray[1] || 0, 0, 255)
    const b = Utils.clamp(rgbArray[2] || 0, 0, 255)

    let hexR = r.toString(16)
    if (hexR.length == 1) hexR = '0' + hexR
    let hexG = g.toString(16)
    if (hexG.length == 1) hexG = '0' + hexG
    let hexB = b.toString(16)
    if (hexB.length == 1) hexB = '0' + hexB

    return `#${hexR}${hexG}${hexB}`
  }

  static convertHEXtoRGB (hexString = '#000000') {
    hexString = Color.convertShortHEXtoLongHEX(hexString)
    const hexDissection = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i
    const hexParts = hexDissection.exec(hexString)

    const r = hexParts ? parseInt(hexParts[1], 16) : 0
    const g = hexParts ? parseInt(hexParts[2], 16) : 0
    const b = hexParts ? parseInt(hexParts[3], 16) : 0

    return [r, g, b]
  }

  static convertShortHEXtoLongHEX (hexString = '#000') {
    if (hexString.replace('#', '').length != 3) return hexString

    const shorthandDissection = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
    return hexString.replace(shorthandDissection, (original, r, g, b) => {
      return r + r + g + g + b + b
    })
  }

  static fromRGB (r, g, b) {
    const color = new Color()
    
    color.setRGB(r, g, b)

    return color 
  }

  static fromHEX (hexString) {
    const rgb = Color.convertHEXtoRGB(hexString)
    const color = new Color()
    
    color.setRGB(rgb[0], rgb[1], rgb[2])
    
    return color
  }

  static fromCYMK (c, y, m, k) {
    const rgb = Color.convertCYMKtoRGB([r, g, b])
    const color = new Color()

    color.setRGB(rgb[0], rgb[1], rgb[2])

    return color
  }

  static fromHSV (h, s, v) {
    const rgb = Color.convertHSVtoRGB([h, s, v])
    const color = new Color()

    color.setRGB(rgb[0], rgb[1], rgb[2])

    return color
  }

  static fromGray (grayValue) {
    const color = new Color()
    color.setRGB(grayValue, grayValue, grayValue)
  }

  get r () { return this.__r }
  set r (r) { this.__r = Utils.clamp(r || 0, 0, 255) }
  get g () { return this.__g }
  set g (g) { this.__g = Utils.clamp(g || 0, 0, 255) }
  get b () { return this.__b }
  set b (b) { this.__b = Utils.clamp(b || 0, 0, 255) }
  get alpha () { return this.__a }
  set alhpa (a) { this.__a = Utils.clamp(a || 1, 0, 1) }

  setRGB (r, g, b) {
    this.r = r
    this.g = g
    this.b = b
  }

  
}