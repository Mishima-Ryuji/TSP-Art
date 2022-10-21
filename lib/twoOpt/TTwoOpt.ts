import { TTour } from './TTour'
import { TTSPMap } from './TTSPMap'

export class TTwoOpt {
  fInterval: number
  fTour: TTour
  fDimension: number
  fFlipCount: number
  fFinish: boolean

  constructor(interval: number, coordinates: number[][]) {
    this.fInterval = interval
    let tspmap: TTSPMap = new TTSPMap(coordinates)
    this.fTour = new TTour(tspmap)
    this.fDimension = this.fTour.getDimension()
    this.fFlipCount = 0
    this.fFinish = false
  }

  initialize(): number[] {
    return this.fTour.getTour()
  }

  next(tour: number[]): number[] {
    let currentFlip: number = 0
    this.fTour.setTour(tour)

    let restart: boolean = true
    while (restart) {
      if (this.fInterval < currentFlip) {
        break
      }
      restart = false
      for (let i: number = 0; i < this.fDimension; ++i) {
        let va: number = this.fTour.getVertex(i)
        let vb: number = this.fTour.next(va)
        for (let j: number = 0; j < this.fDimension; ++j) {
          if (i == j) continue
          let vc: number = this.fTour.getVertex(j)
          let vd: number = this.fTour.next(vc)
          if (0 < this.fTour.gain(va, vb, vc, vd)) {
            this.fTour.flip(va, vb, vc, vd)
            currentFlip++
            this.fFlipCount++
            restart = true
            break
          }
        }
        if (restart) break
      }

      if (!restart) {
        this.fFinish = true
        this.fTour.calcTourLength()
      }
    }
    return this.fTour.getTour()
  }

  run(): void {
    let restart: boolean = true
    while (restart) {
      restart = false
      for (let i: number = 0; i < this.fDimension; ++i) {
        let va: number = this.fTour.getVertex(i)
        let vb: number = this.fTour.next(va)
        for (let j: number = 0; j < this.fDimension; ++j) {
          if (i == j) continue
          let vc: number = this.fTour.getVertex(j)
          let vd: number = this.fTour.next(vc)
          if (0 < this.fTour.gain(va, vb, vc, vd)) {
            this.fTour.flip(va, vb, vc, vd)
            restart = true
            break
          }
        }
        if (restart) break
      }
    }
  }

  isFinished(): boolean {
    return this.fFinish
  }
}
