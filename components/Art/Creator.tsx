import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { ArtCanvas } from './Canvas'
import { FileSelector } from './FileSelector'

type Props = {}

export const ArtCreator = () => {
  const [step, setStep] = useState<'select' | 'setup' | 'search'>('select')
  const [files, setFiles] = useState<File[]>([])
  const [filePaths, setFilePaths] = useState<string[]>([])
  const [mode, setMode] = useState<'colorful' | 'monotone'>('monotone')
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)

  const reset = () => {
    setStep('select')
    setFilePaths([])
    setFilePaths([])
    setMode('monotone')
    setCurrentImageIndex(0)
  }

  return (
    <>
      {step === 'select' && (
        <FileSelector
          onSelect={(files, imagePaths) => {
            setFilePaths(imagePaths)
            setFiles(files)
            setStep('setup')
          }}
        />
      )}
      {step === 'setup' && (
        <>
          <h2 className="h5 text-muted">アップロードされた画像一覧</h2>
          <div className="d-flex gap-3 mb-3">
            {filePaths.map((path, index) => (
              <img
                src={path}
                key={index}
                style={{ maxWidth: 300, maxHeight: 300 }}
              />
            ))}
          </div>
          <div className="d-flex gap-3">
            <Button variant="secondary" onClick={reset}>
              画像を選び直す
            </Button>
            <Button variant="success" onClick={() => setStep('search')}>
              スタート
            </Button>
          </div>
        </>
      )}
      {step === 'search' && (
        <ArtCanvas
          onFinish={() => {}}
          imagePath={filePaths[currentImageIndex]}
          mode={mode}
        />
      )}
    </>
  )
}
