import { TTSPMap } from './TTSPMap'

export class TTour {
  fTSPMap: TTSPMap
  fCitiesTour: number[]
  fCityIndicies: number[]
  fTourLength: number = 0

  constructor(tspMap: TTSPMap) {
    this.fTSPMap = tspMap
    this.fCitiesTour = new Array(this.fTSPMap.getDimension())
    this.fCityIndicies = new Array(this.fTSPMap.getDimension())
    for (let i: number = 0; i < this.fTSPMap.getDimension(); ++i) {
      this.fCitiesTour[i] = i
      this.fCityIndicies[i] = i
    }
    this.randomize()
  }

  getDimension(): number {
    return this.fTSPMap.getDimension()
  }

  randomize(): void {
    for (let i: number = this.fCitiesTour.length - 1; i > 0; --i) {
      let r: number = getRandomInt(i)
      this.swap(i, r)
    }
  }

  swap(ia: number, ib: number): void {
    let cityA: number = this.fCitiesTour[ia]
    this.fCitiesTour[ia] = this.fCitiesTour[ib]
    this.fCitiesTour[ib] = cityA
    this.fCityIndicies[this.fCitiesTour[ia]] = ia
    this.fCityIndicies[this.fCitiesTour[ib]] = ib
  }

  calcTourLength(): void {
    this.fTourLength = 0
    for (let i: number = 0; i < this.fCitiesTour.length; ++i) {
      this.fTourLength += this.fTSPMap.getDistance(
        this.fCitiesTour[i],
        this.fCitiesTour[this.getCorrectIndex(i + 1)]
      )
    }
  }

  next(v: number): number {
    return this.fCitiesTour[this.getCorrectIndex(this.fCityIndicies[v] + 1)]
  }

  prev(v: number): number {
    return this.fCitiesTour[this.getCorrectIndex(this.fCityIndicies[v] - 1)]
  }

  gain(va: number, vb: number, vc: number, vd: number): number {
    return (
      this.fTSPMap.getDistance(va, vb) +
      this.fTSPMap.getDistance(vc, vd) -
      this.fTSPMap.getDistance(va, vc) -
      this.fTSPMap.getDistance(vb, vd)
    )
  }

  flip(va: number, vb: number, vc: number, vd: number): void {
    let ia: number = this.fCityIndicies[va]
    let ib: number = this.fCityIndicies[vb]
    let ic: number = this.fCityIndicies[vc]
    let id: number = this.fCityIndicies[vd]
    let ida = this.getCorrectIndex(ia - id)
    let ibc = this.getCorrectIndex(ic - ib)
    let head: number, tail: number
    if (ida < ibc) {
      head = id
      tail = ia
    } else {
      head = ib
      tail = ic
    }
    let flipSize: number = this.getCorrectIndex(tail - head + 1)
    for (let i: number = 0; i < flipSize / 2; ++i) {
      let tailCity: number = this.fCitiesTour[tail]
      this.fCitiesTour[tail] = this.fCitiesTour[head]
      this.fCitiesTour[head] = tailCity
      this.fCityIndicies[this.fCitiesTour[head]] = head
      this.fCityIndicies[this.fCitiesTour[tail]] = tail
      head = this.getCorrectIndex(head + 1)
      tail = this.getCorrectIndex(tail - 1)
    }
  }

  getCorrectIndex(index: number): number {
    if (index < 0) {
      index += this.fCitiesTour.length
    } else if (this.fCitiesTour.length <= index) {
      index -= this.fCitiesTour.length
    }
    return index
  }

  getVertex(index: number): number {
    return this.fCitiesTour[index]
  }

  getIndex(v: number): number {
    return this.fCityIndicies[v]
  }

  getTourLength(): number {
    return this.fTourLength
  }

  getTour(): number[] {
    return this.fCitiesTour
  }

  setTour(tour: number[]): void {
    this.fCitiesTour = tour
    for (let i: number = 0; i < this.fTSPMap.getDimension(); ++i) {
      this.fCityIndicies[this.fCitiesTour[i]] = i
    }
  }
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max)
}
