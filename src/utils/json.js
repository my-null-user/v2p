export function buildFavoritesPayload(favorites) {
  return {
    favorites,
  }
}

export async function parseFavoritesJsonFile(file) {
  if (!file) {
    throw new Error('비교할 JSON 파일을 먼저 선택해 주세요.')
  }

  const text = await file.text()

  try {
    const parsed = JSON.parse(text)
    const favorites = Array.isArray(parsed?.favorites) ? parsed.favorites : []

    return favorites
      .map((value) => Number(value))
      .filter((value) => Number.isFinite(value))
  } catch {
    throw new Error('favorites.json 형식을 읽지 못했습니다.')
  }
}

export function downloadJsonFile(data, filename) {
  const jsonText = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonText], { type: 'application/json;charset=utf-8' })
  const downloadUrl = URL.createObjectURL(blob)

  const anchor = document.createElement('a')
  anchor.href = downloadUrl
  anchor.download = filename
  document.body.append(anchor)
  anchor.click()
  anchor.remove()

  window.setTimeout(() => {
    URL.revokeObjectURL(downloadUrl)
  }, 0)
}
