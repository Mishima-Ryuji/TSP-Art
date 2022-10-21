import { TTwoOpt } from 'lib/twoOpt/TTwoOpt'
import { useEffect, useRef, useState } from 'react'

type Props = {
  imagePath: string
  mode: 'monotone' | 'colorful'
  onFinish: (tourHistory: number[][]) => void
}

const INTERVAL = 10

const NUM_OF_CITIES = 10000

export const ArtCanvas = ({ onFinish: handleFinish, imagePath }: Props) => {
  const ref = useRef<HTMLCanvasElement>(null!)

  const searchInstance = useRef<TTwoOpt>(null!)
  const citiesRef = useRef<number[][]>([])
  const [currentTour, setCurrentTour] = useState<number[]>([])
  const tourHistory = useRef<number[][]>([])

  useEffect(() => {
    const canvas = ref.current
    let image = new Image()
    image.src = imagePath

    const ctx = canvas.getContext('2d')
    if (ctx === null) return

    canvas.width = image.width
    canvas.height = image.height
    ctx.drawImage(image, 0, 0)

    // 画像の各ピクセルをグレースケールに変換する
    let rgbSum = 0
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height)
    for (let y = 0; y < pixels.height; y++) {
      for (let x = 0; x < pixels.width; x++) {
        const i = y * 4 * pixels.width + x * 4
        const rgb = parseInt(
          `${(pixels.data[i] + pixels.data[i + 1] + pixels.data[i + 2]) / 3}`,
          10
        )
        pixels.data[i] = rgb
        pixels.data[i + 1] = rgb
        pixels.data[i + 2] = rgb
        rgbSum += rgb
      }
    }

    let alpha = 1
    if (rgbSum / 255 > NUM_OF_CITIES) {
      alpha = NUM_OF_CITIES / (rgbSum / 255)
    }

    // 都市データを作成する
    const cities = []
    for (let y = 0; y < pixels.height; y++) {
      for (let x = 0; x < pixels.width; x++) {
        const i = y * 4 * pixels.width + x * 4
        if (Math.random() < (alpha * pixels.data[i]) / 255) {
          cities.push([x, y])
        }
      }
    }
    citiesRef.current = cities

    ctx.putImageData(pixels, 0, 0, 0, 0, pixels.width, pixels.height)

    // 都市データをTwoOptに登録
    searchInstance.current = new TTwoOpt(INTERVAL, cities)

    const initTour = searchInstance.current.initialize()
    setCurrentTour(initTour)
    tourHistory.current = []
  }, [imagePath])

  useEffect(() => {
    if (currentTour.length === 0) return
    tourHistory.current.push(currentTour)
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    if (ctx === null) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath()
    const tourLength = searchInstance.current.fTour.fCitiesTour.length
    for (let cityIndex = 0; cityIndex < tourLength; cityIndex++) {
      const cityId = searchInstance.current.fTour.fCitiesTour[cityIndex]
      if (cityIndex === 0)
        ctx.moveTo(citiesRef.current[cityId][0], citiesRef.current[cityId][1])
      else
        ctx.lineTo(citiesRef.current[cityId][0], citiesRef.current[cityId][1])
    }
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 0.1
    ctx.stroke()
    if (searchInstance.current.isFinished()) {
      handleFinish(tourHistory.current)
    } else {
      const nextTour = [...searchInstance.current.next(currentTour)]
      setCurrentTour(nextTour)
    }
  }, [currentTour])

  return <canvas ref={ref} />
}
