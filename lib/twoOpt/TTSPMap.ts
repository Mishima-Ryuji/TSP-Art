export class TTSPMap {
  static COORD_X: number = 0
  static COORD_Y: number = 1
  fCoordinates: number[][]

  constructor(coordinates: number[][]) {
    this.fCoordinates = coordinates
  }

  getDistance(cityA: number, cityB: number): number {
    let x: number =
      this.fCoordinates[cityA][TTSPMap.COORD_X] -
      this.fCoordinates[cityB][TTSPMap.COORD_X]
    let y: number =
      this.fCoordinates[cityA][TTSPMap.COORD_Y] -
      this.fCoordinates[cityB][TTSPMap.COORD_Y]
    return Math.ceil(Math.sqrt(x * x + y * y))
  }

  getDimension() {
    return this.fCoordinates.length
  }
}
