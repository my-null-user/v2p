export function ResultPreview({ previewText, hasResult }) {
  return (
    <div className={`preview-box ${hasResult ? 'preview-box-filled' : ''}`}>
      <pre>{previewText}</pre>
    </div>
  )
}
