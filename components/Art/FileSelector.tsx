import { useDropzone } from 'react-dropzone'
import { FaFileUpload } from 'react-icons/fa'

type Props = {
  onSelect: (files: File[], imagePaths: string[]) => void
}

export const FileSelector = ({ onSelect: handleSelect }: Props) => {
  const handleDrop = (acceptedFiles: File[]) => {
    // @see https://developer.mozilla.org/ja/docs/Web/API/URL/createObjectURL
    const dataUrls = acceptedFiles.map((file) => URL.createObjectURL(file))
    // createObjectURLで生成された、ブラウザ表示用のURLをstateへsetする
    handleSelect(acceptedFiles, dataUrls)
  }
  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop })

  return (
    <div {...getRootProps({ className: `image-uploader ` })}>
      <input {...getInputProps()} />
      <p className="mb-0">
        <FaFileUpload className="me-2" />
        画像をアップロードして早速始めましょう。
      </p>
    </div>
  )
}
