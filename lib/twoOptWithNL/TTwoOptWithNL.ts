import { TNeighborList } from './TNeighborList'
import { TTour } from './TTour'
import { TTSPMap } from './TTSPMap'

export class TTwoOptWithNL {
  fTSPMap: TTSPMap
  fTour: TTour
  fNeighborList: TNeighborList

  fInterval: number
  fDimension: number
  fFlipCount: number
  fFinish: boolean

  constructor(interval: number, coordinates: number[][]) {
    this.fInterval = interval
    this.fTSPMap = new TTSPMap(coordinates)
    this.fNeighborList = new TNeighborList(this.fTSPMap, 50)
    this.fTour = new TTour(this.fTSPMap)
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
        let vb: number
        for (let ort: number = 1; ort <= 2; ++ort) {
          if (ort == 1) {
            vb = this.fTour.next(va)
          } else {
            vb = this.fTour.prev(va)
          }
          for (
            let j: number = 0;
            j < this.fNeighborList.getNoOfNeighbor();
            ++j
          ) {
            let vc: number = this.fNeighborList.near(va, j)
            let vd: number
            if (ort == 1) {
              vd = this.fTour.next(vc)
            } else {
              vd = this.fTour.prev(vc)
            }
            if (
              this.fTSPMap.getDistance(va, vb) <=
              this.fTSPMap.getDistance(va, vc)
            ) {
              break
            }
            if (0 < this.fTour.gain(va, vb, vc, vd)) {
              if (ort == 1) {
                this.fTour.flip(va, vb, vc, vd)
              } else {
                this.fTour.flip(vb, va, vd, vc)
              }
              currentFlip++
              this.fFlipCount++
              restart = true
              break
            }
          }
          if (restart) {
            break
          }
        }
        if (restart) {
          break
        }
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
        let vb: number
        for (let ort: number = 1; ort <= 2; ++ort) {
          if (ort == 1) {
            vb = this.fTour.next(va)
          } else {
            vb = this.fTour.prev(va)
          }
          for (
            let j: number = 0;
            j < this.fNeighborList.getNoOfNeighbor();
            ++j
          ) {
            let vc: number = this.fNeighborList.near(va, j)
            let vd: number
            if (ort == 1) {
              vd = this.fTour.next(vc)
            } else {
              vd = this.fTour.prev(vc)
            }
            if (
              this.fTSPMap.getDistance(va, vb) <=
              this.fTSPMap.getDistance(va, vc)
            ) {
              break
            }
            if (0 < this.fTour.gain(va, vb, vc, vd)) {
              if (ort == 1) {
                this.fTour.flip(va, vb, vc, vd)
              } else {
                this.fTour.flip(vb, va, vd, vc)
              }
              restart = true
              break
            }
          }
          if (restart) {
            break
          }
        }
        if (restart) {
          break
        }
      }
    }
  }

  isFinished(): boolean {
    return this.fFinish
  }
}
