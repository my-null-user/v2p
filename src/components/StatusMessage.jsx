export function StatusMessage({ errorMessage, infoMessage }) {
  if (errorMessage) {
    return (
      <p className="status-message status-error" role="alert">
        {errorMessage}
      </p>
    )
  }

  if (infoMessage) {
    return <p className="status-message status-info">{infoMessage}</p>
  }

  return null
}
