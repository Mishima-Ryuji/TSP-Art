import { useEffect, useRef, useState } from 'react'

type Props = {
  imagePath: string
  mode: 'monotone' | 'colorful'
  onFinish: (tourHistory: number[][]) => void
}

const STEP = 10

const NUM_OF_CITIES = 1000

export const ArtCanvas = ({ onFinish: handleFinish, imagePath }: Props) => {
  const ref = useRef<HTMLCanvasElement>(null!)

  // const searchInstance = useRef<>(null!)
  const [currentTour, setCurrentTour] = useState([])
  // const tourHistory = useRef<number[][]>([])

  useEffect(() => {
    //   searchInstance.current =
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

    const rgbAverage = rgbSum / (pixels.height * pixels.width)
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

    ctx.putImageData(pixels, 0, 0, 0, 0, pixels.width, pixels.height)

    //   const initTour = searchInstance.current.initialize()
    //   setCurrentTour(initTour)
    //   tourHistory.current = [initTour]
  }, [imagePath])

  useEffect(() => {
    if (currentTour.length === 0) return
  }, [currentTour])

  return <canvas ref={ref} className="w-100" />
}
