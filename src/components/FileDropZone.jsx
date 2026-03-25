import { useId, useRef, useState } from 'react'

export function FileDropZone({
  selectedFile,
  onFileSelect,
  accept = '.db,.sqlite,application/octet-stream',
  title = 'SQLite 파일을 이곳에 놓거나 선택하세요',
  description = '지원 형식: `.db`, `.sqlite`',
  inputLabel = '파일 선택',
  currentLabel = '현재 파일',
}) {
  const inputId = useId()
  const inputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)

  const openFilePicker = () => {
    inputRef.current?.click()
  }

  const handleInputChange = (event) => {
    const [file] = event.target.files ?? []
    if (file) {
      onFileSelect(file)
    }

    event.target.value = ''
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (event) => {
    event.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragging(false)

    const [file] = event.dataTransfer.files ?? []
    if (file) {
      onFileSelect(file)
    }
  }

  return (
    <div
      className={`drop-zone ${isDragging ? 'drop-zone-active' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      role="presentation"
    >
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        className="sr-only"
        accept={accept}
        onChange={handleInputChange}
      />

      <div className="drop-zone-icon" aria-hidden="true">
        <span />
      </div>

      <p className="drop-zone-title">{title}</p>
      <p className="drop-zone-copy">{description}</p>

      <button type="button" className="secondary-button" onClick={openFilePicker}>
        파일 선택
      </button>

      <label className="sr-only" htmlFor={inputId}>
        {inputLabel}
      </label>

      <div className="file-meta">
        <span className="file-meta-label">{currentLabel}</span>
        <strong>{selectedFile ? selectedFile.name : '선택된 파일 없음'}</strong>
      </div>
    </div>
  )
}
