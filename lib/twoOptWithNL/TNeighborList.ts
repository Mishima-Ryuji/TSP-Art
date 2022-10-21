import { TTSPMap } from './TTSPMap'

export class TNeighborList {
  static UNDEFINED: number = -1
  fNeighbors: number[][]
  fNoOfNeighbor: number
  fDistanceMatrix: number[][]

  constructor(tspMap: TTSPMap, noOfNeighbor: number) {
    if (1 + noOfNeighbor < tspMap.getDimension()) {
      this.fNoOfNeighbor = 1 + noOfNeighbor
    } else {
      this.fNoOfNeighbor = tspMap.getDimension()
    }
    let n: number = tspMap.getDimension()
    this.fNeighbors = new Array(n)
    this.fDistanceMatrix = new Array(n)
    this.fastInitialize(tspMap)
  }

  fastInitialize(tspMap: TTSPMap): void {
    let n: number = tspMap.getDimension()
    for (let i: number = 0; i < n; ++i) {
      this.fNeighbors[i] = new Array(this.fNoOfNeighbor)
      this.fDistanceMatrix[i] = new Array(this.fNoOfNeighbor)
      this.fNeighbors[i][0] = TNeighborList.UNDEFINED
      this.fDistanceMatrix[i][0] = Number.MAX_VALUE
      let count: number = 0
      for (let j: number = 0; j < n; ++j) {
        if (i == j) {
          continue
        }
        let distance: number = tspMap.getDistance(i, j)
        if (distance < this.fDistanceMatrix[i][count]) {
          let insert: number =
            count < this.fNoOfNeighbor - 1 ? count + 1 : count
          this.fNeighbors[i][insert] = j
          this.fDistanceMatrix[i][insert] = distance
          for (let k: number = insert; 0 < k; --k) {
            if (this.fDistanceMatrix[i][k - 1] <= this.fDistanceMatrix[i][k]) {
              break
            }
            let temp: number = this.fNeighbors[i][k - 1]
            this.fNeighbors[i][k - 1] = this.fNeighbors[i][k]
            this.fNeighbors[i][k] = temp
            temp = this.fDistanceMatrix[i][k - 1]
            this.fDistanceMatrix[i][k - 1] = this.fDistanceMatrix[i][k]
            this.fDistanceMatrix[i][k] = temp
          }
          if (count < this.fNoOfNeighbor - 1) {
            count++
          }
        }
      }
    }
  }

  near(v: number, k: number): number {
    return this.fNeighbors[v][k]
  }

  getOrder(v: number, ref: number): number {
    for (let order: number = 0; order < this.fNoOfNeighbor; ++order) {
      if (this.fNeighbors[v][order] == ref) {
        return order
      }
    }
    return -1
  }

  getNoOfNeighbor(): number {
    return this.fNoOfNeighbor
  }

  getDistanceToNear(v: number, k: number): number {
    return this.fDistanceMatrix[v][k]
  }

  getNeighbors(): number[][] {
    return this.fNeighbors
  }
}
