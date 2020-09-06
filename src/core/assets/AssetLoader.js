import Bitmap from './types/Bitmap'

export default class AssetLoader {
  constructor () {
    this.images = {}
    this.__sourceImagePaths = {}
    this.loaded = false
  }

  load () {
    return new Promise(async (resolve, reject) => {
      try {
        await this.__loadImages(this.__sourceImagePaths)
        this.loaded = true
        resolve()
      } catch (exception) {
        reject(exception)
      }
    })
  }

  setImageAssets (sourceImagePathsObject) {
    this.__sourceImagePaths = sourceImagePathsObject
  }

  getImage (name, returnContext = true) {
    const image = this.images[name]
    if (!image) return null
    return returnContext ? image.context : image
  }

  __loadImages (sourceImagePathsObject) {
    return new Promise (async (resolve, reject) => {
      let promiseArray = []

      for (const [name, path] of Object.entries(this.__sourceImagePaths)) {
        promiseArray.push(this.__loadImage(path, name))
      }

      try {
        const bitmaps = await Promise.all(promiseArray)
        
        for (let i = 0; i < bitmaps.length; i++) {
          const bitmap = bitmaps[i]
          this.images[bitmap.name] = bitmap
        }

        resolve()
      } catch (exception) {
        reject(exception)
      }
    })
  }

  __loadImage (path = "", name = "") {
    return new Promise (async (resolve, reject) => {
      const image = new Image()
      image.onload = () => { resolve(new Bitmap(image, name)) }
      image.onerror = () => { reject(`image ${name} failed to load`) }
      image.src = path
    })
  }
}