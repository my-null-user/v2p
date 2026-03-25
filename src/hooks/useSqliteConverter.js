import { startTransition, useState } from 'react'
import {
  buildFavoritesPayload,
  downloadJsonFile,
  parseFavoritesJsonFile,
} from '../utils/json'
import { extractFavoritesFromDatabase } from '../utils/sqlite'

export function useSqliteConverter() {
  const [databaseFile, setDatabaseFile] = useState(null)
  const [compareFile, setCompareFile] = useState(null)
  const [favoritesJson, setFavoritesJson] = useState(null)
  const [convertedCount, setConvertedCount] = useState(null)
  const [detectedMissingFavorites, setDetectedMissingFavorites] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [infoMessage, setInfoMessage] = useState('')
  const [isConverting, setIsConverting] = useState(false)

  const compareFavorites = async (payload, nextCompareFile = compareFile) => {
    if (!payload || !nextCompareFile) {
      setDetectedMissingFavorites([])
      return []
    }

    const inputFavorites = await parseFavoritesJsonFile(nextCompareFile)
    const inputSet = new Set(inputFavorites)
    const missingFavorites = payload.favorites.filter(
      (favorite) => !inputSet.has(favorite),
    )

    setDetectedMissingFavorites(missingFavorites)
    return missingFavorites
  }

  const handleDatabaseFileSelect = (file) => {
    setDatabaseFile(file)
    setCompareFile(null)
    setFavoritesJson(null)
    setConvertedCount(null)
    setDetectedMissingFavorites([])
    setErrorMessage('')
    setInfoMessage(`선택된 파일: ${file.name}`)
  }

  const handleCompareFileSelect = async (file) => {
    setCompareFile(file)
    setErrorMessage('')

    if (favoritesJson) {
      try {
        const missingFavorites = await compareFavorites(favoritesJson, file)
        setInfoMessage(
          missingFavorites.length > 0
            ? `${missingFavorites.length}개 입력 실패 감지를 확인했습니다.`
            : '입력 실패 감지가 없습니다.',
        )
      } catch (error) {
        setDetectedMissingFavorites([])
        setErrorMessage(
          error instanceof Error
            ? error.message
            : '비교용 JSON 파일을 읽는 중 오류가 발생했습니다.',
        )
      }
        return
    }

    setInfoMessage(`비교용 JSON 선택: ${file.name}`)
  }

  const handleFileClear = () => {
    setDatabaseFile(null)
    setCompareFile(null)
    setFavoritesJson(null)
    setConvertedCount(null)
    setDetectedMissingFavorites([])
    setErrorMessage('')
    setInfoMessage('파일 선택이 초기화되었습니다.')
  }

  const convertSelectedFile = async () => {
    if (!databaseFile || isConverting) {
      return null
    }

    setIsConverting(true)
    setErrorMessage('')
    setInfoMessage('SQLite 파일을 읽는 중입니다...')

    try {
      const favorites = await extractFavoritesFromDatabase(databaseFile)
      const payload = buildFavoritesPayload(favorites)
      await compareFavorites(payload)

      startTransition(() => {
        setFavoritesJson(payload)
        setConvertedCount(favorites.length)
        setInfoMessage(
          favorites.length > 0
            ? `${favorites.length}개 변환했습니다.`
            : '데이터가 없어 빈 배열로 변환했습니다.',
        )
      })

      return payload
    } catch (error) {
      setFavoritesJson(null)
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'SQLite 파일을 처리하는 중 알 수 없는 오류가 발생했습니다.',
      )
      return null
    } finally {
      setIsConverting(false)
    }
  }

  const downloadResult = () => {
    if (!favoritesJson) {
      return
    }

    downloadJsonFile(favoritesJson, 'favorites-to-import.json')
    setInfoMessage('favorites-to-import.json 다운로드를 시작했습니다.')
  }

  const convertAndDownload = async () => {
    const payload = await convertSelectedFile()
    if (!payload) {
      return
    }

    downloadJsonFile(payload, 'favorites-to-import.json')
    setInfoMessage('pupil favorite 다운로드를 시작했습니다.')
  }

  return {
    databaseFile,
    compareFile,
    favoritesJson,
    convertedCount,
    detectedMissingFavorites,
    errorMessage,
    infoMessage,
    isConverting,
    canConvert: Boolean(databaseFile) && !isConverting,
    canDownload: Boolean(favoritesJson),
    handleDatabaseFileSelect,
    handleCompareFileSelect,
    handleFileClear,
    convertSelectedFile,
    downloadResult,
    convertAndDownload,
  }
}
